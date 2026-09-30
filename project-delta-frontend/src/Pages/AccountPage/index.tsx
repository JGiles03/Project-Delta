import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "../../services/auth";
import { fetchReviews, getUserById } from "../../services/users";
import { amenityIcons } from "../../services/amenities";
import TourStart from "../../Components/Tour";
import { TOUR_STEPS } from "../../services/tourConsts";
import { getFavourites } from "../../services/favourites";
import { useFavourites } from "../../context/FavouritesContext";
import PlaceCard from "../../Components/PlaceCard";
import type { Place, Review } from "../../services/types";
import "./index.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favouriteVenues, setFavouriteVenues] = useState<Place[]>([]);
  const [favouritesLoading, setFavouritesLoading] = useState(true);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const [favouriteIndex, setFavouriteIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const { favouriteIds } = useFavourites();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      setIsLoading(false);
      return;
    }

    async function loadUser(id: string) {
      try {
        const currentUser = await getUserById(id);
        setUser(currentUser);

        const reviews = await fetchReviews(id);
        setUserReviews(reviews);

        const venues = await getFavourites(id);
        setFavouriteVenues(venues);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFavouritesLoading(false);
      }
    }

    loadUser(id);
  }, []);

  const visibleFavourites = favouriteVenues.filter((v) =>
    favouriteIds.has(v.id),
  );

  const clampedFavouriteIndex = Math.min(
    favouriteIndex,
    Math.max(visibleFavourites.length - 1, 0),
  );
  const clampedReviewIndex = Math.min(
    reviewIndex,
    Math.max(userReviews.length - 1, 0),
  );

  function handleSignOut() {
    signOut();
    navigate("/home");
  }

  if (isLoading) return <div className="account-message">Loading...</div>;

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-card">
          <h1>You're not signed in</h1>
          <p className="account-subtext">
            Log in to leave reviews and manage your account.
          </p>
          <div className="account-actions">
            <Link to="/login" className="btn-primary">
              Log in
            </Link>
            <Link to="/signup" className="btn-secondary">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>

        <h1>{user.email}</h1>
        <p className="account-member-since">
          Member since{" "}
          {new Date(user.created_at).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="account-section">
          <h3>Your favourites</h3>

          {favouritesLoading ? (
            <p>Loading your favourites...</p>
          ) : visibleFavourites.length === 0 ? (
            <div className="empty-favourites">
              <p>You haven't favourited any venues yet.</p>
              <Link to="/list" className="btn-accent">
                Explore venues
              </Link>
            </div>
          ) : (
            <>
              <div className="account-carousel">
                <button
                  className="carousel-arrow"
                  onClick={() => setFavouriteIndex((i) => Math.max(i - 1, 0))}
                  disabled={clampedFavouriteIndex === 0}
                  aria-label="Previous favourite"
                >
                  ‹
                </button>

                <div className="carousel-track">
                  <div
                    className="carousel-slides"
                    style={{
                      transform: `translateX(-${clampedFavouriteIndex * 100}%)`,
                    }}
                  >
                    {visibleFavourites.map((venue) => (
                      <div
                        key={venue.id}
                        className="carousel-slide "
                        onClick={() => navigate(`/venue/${venue.id}`)}
                      >
                        <PlaceCard place={venue} />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="carousel-arrow"
                  onClick={() =>
                    setFavouriteIndex((i) =>
                      Math.min(i + 1, visibleFavourites.length - 1),
                    )
                  }
                  disabled={
                    clampedFavouriteIndex === visibleFavourites.length - 1
                  }
                  aria-label="Next favourite"
                >
                  ›
                </button>
              </div>

              <div className="carousel-dots">
                {visibleFavourites.map((_, i) => (
                  <span
                    key={i}
                    className={`carousel-dot ${i === clampedFavouriteIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="account-section" data-tour={TOUR_STEPS.PREFERENCES}>
          <h3>Your preferences</h3>

          {user.preferences?.length ? (
            <div className="preferences-section">
              <div className="preferences-list" data-testid="preferences-list">
                {user.preferences.map((preference: any) => (
                  <div key={preference} className="preference-item">
                    <span className="preference-icon">
                      {amenityIcons[preference] ? (
                        <img src={amenityIcons[preference]} alt={preference} />
                      ) : (
                        "•"
                      )}
                    </span>
                    <span>{preference}</span>
                  </div>
                ))}
              </div>
              <Link to="/preferences" className="btn-accent">
                Change your amenities
              </Link>
            </div>
          ) : (
            <div className="preference-section">
              <p>No preferences selected.</p>
              <Link to="/preferences" className="btn-accent">
                Change your amenities
              </Link>
            </div>
          )}
        </div>

        <div className="account-section">
          <h3>Your reviews</h3>

          {userReviews.length === 0 ? (
            <p className="placeholder-note">
              You haven't written any reviews yet.
            </p>
          ) : (
            <>
              <div className="account-carousel">
                <button
                  className="carousel-arrow"
                  onClick={() => setReviewIndex((i) => Math.max(i - 1, 0))}
                  disabled={clampedReviewIndex === 0}
                  aria-label="Previous review"
                >
                  ‹
                </button>

                <div className="carousel-track">
                  <div
                    className="carousel-slides"
                    style={{
                      transform: `translateX(-${clampedReviewIndex * 100}%)`,
                    }}
                  >
                    {userReviews.map((review) => (
                      <div key={review.id} className="carousel-slide">
                        <div className="account-review-item">
                          <div className="review-card-rating">
                            {review.rating}★
                          </div>

                          <p className="review-card-comment">
                            {review.comment}
                          </p>
                          <p className="review-card-date">
                            {new Date(review.created_at).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="carousel-arrow"
                  onClick={() =>
                    setReviewIndex((i) =>
                      Math.min(i + 1, userReviews.length - 1),
                    )
                  }
                  disabled={clampedReviewIndex === userReviews.length - 1}
                  aria-label="Next review"
                >
                  ›
                </button>
              </div>

              <div className="carousel-dots">
                {userReviews.map((_, i) => (
                  <span
                    key={i}
                    className={`carousel-dot ${i === clampedReviewIndex ? "active" : ""}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div data-tour={TOUR_STEPS.TURRITOPSIS_DOHRNII}>
          <TourStart />
        </div>
        <button onClick={handleSignOut} className="btn-secondary">
          Sign Out
        </button>
      </div>
    </div>
  );
}
