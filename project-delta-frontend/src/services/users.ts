import type { User } from "./types";


export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`http://4.223.159.135/users/${id}`);

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
    body : JSON.stringify({preferences})
  };

  const res = await fetch(`http://4.223.159.135/users/${userId}/preferences`, options);

  if(!res.ok) throw new Error("Failed to save preferences")
}
