import type { cardProps } from "../../services/types"


import './index.css'

export default function PlaceCard({ place }: cardProps) {
  return (
    <div className="place-card">
      <div className="place-card-thumb">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8A233" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      </div>

      <div className="place-card-body">
        <h2 className="place-card-name">{place.name}</h2>
        <p className="place-card-address">{place.address}</p>
      </div>
    </div>
  )
}