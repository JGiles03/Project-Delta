/* eslint-env jest */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OnboardingPage from ".";
import { savePreferences } from "../../services/users";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

// 1. Mock the API service
vi.mock("../../services/users", () => ({
  savePreferences: vi.fn(),
}));

// 2. Mock the Amenities array (keep it small for predictability in tests)
vi.mock("../../services/amenities", () => ({
  Amenities: ["High Chairs", "Pram Space", "Step-free Access"],
}));

// 3. Mock external components if necessary (like your Tour component)
vi.mock("../../Components/Tour", () => ({
  default: () => <div data-testid="tour-start">Tour Start</div>,
}));

// A helper to wrap our component with React Router
const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={["/onboarding"]}>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<div>Login Page Redirect</div>} />
        <Route path="/list" element={<div>List Page</div>} />
        <Route path="/map" element={<div>Map Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("OnboardingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  })

  it("redirects to /login if no token is present", () => {
    renderWithRouter();
    expect(screen.getByText("Login Page Redirect")).toBeInTheDocument();
  });

  it("renders the 'intro' step when authenticated", () => {
    localStorage.setItem("token", "fake-valid-token");
    renderWithRouter();

    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("navigates to the 'preferences' step and handles amenity selections", async () => {
    localStorage.setItem("token", "fake-valid-token");
    renderWithRouter();

    // Move to preferences step
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("What matters most to you?")).toBeInTheDocument();

    // Target an amenity chip
    const highChairsChip = screen.getByRole("button", { name: "High Chairs" });
    const saveButton = screen.getByRole("button", { name: "Save preferences" });

    // Initial assertions: Save button should be disabled because selected.length === 0
    expect(highChairsChip).not.toHaveClass("selected");
    expect(highChairsChip).toHaveAttribute("aria-pressed", "false");
    expect(saveButton).toBeDisabled();

    // Click to select amenity (Class name change & state assertion)
    await userEvent.click(highChairsChip);
    expect(highChairsChip).toHaveClass("selected");
    expect(highChairsChip).toHaveAttribute("aria-pressed", "true");
    expect(saveButton).toBeEnabled();

    // Click to deselect amenity
    await userEvent.click(highChairsChip);
    expect(highChairsChip).not.toHaveClass("selected");
    expect(saveButton).toBeDisabled();
  });

  it("allows the user to skip the preferences step", async () => {
    localStorage.setItem("token", "fake-valid-token");
    renderWithRouter();

    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await userEvent.click(screen.getByRole("button", { name: "Skip for now" }));

    expect(screen.getByText("List Page")).toBeInTheDocument();
  });

  it("displays an error message when saving preferences fails", async () => {
    localStorage.setItem("token", "fake-valid-token");
    vi.mocked(savePreferences).mockRejectedValueOnce(new Error("API Error"));

    renderWithRouter();
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    
    // Select an item and save
    await userEvent.click(screen.getByRole("button", { name: "High Chairs" }));
    await userEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    // Verify error box pops up
    const errorBox = await screen.findByText("We couldn't save your preferences. Please try again.");
    expect(errorBox).toBeInTheDocument();
  });

  it("progresses to 'done' step on successful save and provides links to map", async () => {
    localStorage.setItem("token", "fake-valid-token");
    vi.mocked(savePreferences).mockResolvedValueOnce(undefined);

    renderWithRouter();
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await userEvent.click(screen.getByRole("button", { name: "High Chairs" }));
    
    const saveButton = screen.getByRole("button", { name: "Save preferences" });
    await userEvent.click(saveButton);

    // Verify loading state instantly triggers
    expect(saveButton.innerHTML).toContain("Saving...");

    // Content changes to 'done' step
    expect(await screen.findByText("Thank you!")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();

    // Verify navigation paths exist for the tutorial links
    const skipTutorialLink = screen.getByRole("link", { name: "Skip tutorial" });
    expect(skipTutorialLink).toHaveAttribute("href", "/map");
  });
});
