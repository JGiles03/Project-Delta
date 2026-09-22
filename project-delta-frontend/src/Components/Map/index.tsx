import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import placePin from "../../assets/placePin.png";
import userPin from "../../assets/userPin.png";

import type { Place } from "../../services/types";

const API_KEY = import.meta.env.VITE_API_KEY;

const TILES_URL = `https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=${API_KEY}`;

const SEARCH_RADIUS = 1000; 
const LIMIT = 30

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

type UserLocation = {
  lat: number;
  lng: number;
};

export default function Map() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);


  useEffect(() => {
    if (!userLocation) return;

    async function fetchPlaces() {
      try {
        const placesURL =
          `https://api.geoapify.com/v2/places` +
          `?categories=catering.cafe` +
          `&filter=circle:${userLocation?.lng},${userLocation?.lat},${SEARCH_RADIUS}` +
          `&limit=${LIMIT}` +
          `&apiKey=${API_KEY}`;

        const response = await fetch(placesURL);

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        const data = await response.json();

        const parsed: Place[] = data.features.map((feature: any) => ({
          id: feature.properties.place_id,
          name: feature.properties.name ?? "Unnamed Cafe",
          address: feature.properties.formatted,
          lat: feature.properties.lat,
          lng: feature.properties.lon,
        }));

        setPlaces(parsed);
      } catch (err) {
        console.error(err);
        setError("Failed to load nearby cafes.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, [userLocation]);

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