const USE_MOCK = false;
export async function savePreferences(preferences: string[]): Promise<void> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return;
  }

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
