import { useEffect, useState } from "react";
import "./index.css";

type Amenity = {
  amenity_id: number;
  name: string;
};

type AmenityDemand = Amenity & {
  searches: number;
};

type VenueAnalytics = {
  venue_id: number;
  name: string;
  views: number;
  relevant_searches: number;
  venue_amenities: Amenity[];
  amenity_demand: AmenityDemand[];
  opportunities: AmenityDemand[];
};

type AnalyticsData = {
  generated_at: string;
  is_demo_data: boolean;
  venues: VenueAnalytics[];
};

export default function BusinessPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/analytics/business-analytics.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load analytics");
        }

        return response.json();
      })
      .then((data: AnalyticsData) => {
        setAnalytics(data);

        if (data.venues.length > 0) {
          setSelectedVenueId(data.venues[0].venue_id);
        }
      })
      .catch((error) => {
        console.error("Failed to load business analytics:", error);
      });
  }, []);

  if (!analytics || selectedVenueId === null) {
    return (
      <div className="business-page">
        <p>Loading analytics...</p>
      </div>
    );
  }

  const venue = analytics.venues.find(
    (item) => item.venue_id === selectedVenueId
  );

  if (!venue) {
    return (
      <div className="business-page">
        <p>Venue analytics not found.</p>
      </div>
    );
  }

  return (
    <div className="business-page">
      <header className="business-header">
        <p className="business-eyebrow">Venue analytics</p>

        <h1>Business Dashboard</h1>

        <p>
          Understand how parents are discovering and evaluating your venue.
        </p>

        {analytics.is_demo_data && (
          <p className="demo-label">
            Demo analytics using simulated parent activity
          </p>
        )}
      </header>

      <section className="business-filters">
        <select
          value={selectedVenueId}
          onChange={(event) =>
            setSelectedVenueId(Number(event.target.value))
          }
        >
          {analytics.venues.map((item) => (
            <option
              key={item.venue_id}
              value={item.venue_id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <select defaultValue="60" disabled>
          <option value="60">Last 60 days</option>
        </select>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <p>Venue views</p>
          <h2>{venue.views}</h2>
          <span>Simulated activity</span>
        </article>

        <article className="metric-card">
          <p>Relevant searches</p>
          <h2>{venue.relevant_searches}</h2>
          <span>Estimated nearby demand</span>
        </article>
      </section>

      <section className="analytics-card">
        <h2>Venue views over time</h2>

        <img
          className="analytics-chart"
          src="/analytics/venue-views-over-time.png"
          alt="Venue views over time"
        />
      </section>

      <section className="analytics-card">
        <h2>Most requested amenities</h2>

        <img
          className="analytics-chart"
          src="/analytics/amenity-demand.png"
          alt="Most requested amenities"
        />
      </section>

      <section className="analytics-card">
        <h2>Your venue amenities</h2>

        <div className="amenity-list">
          {venue.venue_amenities.length > 0 ? (
            venue.venue_amenities.map((amenity) => (
              <span
                className="amenity-chip"
                key={amenity.amenity_id}
              >
                ✓ {amenity.name}
              </span>
            ))
          ) : (
            <p>No amenities currently recorded.</p>
          )}
        </div>
      </section>

      <section className="analytics-card">
        <h2>Amenity opportunities</h2>

        <p className="section-description">
          Amenities requested in relevant nearby searches that aren't
          currently recorded for this venue.
        </p>

        <div className="opportunity-list">
          {venue.opportunities.length > 0 ? (
            venue.opportunities.slice(0, 5).map((opportunity) => (
              <div
                className="opportunity-row"
                key={opportunity.amenity_id}
              >
                <span>{opportunity.name}</span>

                <strong>
                  {opportunity.searches} searches
                </strong>
              </div>
            ))
          ) : (
            <p>No amenity opportunities identified.</p>
          )}
        </div>
      </section>

      <section className="analytics-card">
        <h2>When parents search</h2>

        <img
          className="analytics-chart"
          src="/analytics/search-heatmap.png"
          alt="Parent searches by day and time"
        />
      </section>

      
    </div>
  );
}