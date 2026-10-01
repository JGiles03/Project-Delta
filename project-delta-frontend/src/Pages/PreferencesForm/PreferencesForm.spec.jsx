import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PreferencesForm from "."
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

const mockNavigate = vi.fn()
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock("../../services/amenities", () => ({
  Amenities: ["Accessible entrance", "Accessible toilet", "Changing facilities"]
}))

const mockGetUserById = vi.fn()
const mockSavePreferences = vi.fn()
vi.mock("../../services/users", () => ({
  getUserById: (id) => mockGetUserById(id),
  savePreferences: (prefs) => mockSavePreferences(prefs),
}))

describe("PreferencesForm Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
  })

  it("should display an error message if no userid", async () => {
    render(<PreferencesForm />)

    const error = await screen.findByText("We couldn't load your preferences.")
    expect(error).toBeDefined()
  })

  it("should fetch user preferences", async () => {
    localStorage.setItem("userId", "user-123")
    mockGetUserById.mockResolvedValueOnce({ preferences: ["Accessible entrance"] })

    render(<PreferencesForm />)

    expect(screen.getByText("Loading your preferences...")).toBeDefined()

    const accessible = await screen.findByRole("button", { name: "Accessible entrance" })
    const toilet = screen.getByRole("button", { name: "Accessible toilet" })

    expect(accessible.getAttribute("aria-pressed")).toBe("true")
    expect(accessible.className).toContain("selected")

    expect(toilet.getAttribute("aria-pressed")).toBe("false")
    expect(toilet.className).not.toContain("selected")
  })

  it("should allow users to toggle selections on and off", async () => {
    const user = userEvent.setup()
    localStorage.setItem("userId", "user-123")
    mockGetUserById.mockResolvedValueOnce({ preferences: ["Accessible entrance"] })

    render(<PreferencesForm />)

    const entrance = await screen.findByRole("button", { name: "Accessible entrance" })
    const toilet = screen.getByRole("button", { name: "Accessible toilet" })

    await user.click(entrance)
    expect(entrance.getAttribute("aria-pressed")).toBe("false")

    await user.click(toilet)
    expect(toilet.getAttribute("aria-pressed")).toBe("true")
  })

  it("should have a working save button", async () => {
    const user = userEvent.setup()
    localStorage.setItem("userId", "user-123")
    mockGetUserById.mockResolvedValueOnce({ preferences: [] })
    
    let resolveSave = () => {}
    mockSavePreferences.mockReturnValueOnce(new Promise((resolve) => {
      resolveSave = resolve
    }))

    render(<PreferencesForm />)

    const entrance = await screen.findByRole("button", { name: "Accessible entrance" })
    await user.click(entrance)

    const save = screen.getByRole("button", { name: "Save preferences" })
    await user.click(save)

    expect(save.hasAttribute("disabled")).toBe(true)
    expect(screen.getByText("Saving...")).toBeDefined()

    resolveSave(null)

    await vi.waitFor(() => {
      expect(mockSavePreferences).toHaveBeenCalledWith(["Accessible entrance"])
      expect(mockNavigate).toHaveBeenCalledWith("/account")
    })
  })

  it("should show an error message if unable to save", async () => {
    const user = userEvent.setup()
    localStorage.setItem("userId", "user-123")
    mockGetUserById.mockResolvedValueOnce({ preferences: [] })
    mockSavePreferences.mockRejectedValueOnce(new Error("AAAAAAA"))

    render(<PreferencesForm />)

    const save = await screen.findByRole("button", { name: "Save preferences" })
    await user.click(save)

    const error = await screen.findByText("We couldn't save your preferences. Please try again.")
    expect(error).toBeDefined()
    expect(save.hasAttribute("disabled")).toBe(false)
  })
})
