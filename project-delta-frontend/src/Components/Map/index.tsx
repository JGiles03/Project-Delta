import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import placePin from "../../assets/placePin.png";
import userPin from "../../assets/userPin.png";
import { usePlaces } from "../../context/PlacesContext";

const API_KEY = import.meta.env.VITE_API_KEY;

const TILES_URL = `https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=${API_KEY}`;



const placesIcon = L.icon({
  iconUrl: placePin,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const userIcon = L.icon({
  iconUrl: userPin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});



export default function Map() {
  const { places, userLocation, isLoading, error } = usePlaces();

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading || !userLocation) {
    return <div>Finding your location...</div>;
  }

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={TILES_URL}
        attribution="© OpenStreetMap contributors | Geoapify"
      />

      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={userIcon}
      >
        <Popup>
          <strong>You are here</strong>
        </Popup>
      </Marker>

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={placesIcon}
        >
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}