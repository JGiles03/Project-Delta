import type { Place } from "./types";

export async function getFavourites(userId: string): Promise<Place[]> {
  const res = await fetch(`http://4.223.159.135/users/${userId}/favourites`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!res.ok) throw new Error("Failed to fetch favourites");

 const data = await res.json();
 return data

}

export async function addFavourite(userId: string, geoapifyPlaceId: string): Promise<void> {
  const res = await fetch(
    `http://4.223.159.135/users/${userId}/favourites/${geoapifyPlaceId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  if (!res.ok) throw new Error("Failed to add favourite");
}

export async function removeFavourite(userId: string, geoapifyPlaceId: string): Promise<void> {
  const res = await fetch(
    `http://4.223.159.135/users/${userId}/favourites/${geoapifyPlaceId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  if (!res.ok) throw new Error("Failed to remove favourite");
}