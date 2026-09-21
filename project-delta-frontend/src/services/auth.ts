import type { User, SignUpPayload, LogInPayload} from "./types";

const USER_KEY:string = 'mock_user'

export function usernameExists(username: string): boolean {
    const str = localStorage.getItem(USER_KEY);
    if (!str) return false;
    
    const item: User & { password: string } = JSON.parse(str);
    return item.username === username;
}

export function validPassword(password : string): boolean{
     const str = localStorage.getItem(USER_KEY);
    if (!str) return false;
    const item: User & { password: string } = JSON.parse(str);
    return item.password === password;

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