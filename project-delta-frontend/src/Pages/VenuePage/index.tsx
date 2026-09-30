import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import type { Venue } from "../../services/types";
import { amenityIcons } from "../../services/amenities";
import { TOUR_STEPS } from "../../services/tourConsts";


export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const detailsURL = `http://4.223.159.135/venues/geoapify/${id}`;

    async function fetchVenue() {
      try {
        setIsLoading(true);
        const res = await fetch(detailsURL);

        if (!res.ok) throw new Error("Failed to fetch venue");

        const data = await res.json();
        setVenue(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load venue details.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading venue...</div>;
  if (!venue) return <div>Venue not found.</div>;

  return (
    <div className="venue-page"  data-tour={TOUR_STEPS.VENUEPAGE}>
      <div className="venue-details-container">
        <h1>{venue.name || "Unknown Name"}</h1>
        <p className="venue-address">{venue.address}</p>

        {venue.category && (
          <div className="venue-type">
            <strong>Type:</strong> {venue.category}
          </div>
        )}

        {venue.website && (
          <div className="venue-website">
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-website"
            >
              Visit their website
            </a>
          </div>
        )}

        {venue.amenities?.length > 0 && (
          <div className="venue-amenities">
            <h3>Amenities</h3> 
            <div className="amenities-list">
              {venue.amenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="amenity-icon"
                  data-testid="amenity-icon"
                  title={amenity.name}
                >
                  {amenityIcons[amenity.name] ?? "📍"}
                </span>
              ))}
            </div>
          </div>
        )}

        <h2>Reviews</h2>
        <div className="review-actions">
          <Link to={`/venue/${id}/reviews`} className="btn-secondary">
            See all reviews
          </Link>
          <Link to={`/venue/${id}/post-review`} className="btn-accent">
            Post a review
          </Link>
        </div>
      </div>

      <div className="Google-maps">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
