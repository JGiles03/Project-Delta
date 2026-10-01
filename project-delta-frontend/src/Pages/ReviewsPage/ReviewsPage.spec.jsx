/* eslint-env jest */

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)

import ReviewsPage from ".";

// Mock the environment variable required for the API request URL
vi.stubEnv("VITE_BACK_END_SERVER_URL", "http://localhost:3000");

// Standardized mock reviews for testing the sliding carousel mechanics
const mockReviews = [
  { id: "1", rating: 5, comment: "Amazing playground!", created_at: "2026-09-01T10:00:00.000Z" },
  { id: "2", rating: 4, comment: "Great high chairs.", created_at: "2026-09-15T12:00:00.000Z" },
  { id: "3", rating: 3, comment: "Pram space is tight.", created_at: "2026-09-20T14:00:00.000Z" },
];

// Router helper injected with a dynamic venue id parameter
const renderWithRouter = (venueId = "123") => {
  return render(
    <MemoryRouter initialEntries={[`/venue/${venueId}/reviews`]}>
      <Routes>
        <Route path="/venue/:id/reviews" element={<ReviewsPage />} />
        <Route path="/venue/:id/post-review" element={<div>Post Review Form</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ReviewsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Stub global fetch framework
    global.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup()
  })

  it("renders a loading state initially and then shows reviews", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockReviews,
    });

    renderWithRouter();

    // Verify initial layout condition
    expect(screen.getByText("Loading reviews...")).toBeInTheDocument();

    // Verify fetched data is correctly parsed and populated
    const reviewCard = await screen.findByText("Amazing playground!");
    expect(reviewCard).toBeInTheDocument();
    expect(screen.queryByText("Loading reviews...")).not.toBeInTheDocument();
    
    // Check formatted date transformation output based on 'en-GB' specifications
    expect(screen.getByText("Posted 01/09/2026")).toBeInTheDocument();
  });

  it("handles a network connection error gracefully", async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network Error"));

    renderWithRouter();

    const errorMessage = await screen.findByText("Failed to load reviews.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the empty state UI banner if no data items exist", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderWithRouter("456");

    const fallbackHeader = await screen.findByText("No reviews yet — be the first to leave one!");
    expect(fallbackHeader).toBeInTheDocument();

    // Verify the CTA link configuration uses correct dynamic attributes
    const postReviewLink = screen.getByRole("link", { name: "Post a review" });
    expect(postReviewLink).toHaveAttribute("href", "/venue/456/post-review");
  });

  describe("Carousel Interface Mechanics", () => {
    beforeEach(async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockReviews,
      });
      renderWithRouter();
      await screen.findByText("Amazing playground!");
    });

    it("restricts arrow buttons according to dynamic state bounds", async () => {
      const leftArrow = screen.getByRole("button", { name: "Previous review" });
      const rightArrow = screen.getByRole("button", { name: "Next review" });

      // First item constraint check
      expect(leftArrow).toBeDisabled();
      expect(rightArrow).toBeEnabled();

      // Move interaction step to end boundaries
      await userEvent.click(rightArrow); // slide index 1
      expect(leftArrow).toBeEnabled();
      
      await userEvent.click(rightArrow); // slide index 2 (last)
      expect(rightArrow).toBeDisabled();
      expect(leftArrow).toBeEnabled();
    });

    it("updates track matrix style transformations correctly upon button clicks", async () => {
      const rightArrow = screen.getByRole("button", { name: "Next review" });
      
      // Target container tracking wrapper styles
      const sliderTrack = screen.getByText("Amazing playground!").closest(".carousel-slides");
      
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-0%)" });

      await userEvent.click(rightArrow);
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-100%)" });

      await userEvent.click(rightArrow);
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-200%)" });
    });

    it("advances and recedes position correctly using touch swipe gestures", () => {
      const trackContainer = screen.getByText("Amazing playground!").closest(".carousel-track");
      const sliderTrack = screen.getByText("Amazing playground!").closest(".carousel-slides");

      if (!trackContainer) throw new Error("Carousel Track element not located");

      // Simulate swipe left interaction pattern (Move next)
      fireEvent.touchStart(trackContainer, { touches: [{ clientX: 300 }] });
      fireEvent.touchEnd(trackContainer, { changedTouches: [{ clientX: 100 }] }); // delta = 200 > 50
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-100%)" });

      // Simulate swipe right interaction pattern (Move previous)
      fireEvent.touchStart(trackContainer, { touches: [{ clientX: 100 }] });
      fireEvent.touchEnd(trackContainer, { changedTouches: [{ clientX: 300 }] }); // delta = -200 < -50
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-0%)" });
    });

    it("ignores weak touch events below the 50px activation threshold distance", () => {
      const trackContainer = screen.getByText("Amazing playground!").closest(".carousel-track");
      const sliderTrack = screen.getByText("Amazing playground!").closest(".carousel-slides");

      if (!trackContainer) throw new Error("Carousel Track element not located");

      // Weak left swipe gesture profile simulation
      fireEvent.touchStart(trackContainer, { touches: [{ clientX: 100 }] });
      fireEvent.touchEnd(trackContainer, { changedTouches: [{ clientX: 80 }] }); // delta = 20
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-0%)" });
    });
  });
});
