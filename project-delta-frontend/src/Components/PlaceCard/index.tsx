import type { cardProps } from "../../services/types";


import "./index.css";

export default function PlaceCard({ place, distanceKm }: cardProps) {
  return (
    <div className="place-card">
      <div className="place-card-thumb">
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
        <h2 className="place-card-name">{place.name}</h2>
        {distanceKm !== undefined && (
          <p className="place-card-distance">{distanceKm.toFixed(1)} km away</p>
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
