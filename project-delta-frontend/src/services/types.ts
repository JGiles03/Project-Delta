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

export type Place = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export type UserLocation = {
    lat: number;
    lng: number;
}
export type cardProps = {
    place: Place,
}