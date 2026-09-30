import { createContext, useContext, useState, useEffect, useMemo } from "react";

import type { Place, UserLocation } from "../services/types";
import { GEOAPIFY_CATEGORIES, type CategoryKey } from "../services/categories";
import type { ReactNode } from "react";
import { matchCategory } from "../services/categories";
const API_KEY = import.meta.env.VITE_API_KEY;
const SEARCH_RADIUS = 35000;
const LIMIT = 300;

const FIXED_LOCATION: UserLocation = {
  lat: 51.8098,
  lng: -0.2237,
};

type placesContextType = {
  places: Place[];
  placesByCategory: Record<CategoryKey, Place[]>;
  userLocation: UserLocation | null;
  isLoading: boolean;
  error: string;
};

const PlacesContext = createContext<placesContextType | null>(null);




export function Placesprovider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    setUserLocation(FIXED_LOCATION)

    if (!userLocation) return;
       const placesURL =
          `https://api.geoapify.com/v2/places` +
          `?categories=${GEOAPIFY_CATEGORIES}` +
          `&filter=circle:${userLocation?.lng},${userLocation?.lat},${SEARCH_RADIUS}` +
          `&bias=proximity:${userLocation?.lng},${userLocation?.lat}` +
          `&limit=${LIMIT}` +
          `&apiKey=${API_KEY}`;

    async function fetchPlaces() {
  try {

    const geoRes = await fetch(placesURL);
    if (!geoRes.ok) throw new Error("Failed to fetch places");
    const geoData = await geoRes.json();


    const venueRes = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/venues`);
    if (!venueRes.ok) throw new Error("Failed to fetch venue data");
    const venueData = await venueRes.json();

    const amenitiesByPlaceId = new Map<string, string[]>(
      venueData.map((v: any) => [v.geoapify_place_id, v.amenities ?? []])
    );

    const parsed: Place[] = geoData.features
      .filter((feature: any) => feature.properties.name)
      .map((feature: any) => ({
        id: feature.properties.place_id,
        name: feature.properties.name,
        lat: feature.properties.lat,
        lng: feature.properties.lon,
        category: matchCategory(feature.properties.categories ?? []),
        amenities: amenitiesByPlaceId.get(feature.properties.place_id) ?? [],
      }));

    setPlaces(parsed);
  } catch (err) {
    console.error(err);
    setError("Failed to load nearby venues.");
  } finally {
    setIsLoading(false);
  }
}
    fetchPlaces();
  }, [userLocation]);

  const placesByCategory = useMemo(() => {
    const grouped: Record<CategoryKey, Place[]> = {
      cafe: [],
      restaurant: [],
      museum: [],
      playground: [],
    };

    for (const place of places) {
      if (place.category !== "other") {
        grouped[place.category].push(place);
      }
    }

    return grouped;
  }, [places]);

  return (
    <PlacesContext.Provider value={{ places, placesByCategory, userLocation, isLoading, error }}>
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