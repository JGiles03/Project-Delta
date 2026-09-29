import { createContext, useContext, useState, useEffect } from "react";

import type { Place, UserLocation } from "../services/types";
import type { ReactNode } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const SEARCH_RADIUS = 35000;
const LIMIT = 100;


const FIXED_LOCATION: UserLocation = {
  lat: 51.8098,
  lng: -0.2237,
};

type placesContextType = {
  places: Place[];
  userLocation: UserLocation | null;
  isLoading: boolean;
  error: string;
};

const PlacesContext = createContext<placesContextType | null>(null);

export function Placesprovider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(FIXED_LOCATION);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLocation) return;

    async function fetchPlaces() {
      try {
        const placesURL =
          `https://api.geoapify.com/v2/places` +
          `?categories=catering.cafe` +
          `&filter=circle:${userLocation?.lng},${userLocation?.lat},${SEARCH_RADIUS}` +
          `&bias=proximity:${userLocation?.lng},${userLocation?.lat}` +
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

  return (
    <PlacesContext.Provider value={{ places, userLocation, isLoading, error }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const context = useContext(PlacesContext);

  if (!context) {
    throw new Error("usePlaces must be used within PlacesProvider");
  }
  return context;
}