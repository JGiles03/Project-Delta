import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Review } from "../../services/types";



const GUEST_VISIBLE_COUNT = 1;

export default function ReviewsPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!id) return;

//     async function fetchReviews() {
//       try {
//         setIsLoading(true);

//         const res = await fetch(
//           `http://4.223.159.135/venues/${id}/reviews`
//         );

//         if (!res.ok) {
//           throw new Error("Failed to load reviews");
//         }

//         const data = await res.json();
//         setReviews(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load reviews.");
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchReviews();
//   }, [id]);

  if (error) {
    return <div className="reviews-message">{error}</div>;
  }

//   if (isLoading) {
//     return <div className="reviews-message">Loading reviews...</div>;
//   }

  if (reviews.length === 0) {
    return (
      <div className="reviews-page">
        <h1>Reviews</h1>

        <div className="reviews-message">
          No reviews yet — be the first to leave one!
        </div>

        {token && (
          <Link
            to={`/venue/${id}/post-review`}
            className="btn-accent"
          >
            Post a review
          </Link>
        )}
      </div>
    );
  }

  const visibleReviews = token
    ? reviews
    : reviews.slice(0, GUEST_VISIBLE_COUNT);

  const hasHiddenReviews =
    !token && reviews.length > GUEST_VISIBLE_COUNT;

  return (
    <div className="reviews-page">
      <h1>Reviews</h1>

      <div className="reviews-scroll">
        {visibleReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card-rating">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p className="review-card-comment">
              {review.comment}
            </p>

            <p className="review-card-date">
              Posted{" "}
              {new Date(review.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        ))}

        {hasHiddenReviews && (
          <div className="review-card review-card-locked">
            <p>
              {reviews.length - GUEST_VISIBLE_COUNT} more review
              {reviews.length - GUEST_VISIBLE_COUNT === 1
                ? ""
                : "s"}
            </p>

            <p className="review-card-locked-subtext">
              Create an account to see all reviews
            </p>

            <Link to="/signup" className="btn-accent">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}