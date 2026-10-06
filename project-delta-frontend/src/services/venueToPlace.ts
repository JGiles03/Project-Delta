import type { Venue, Place } from "./types";
import { matchCategory } from "./categories";

export function venueToPlace(venue: Venue): Place {
  return {
    id: venue.geoapify_place_id,
    name: venue.name,
    address: venue.address,
    lat: parseFloat(venue.latitude),
    lng: parseFloat(venue.longitude),
    category: matchCategory([venue.category]),
    amenities: venue.amenities as unknown as string[],
  };
}