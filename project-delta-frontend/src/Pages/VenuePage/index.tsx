import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
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
        setIsLoading(true);
        const res = await fetch(detailsURL);
        const data = await res.json();
        setVenue(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load venue details.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading venue...</div>;
  if (!venue?.features?.length) return <div>Venue not found.</div>;

  const properties = venue.features[0].properties;
  const amenity: string | undefined = properties.datasource?.raw?.amenity;

  return (
    <div className="venue-page">
      <div className="venue-details-container">
        <h1>{properties.name}</h1>
        <p className="venue-address">{properties.formatted}</p>

        {amenity && (
          <div className="venue-amenity">
            <strong>Type:</strong> {amenity}
          </div>
        )}

        {properties.website && (
          <a
            href={properties.website}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-website"
          >
            Visit their website
          </a>
        )}
      </div>

      <div className="Google-maps"></div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${properties.lat},${properties.lon}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-accent"
      >
        Get directions
      </a>
    </div>
  );
}
