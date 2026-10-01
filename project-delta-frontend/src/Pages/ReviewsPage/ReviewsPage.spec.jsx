/* eslint-env jest */

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers)
import ReviewsPage from ".";

vi.stubEnv("VITE_BACK_END_SERVER_URL", "http://localhost:3000");

const mockReviews = [
  { id: "1", rating: 5, comment: "Amazing playground!", created_at: "2026-09-01T10:00:00.000Z" },
  { id: "2", rating: 4, comment: "Great high chairs.", created_at: "2026-09-15T12:00:00.000Z" },
  { id: "3", rating: 3, comment: "Pram space is tight.", created_at: "2026-09-20T14:00:00.000Z" },
];

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

describe("ReviewsPage Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup()
  })

  it("shows reviews", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockReviews,
    });

    renderWithRouter();
    expect(screen.getByText("Loading reviews...")).toBeInTheDocument();

    const reviewCard = await screen.findByText("Amazing playground!");
    expect(reviewCard).toBeInTheDocument();
    expect(screen.queryByText("Loading reviews...")).not.toBeInTheDocument();
    
    expect(screen.getByText("Posted 01/09/2026")).toBeInTheDocument();
  });

  it("shows an error if fetch fails", async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network Error"));

    renderWithRouter();

    const errorMessage = await screen.findByText("Failed to load reviews.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows a message to leave the fiorst review", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderWithRouter("456");

    const fallbackHeader = await screen.findByText("No reviews yet — be the first to leave one!");
    expect(fallbackHeader).toBeInTheDocument();

    const postReviewLink = screen.getByRole("link", { name: "Post a review" });
    expect(postReviewLink).toHaveAttribute("href", "/venue/456/post-review");
  });

  describe("Review Carousel", () => {
    beforeEach(async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockReviews,
      });
      renderWithRouter();
      await screen.findByText("Amazing playground!");
    });

    it("doesn't let you go past the end of left or right", async () => {
      const leftArrow = screen.getByRole("button", { name: "Previous review" });
      const rightArrow = screen.getByRole("button", { name: "Next review" });

      expect(leftArrow).toBeDisabled();
      expect(rightArrow).toBeEnabled();

      await userEvent.click(rightArrow);
      expect(leftArrow).toBeEnabled();
      
      await userEvent.click(rightArrow);
      expect(rightArrow).toBeDisabled();
      expect(leftArrow).toBeEnabled();
    });

    it("lets you click through the reviews", async () => {
      const rightArrow = screen.getByRole("button", { name: "Next review" });
      const sliderTrack = screen.getByText("Amazing playground!").closest(".carousel-slides");
      
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-0%)" });

      await userEvent.click(rightArrow);
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-100%)" });

      await userEvent.click(rightArrow);
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-200%)" });
    });

    it("can move with finger swipes", () => {
      const trackContainer = screen.getByText("Amazing playground!").closest(".carousel-track");
      const sliderTrack = screen.getByText("Amazing playground!").closest(".carousel-slides");

      if (!trackContainer) throw new Error("Carousel Track element not located");

      fireEvent.touchStart(trackContainer, { touches: [{ clientX: 300 }] });
      fireEvent.touchEnd(trackContainer, { changedTouches: [{ clientX: 100 }] }); 
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-100%)" });

      fireEvent.touchStart(trackContainer, { touches: [{ clientX: 100 }] });
      fireEvent.touchEnd(trackContainer, { changedTouches: [{ clientX: 300 }] });
      expect(sliderTrack).toHaveStyle({ transform: "translateX(-0%)" });
    });

  });
});
