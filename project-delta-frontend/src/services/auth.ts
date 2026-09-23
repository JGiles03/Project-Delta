import type { User, SignUpPayload, LogInPayload } from "./types";

const USER_KEY: string = "mock_user";

// export function validPassword(password: string): boolean {
//   const str = localStorage.getItem(USER_KEY);
//   if (!str) return false;
//   const item: User & { password: string } = JSON.parse(str);
//   return item.password === password;
// }

// export function mockSignUp({email, password}: SignUpPayload): User{

//     const user : User = {
//         id: crypto.randomUUID(),
//         email
//     };
//     localStorage.setItem(USER_KEY, JSON.stringify({...user, password}))
//     return user
// }

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

// export function mockLogIn({ email, password }: LogInPayload): User | null {
//   const stored = localStorage.getItem(USER_KEY);
//   if (!stored) return null;
//   const user = JSON.parse(stored);
//   return user.email === email && user.password === password
//     ? { id: user.id, email: user.email }
//     : null;
// }

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
