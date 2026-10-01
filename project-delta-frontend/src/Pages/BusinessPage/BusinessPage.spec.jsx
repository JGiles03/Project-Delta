import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BusinessPage from "." 

const mockVenueData = {
  id: 101,
  name: "The Playful Toad Cafe",
  category: "Cafe",
  address: "123 High St",
  postcode: "NW10 1AA",
  amenities: [
    { id: 1, name: "Accessible entrance" }
  ]
}

const mockAnalyticsData = {
  generated_at: "2026-10-01",
  is_demo_data: true,
  views: 1250,
  relevant_searches: 430,
  views_chart: "/charts/views-default.png",
  amenity_demand_chart: "/charts/demand.png",
  search_heatmap_chart: "/charts/heatmap.png",
  search_demand_chart: "/charts/search-demand.png",
  projection_method: "simulated",
  opportunities: [
    { amenity_id: 20, name: "Accessible toilet", searches: 500, demand_rate: 0.8, projection_chart: "/charts/baby-changing.png" },
    { amenity_id: 30, name: "Accessible entrance", searches: 900, demand_rate: 0.9, projection_chart: "/charts/high-chairs.png" },
    { amenity_id: 40, name: "Changing facilities", searches: 1200, demand_rate: 0.95, projection_chart: "/charts/indoor-play.png" }
  ]
}

describe("BusinessPage Page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.stubGlobal("fetch", vi.fn())
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    cleanup()
  })

  it("should prevent unauthorized login", async () => {
    render(<BusinessPage />)
    const errorMessage = await screen.findByText("You must be logged in to view this dashboard.")
    expect(errorMessage).toBeDefined()
  })

  it("should show it's loading", () => {
    localStorage.setItem("token", "valid-mock-jwt-token")

    vi.mocked(fetch).mockReturnValue(new Promise(() => {}))

    render(<BusinessPage />)
    expect(screen.getByText("Loading dashboard...")).toBeDefined()
  })

  it("should throw an error if fetch doesnt work", async () => {
    localStorage.setItem("token", "valid-mock-jwt-token")

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500
    })

    render(<BusinessPage />)

    const errorMessage = await screen.findByText(/Could not load your venue.|Could not load business analytics./)
    expect(errorMessage).toBeDefined()
  })

  it("should render calculated data", async () => {
    localStorage.setItem("token", "valid-mock-jwt-token")

    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => mockVenueData })
      .mockResolvedValueOnce({ ok: true, json: async () => mockAnalyticsData })

    render(<BusinessPage />)

    expect(await screen.findByRole("heading", { name: "The Playful Toad Cafe", level: 1 })).toBeDefined()
    expect(screen.getByText("123 High St")).toBeDefined()
    expect(screen.getByText("Demo analytics using parent activity")).toBeDefined()

    expect(screen.getByText("1250")).toBeDefined()
    expect(screen.getByText("430")).toBeDefined()

    expect(screen.getByText("✓ Accessible entrance")).toBeDefined()

    const opportunityRows = screen.getAllByTestId("opportunity-row")
    expect(opportunityRows).toHaveLength(2)
    expect(opportunityRows[0].textContent).toContain("Changing facilities")
    expect(opportunityRows[0].textContent).toContain("1200 searches")
    expect(opportunityRows[1].textContent).toContain("Accessible toilet")
    expect(opportunityRows[1].textContent).toContain("500 searches")
  })

  it("should update chart when a new amenity is chosen", async () => {
    const user = userEvent.setup()
    localStorage.setItem("token", "valid-mock-jwt-token")

    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => mockVenueData })
      .mockResolvedValueOnce({ ok: true, json: async () => mockAnalyticsData })

    render(<BusinessPage />)

    const chartImage = await screen.findByAltText("Simulated venue views for The Playful Toad Cafe")
    expect(chartImage.src).toContain("/charts/views-default.png")
    const dropdown = screen.getByLabelText("Choose an amenity")
    await user.selectOptions(dropdown, "40")
    expect(chartImage.src).toContain("/charts/indoor-play.png")
    expect(chartImage.alt).toBe("Illustrative projected venue views with Changing facilities")
    expect(screen.getByText(/Changing facilities appeared in/)).toBeDefined()
    expect(screen.getAllByText("1200 searches")[0]).toBeDefined()
  })
})
