
import accessibleEntrance from "../assets/amenities/accessible-entrance.svg";
import accessibleToilet from "../assets/amenities/accessible-toilet.svg";
import breastfeedingFriendly from "../assets/amenities/breastfeeding-friendly.svg";
import changingFacilities from "../assets/amenities/changing-facilities.svg";
import childrensActivities from "../assets/amenities/childrens-activities.svg";
import highChairs from "../assets/amenities/high-chairs.svg";
import parking from "../assets/amenities/parking.svg";
import pramStorage from "../assets/amenities/pram-storage.svg";
import pramsAllowed from "../assets/amenities/prams-allowed.svg";
import tableReservation from "../assets/amenities/table-reservation.svg";

export const Amenities: string[] = [
  "Accessible entrance",
  "Accessible toilet",
  "Changing facilities",
  "High chairs",
  "Pram storage",
  "Prams allowed",
  "Breastfeeding friendly",
  "Children's activities",
  "Parking",
  "Table reservation",
];


export const amenityIcons: Record<string, string> = {
  "Accessible entrance": accessibleEntrance,
  "Accessible toilet": accessibleToilet,
  "Breastfeeding friendly": breastfeedingFriendly,
  "Changing facilities": changingFacilities,
  "Children's activities": childrensActivities,
  "High chairs": highChairs,
  "Parking": parking,
  "Prams allowed": pramsAllowed,
  "Pram storage": pramStorage,
  "Table reservation": tableReservation,
};