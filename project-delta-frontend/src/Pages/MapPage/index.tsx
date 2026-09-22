import './map.css'
import { SearchBar, Map } from '../../Components'

export default function MapPage() {

  return (
    <div className='map-page'>
      <div data-testid="search-bar-overlay" className="search-bar-overlay">
        <SearchBar />
      </div>

      <div data-testid="map-container" className="map-container">
        <Map />
      </div>
    </div>
  )
}