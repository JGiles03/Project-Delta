import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";

export default function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [accessibilityRating, setAccessibilityRating] = useState<number>(0);
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const overallRating = (accessibilityRating + serviceRating) / 2;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (accessibilityRating === 0 || serviceRating === 0) {
      setError('Please rate both accessibility and service.');
      return;
    }

    try {
      setIsSubmitting(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: overallRating, comment }),
      };

      const res = await fetch(`http://4.223.159.135/venues/${id}/reviews`, options);

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      navigate(`/venue/${id}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="review-form-page">
        <div className="review-form-card">
          <h1>You need an account to leave a review</h1>
          <p className="review-form-subtext">
            Share your experience to help other parents find accessible venues.
          </p>
          <Link to="/signup" className="btn-accent">Create an account</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="review-form-page">
      <div className="review-form-card">
        <h1>Leave a review</h1>

        <form onSubmit={handleSubmit}>
          <label className="review-form-label">Accessibility Rating</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`rating-star ${accessibilityRating >= star ? 'active' : ''}`}
                onClick={() => setAccessibilityRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          <label className="review-form-label">Service Rating</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`rating-star ${serviceRating >= star ? 'active' : ''}`}
                onClick={() => setServiceRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          {accessibilityRating > 0 && serviceRating > 0 && (
            <p className="review-form-overall">
              Overall rating: {overallRating.toFixed(1)} ★
            </p>
          )}

          <label className="review-form-label" htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          {error && <div className="message-box error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit review'}
          </button>
        </form>
      </div>
    </div>
  );
}