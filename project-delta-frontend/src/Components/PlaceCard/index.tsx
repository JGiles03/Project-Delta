
import type { Place } from "../../services/types"

type cardProps = {
    place: Place,
}

export default function PlaceCard({place}:cardProps) {

    console.log(place)
  return (

    <div className="place-card">
       <h1>{place.name}</h1> 
    </div>
  )
}
