import './index.css'
import { SearchBar, Map } from '../../Components'

export default function MapPage() {
  return (
    <div className='map-page'>
      <div className="search-bar-overlay">
        <SearchBar />
      </div>

      <div className="map-container">
        <Map />
      </div>
    </div>
  )
}