import type { User, SignUpPayload, LogInPayload} from "./types";

const USER_KEY:string = 'mock_user'




export function usernameExists(username: string): boolean {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return false;

  const item: User & { password: string } = JSON.parse(raw);
  return item.username === username;
}

export function mockSignUp({username, password}: SignUpPayload): User{

    const user : User = {
        id: crypto.randomUUID(), 
        username
    };
    localStorage.setItem(USER_KEY, JSON.stringify({...user, password}))
    return user
}


export function mockLogIn({username, password}: LogInPayload): User | null {
    const stored = localStorage.getItem(USER_KEY)
    if (!stored)return null;
    const user = JSON.parse(stored)
    return user.username === username && user.password === password ? {id : user.id, username: user.username}  : null 
}


export function signOut():void{
    localStorage.removeItem(USER_KEY);
}