import './map.css'
import { SearchBar } from '../../Components'

export default function MapPage() {
  return (
    <div className='map-page'>
      <h1>Temporary Map page</h1>
      <SearchBar />
      <div className="map-image">
        <img src="https://www.mapsofworld.com/maps/world-map.jpg" alt="map"></img>
      </div>
    </div>
  )
}
