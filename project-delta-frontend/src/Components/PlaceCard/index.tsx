import type { cardProps } from "../../services/types";
import { amenityIcons } from "../../services/amenities";
import { useFavourites } from "../../context/FavouritesContext";
import "./index.css";
import { TOUR_STEPS } from "../../services/tourConsts";

export default function PlaceCard({ place, distanceKm }: cardProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourited = isFavourite(place.id);
  function handleHeartClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(place.id);
  }
  return (
    <div className="place-card" data-tour={TOUR_STEPS.LISTITEM}>
      <div className="place-card-thumb">
        <button
          type="button"
          data-testid="fav"
          className={`place-card-heart ${favourited ? "active" : ""}`}
          onClick={handleHeartClick}
          aria-label={
            favourited ? "Remove from favourites" : "Add to favourites"
          }
        >
          {favourited ? "♥" : "♡"}
        </button>
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B8A233"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      </div>

      <div className="place-card-body">
        
        <h2 data-testid="place-card-name" className="place-card-name">{place.name}</h2>
        {distanceKm !== undefined && (
          <p className="place-card-distance">{distanceKm.toFixed(1)} km away</p>
        )}

        {place.amenities.length > 0 && (
          <div className="place-card-amenities" data-testid="amenities">
            {place.amenities.slice(0, 4).map((amenity) => (
              <span key={amenity} className="amenity-icon" title={amenity}>
                {amenityIcons[amenity] ? (
                  <img src={amenityIcons[amenity]} alt={amenity} />
                ) : (
                  "•"
                )}
              </span>
            ))}

            {place.amenities.length > 4 && (
              <span className="amenity-icon-more">
                +{place.amenities.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className=" btn-accent"
        onClick={(e) => e.stopPropagation()}
      >
        Directions
      </a>
    </div>
  );
}
