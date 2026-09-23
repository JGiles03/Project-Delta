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



export async function logIn({
  email,
  password,
}: LogInPayload): Promise<User | null> {
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

  localStorage.setItem("token", user.token);
  localStorage.setItem("user", user)
  return user;
}

export function signOut(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user')
}
