import type { Review, User } from "./types";

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${id}`);

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function savePreferences(preferences: string[]): Promise<void> {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ preferences }),
  };

  const res = await fetch(
    `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}/preferences`,
    options,
  );

  if (!res.ok) throw new Error("Failed to save preferences");
}


export async function fetchReviews(id: string): Promise<Review[]> {
  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${id}/reviews`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!res.ok) throw new Error("Failed to fetch reviews");

  return res.json();
}
