/* eslint-env jest */
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OnboardingPage from ".";
import { savePreferences } from "../../services/users";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

vi.mock("../../services/users", () => ({
  savePreferences: vi.fn(),
}));

vi.mock("../../services/amenities", () => ({
  Amenities: ["Accessible entrance", "Accessible toilet", "Changing facilities"],
}));

vi.mock("../../Components/Tour", () => ({
  default: () => <div data-testid="tour-start">Tour Start</div>,
}));

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

describe("OnboardingPage Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  })

  it("redirects to /login if no token", () => {
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
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("What matters most to you?")).toBeInTheDocument();

    const highChairsChip = screen.getByRole("button", { name: "Accessible entrance" });
    const saveButton = screen.getByRole("button", { name: "Save preferences" });

    expect(highChairsChip).not.toHaveClass("selected");
    expect(highChairsChip).toHaveAttribute("aria-pressed", "false");
    expect(saveButton).toBeDisabled();

    await userEvent.click(highChairsChip);
    expect(highChairsChip).toHaveClass("selected");
    expect(highChairsChip).toHaveAttribute("aria-pressed", "true");
    expect(saveButton).toBeEnabled();

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
    
    await userEvent.click(screen.getByRole("button", { name: "Accessible entrance" }));
    await userEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    const errorBox = await screen.findByText("We couldn't save your preferences. Please try again.");
    expect(errorBox).toBeInTheDocument();
  });

  it("progresses to 'done' step on successful save and provides links to map", async () => {
    localStorage.setItem("token", "fake-valid-token");
    vi.mocked(savePreferences).mockResolvedValueOnce(undefined);

    renderWithRouter();
    await userEvent.click(screen.getByRole("button", { name: "Continue" }));
    await userEvent.click(screen.getByRole("button", { name: "Accessible entrance" }));
    
    const saveButton = screen.getByRole("button", { name: "Save preferences" });
    await userEvent.click(saveButton);

    expect(saveButton.innerHTML).toContain("Saving...");

    expect(await screen.findByText("Thank you!")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
    
    const skipTutorialLink = screen.getByRole("link", { name: "Skip tutorial" });
    expect(skipTutorialLink).toHaveAttribute("href", "/map");
  });
});
