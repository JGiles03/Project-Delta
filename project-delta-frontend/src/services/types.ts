export type User = {
    id : string;
    username : string;
}

export type SignUpPayload = {
    username : string;
    password : string;
}

export type LogInPayload = {
    username : string;
    password : string;
    
}