import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API_KEY = import.meta.env.VITE_API_KEY;

export default function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const detailsURL = `https://api.geoapify.com/v2/place-details?id=${id}&features=details&apiKey=${API_KEY}`;

    async function fetchVenue() {
      try {
        setIsLoading(true)
        const res = await fetch(detailsURL);
        const data = await res.json();
        setVenue(data);
        setIsLoading(false)
      } catch (err) {
        console.error(err);
        setIsLoading(false)
        setError("Failed to load venue details.");
      }
    }

    fetchVenue();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading venue...</div>; 
  if (!venue?.features?.length) return <div>Venue not found.</div>;

  const properties = venue.features[0].properties
  const categories: string[] = venue.categories
  const amenities: string[] = venue.datasource.raw.amenity

  return (
    <div className="venue-page">
      <div className="venue-details-container">
        <h1>{properties.name}</h1>
      </div>

      <div className="Google-maps"></div>
    </div>
  );
}