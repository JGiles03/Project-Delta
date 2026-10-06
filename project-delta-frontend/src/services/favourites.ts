import type { Place, Venue } from "./types";
import { venueToPlace } from "./venueToPlace";

export async function getFavourites(userId: string): Promise<Place[]> {
  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/favourites`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!res.ok) throw new Error("Failed to fetch favourites");

  const venues: Venue[] = await res.json();
  return venues.map(venueToPlace);
}

export async function addFavourite(userId: string, geoapifyPlaceId: string): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/favourites/${geoapifyPlaceId}`,
    { method: "POST", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  if (!res.ok) throw new Error("Failed to add favourite");
}

export async function removeFavourite(userId: string, geoapifyPlaceId: string): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/favourites/${geoapifyPlaceId}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  if (!res.ok) throw new Error("Failed to remove favourite");
}