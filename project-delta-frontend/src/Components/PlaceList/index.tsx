import { Link } from "react-router-dom";
import { usePlaces } from "../../context/PlacesContext";
import { CATEGORY_GROUPS } from "../../services/categories";
import { getDistanceKm } from "../../services/distance";
import PlaceCard from "../PlaceCard";
import "./index.css";
import { TOUR_STEPS } from "../../services/tourConsts";

export default function PlaceList() {
  const { placesByCategory, userLocation, isLoading, error } = usePlaces();

  if (error) return <div className="list-message">{error}</div>;
  if (isLoading) return <div className="list-message">Loading venues...</div>;

  return (
    <div className="category-sections">
      {CATEGORY_GROUPS.map((group) => {
        const groupPlaces = placesByCategory[group.key];
        if (groupPlaces.length === 0) return null;

        const sortedPlaces = userLocation
          ? [...groupPlaces].sort(
              (a, b) =>
                getDistanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng) -
                getDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng)
            )
          : groupPlaces;

        return (
          <section key={group.key} className="category-section">
            <h2 className="category-heading">{group.label}</h2>
            <div className="category-row">
              {sortedPlaces.map((place) => (
                <Link
                  key={place.id}
                  to={`/venue/${place.id}`}
                  className="category-row-item"
                  data-tour={TOUR_STEPS.LISTITEM}
                >
                  <PlaceCard
                    place={place}
                    distanceKm={
                      userLocation
                        ? getDistanceKm(userLocation.lat, userLocation.lng, place.lat, place.lng)
                        : undefined
                    }
                  />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}