import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  const categories: string[] = properties.categories;
  const amenity: string | undefined = properties.datasource?.raw?.amenity;

  return (
    <div className="venue-page">
      <div className="venue-details-container">
        <h1>{properties.name}</h1>
        <p className="venue-address">{properties.formatted}</p>

        {categories.length > 0 && (
          <div className="venue-categories">
            {categories.map((category) => (
              <span key={category} className="venue-category-chip">
                {category}
              </span>
            ))}
          </div>
        )}

        {amenity && (
          <div className="venue-amenity">
            <strong>Type:</strong> {amenity}
          </div>
        )}

        {properties.website && (
          <Link to={properties.website} className="venue-website">
            Visit website
          </Link>
        )}
      </div>

      <div className="Google-maps"></div>
    </div>
  );
}