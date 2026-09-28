import { Link } from "react-router-dom";
import { usePlaces } from "../../context/PlacesContext";
import PlaceCard from "../PlaceCard";
import "./index.css";
import { TOUR_STEPS } from "../../services/tourConsts";

export default function PlaceList() {
  const { places, isLoading, error } = usePlaces();

  if (error) return <div className="list-message">{error}</div>;
  if (isLoading) return <div className="list-message">Loading venues...</div>;

  return (
    <div className="list">
      {places.map((place) => (
        <Link to={`/venue/${place.id}`} data-tour={TOUR_STEPS.LISTITEM}>
          <PlaceCard key={place.id} place={place} />
        </Link>
      ))}
    </div>
  );
}
