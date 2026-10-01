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

  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/register`, options);

  if (!res.ok) {
    throw new Error("Failed to create account");
  }

  return await res.json();
}


export async function logIn({
  email,
  password,
}: LogInPayload): Promise<string> {
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

  const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth/login`, options);

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const user = await res.json();

  localStorage.setItem("token", user.token);
  localStorage.setItem("userid", String(user.id));
  localStorage.setItem("email", email);

  const payload = JSON.parse(
    atob(user.token.split(".")[1])
  );

  localStorage.setItem("role", payload.role);


  return payload.role;
}

export function signOut(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userid");
  localStorage.removeItem("role");
}

