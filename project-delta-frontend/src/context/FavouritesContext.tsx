import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favourites";

type FavouritesContextType = {
  favouriteIds: Set<string>;
  isFavourite: (geoapifyPlaceId: string) => boolean;
  toggleFavourite: (geoapifyPlaceId: string) => Promise<void>;
};

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export function FavouritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(
    new Set()
  );

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setFavouriteIds(new Set());
      return;
    }

    getFavourites(userId)
      .then((places) => {
        setFavouriteIds(new Set(places.map((place) => place.id)));
      })
      .catch((err) => {
        console.error("Failed to load favourites:", err);
        setFavouriteIds(new Set());
      });
  }, [userId]);

  const isFavourite = (geoapifyPlaceId: string) => {
    return favouriteIds.has(geoapifyPlaceId);
  };

  const toggleFavourite = async (geoapifyPlaceId: string) => {
    if (!userId) return;

    const currentlyFavourited = favouriteIds.has(geoapifyPlaceId);

    setFavouriteIds((prev) => {
      const next = new Set(prev);

      if (currentlyFavourited) {
        next.delete(geoapifyPlaceId);
      } else {
        next.add(geoapifyPlaceId);
      }

      return next;
    });

    try {
      if (currentlyFavourited) {
        await removeFavourite(userId, geoapifyPlaceId);
      } else {
        await addFavourite(userId, geoapifyPlaceId);
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);


      setFavouriteIds((prev) => {
        const next = new Set(prev);

        if (currentlyFavourited) {
          next.add(geoapifyPlaceId);
        } else {
          next.delete(geoapifyPlaceId);
        }

        return next;
      });
    }
  };

  return (
    <FavouritesContext.Provider
      value={{
        favouriteIds,
        isFavourite,
        toggleFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error(
      "useFavourites must be used within FavouritesProvider"
    );
  }

  return context;
}
