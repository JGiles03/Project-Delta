import { usePlaces } from "../../context/PlacesContext"
import PlaceCard from "../PlaceCard"

export default function PlaceList() {

  const {places} = usePlaces()


  return (
    <>
    {places.map((place) =>(
      <PlaceCard key={place.id} place={place} />
    ))}
    </>
  )
}
