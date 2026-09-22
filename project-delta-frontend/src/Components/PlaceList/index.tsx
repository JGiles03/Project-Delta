import { usePlaces } from "../../context/PlacesContext"
import PlaceCard from "../PlaceCard"
import './index.css'

export default function PlaceList() {
  const { places, isLoading, error } = usePlaces()

  if (error) return <div className="list-message">{error}</div>
  if (isLoading) return <div className="list-message">Loading venues...</div>

  return (
    <div className="list">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  )
}