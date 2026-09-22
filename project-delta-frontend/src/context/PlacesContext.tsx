import React, { createContext, useContext, useState } from "react";

import type { Place } from "../services/types";
import type { ReactNode } from "react";

type placesContextType = {
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
};

const PlacesContext = createContext<placesContextType | null>(null);

export function Placesprovider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);

  return (
    <PlacesContext.Provider value={{ places, setPlaces }}>
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
