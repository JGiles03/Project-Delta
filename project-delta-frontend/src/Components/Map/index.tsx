import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import placePin from "../../assets/placePin.png"
import userPin from "../../assets/userPin.png"
import type { Place } from "../../services/types";



const API_KEY = import.meta.env.VITE_API_KEY;
const Tiles_URL = `https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=${API_KEY}`;

const AREA_RECT = "-0.10,51.53,-0.02,51.57";


const placesIcon = L.icon({
  iconUrl: placePin,
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 31],
  iconAnchor: [12, 41],
});

const userIcon = L.icon({
  iconUrl: userPin,
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [40, 41],
  iconAnchor: [12, 41],
})

export default function Map() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => setError("Unable to retrieve your location"),
    );
  }, []);

  useEffect(() => {
    const places_URL = `https://api.geoapify.com/v2/places?categories=catering.cafe&filter=rect:${AREA_RECT}&limit=20&apiKey=${API_KEY}`;
    async function fetchPlaces() {
      try {
        const res = await fetch(places_URL);
        const data = await res.json();



        const parsed: Place[] = data.features.map((feature: any) => ({
          id: feature.properties.place_id,
          name: feature.properties.name ?? "Unnamed Venue",
          address: feature.properties.formatted,
          lat: feature.properties.lat,
          lng: feature.properties.lon,
        }));

        setPlaces(parsed);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPlaces();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userLocation) return <div>Finding your location...</div>;

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={Tiles_URL}
        attribution='Powered by <a href="https://www.geoapify.com/">Geoapify</a> | © OpenStreetMap contributors'
        maxZoom={20}
      />

      <Marker
        position={[userLocation.lat, userLocation.lng]}
        icon={userIcon}
      >
        <Popup>You are here</Popup>
      </Marker>

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={placesIcon}
        >
          <Popup>{place.name}
          <br />
          {place.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
