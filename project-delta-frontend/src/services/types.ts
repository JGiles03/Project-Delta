export type User = {
    id : number;
    email : string;
    preferences: string[];
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
export type Amenity = {
id: number;
name: string;
};

export type Venue = {
id: number;
geoapify_place_id: string;
category: string;
address: string;
borough: string | null;
website: string | null;
opening_hours: string | null;
name: string;
description: string | null;
latitude: string;
longitude: string;
postcode: string;
age_suitability: string | null;
owner_id: number | null;
created_at: string;
amenities: Amenity[];
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
  created_at: string;
};