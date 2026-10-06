import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Review } from "../../services/types";
import "./index.css";

export default function ReviewsPage() {
  const { id } = useParams();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/venues/${id}/reviews`);
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [id]);

  if (error) return <div className="reviews-message">{error}</div>;
  if (isLoading)
    return <div className="reviews-message">Loading reviews...</div>;

  if (reviews.length === 0) {
    return (
      <div className="reviews-page">
        <h1>Reviews</h1>
        <div className="reviews-empty-card">
          <p className="reviews-empty-text">
            No reviews yet — be the first to leave one!
          </p>

          <Link to={`/venue/${id}/post-review`} className="btn-accent">
            Post a review
          </Link>
        </div>
      </div>
    );
  }

  const visibleReviews = reviews;

  const totalSlides = visibleReviews.length;

  function goNext() {
    setCurrentIndex((i) => Math.min(i + 1, totalSlides - 1));
  }

  function goPrev() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  let touchStartX = 0;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) > 50) {
      if (delta > 0) goNext();
      else goPrev();
    }
  }

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>

      <div className="reviews-carousel">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={goPrev}
          disabled={currentIndex === 0}
          aria-label="Previous review"
        >
          ‹
        </button>

        <div
          className="carousel-track"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-rating">
                    {review.rating}★
                </div>
                <p className="review-card-comment">{review.comment}</p>
                <p className="review-card-date">
                  Posted{" "}
                  {new Date(review.created_at).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={goNext}
          disabled={currentIndex === totalSlides - 1}
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
