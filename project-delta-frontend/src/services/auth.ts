import type { User, SignUpPayload, LogInPayload } from "./types";

export async function signUp({
  email,
  password,
}: SignUpPayload): Promise<User | null> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const res = await fetch("http://4.223.159.135/auth/register", options);

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  return await res.json();
}

export async function logIn({ email, password }: LogInPayload): Promise<void> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const res = await fetch("http://4.223.159.135/auth/login", options);

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const user = await res.json();
  if (!user.token || user.id == null) {
  throw new Error("Login response is missing token or id");
}
  localStorage.setItem("token", user.token);
  localStorage.setItem("userId", user.id)
}

export function signOut(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

