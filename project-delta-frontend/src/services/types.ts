export type User = {
    id : string;
    email : string;
}

export type SignUpPayload = {
    email : string;
    password : string;
}

export type LogInPayload = {
    email : string;
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

export type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
};