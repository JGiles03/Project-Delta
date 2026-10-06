import { useEffect, useState } from "react";
import "./index.css";

type VenueAmenity = {
  id: number;
  name: string;
};

type Venue = {
  id: number;
  name: string;
  category: string | null;
  address: string | null;
  postcode: string;
  amenities: VenueAmenity[];
};

type AmenityOpportunity = {
  amenity_id: number;
  name: string;
  searches: number;
  demand_rate: number;
  projection_chart: string;
};

type AnalyticsData = {
  generated_at: string;
  is_demo_data: boolean;
  views: number;
  relevant_searches: number;
  views_chart: string;
  amenity_demand_chart: string;
  search_heatmap_chart: string;
  search_demand_chart: string;
  projection_method: string;
  opportunities: AmenityOpportunity[];
};



export default function BusinessPage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [selectedAmenityId, setSelectedAmenityId] = useState<number | null>(
    null
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You must be logged in to view this dashboard.");
        }

        const [venueResponse, analyticsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/venues/mine`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("/analytics/business-analytics.json"),
        ]);

        if (!venueResponse.ok) {
          throw new Error("Could not load your venue.");
        }

        if (!analyticsResponse.ok) {
          throw new Error("Could not load business analytics.");
        }

        const venueData: Venue = await venueResponse.json();
        const analyticsData: AnalyticsData = await analyticsResponse.json();

        setVenue(venueData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Failed to load business dashboard:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Could not load the business dashboard."
        );
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return (
      <div className="business-page">
        <p>{error}</p>
      </div>
    );
  }

  if (!venue || !analytics) {
    return (
      <div className="business-page">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const availableOpportunities = analytics.opportunities
  .filter(
    (opportunity) =>
      !venue.amenities.some(
        (amenity) => amenity.name === opportunity.name
      )
  )
  .sort((a, b) => b.searches - a.searches);

  const selectedAmenity = availableOpportunities.find(
    (amenity) => amenity.amenity_id === selectedAmenityId
  );

  return (
    <div className="business-page">
      <header className="business-header">
        <p className="business-eyebrow">Venue analytics</p>

        <h1>{venue.name}</h1>

        {venue.address && <p>{venue.address}</p>}

        {analytics.is_demo_data && (
          <p className="demo-label">
            Demo analytics using parent activity
          </p>
        )}
      </header>

      <section className="metric-grid">
        <article className="metric-card">
          <p>Venue views</p>
          <h2>{analytics.views}</h2>
          <span>Activity</span>
        </article>

        <article className="metric-card">
          <p>Relevant searches</p>
          <h2>{analytics.relevant_searches}</h2>
          <span>Estimated nearby demand</span>
        </article>
      </section>

      <section className="analytics-card">
        <h2>Explore potential amenity impact</h2>

        <p className="section-description projection-intro">
          Choose an amenity to see how it could affect traffic to your venue.
          The projection uses simulated parent search demand to estimate the
          potential impact on venue views.
        </p>

        <div className="projection-controls">
          <label htmlFor="amenity-projection">
            Choose an amenity   
          </label>

          <select
            id="amenity-projection"
            value={selectedAmenityId ?? ""}
            onChange={(event) =>
              setSelectedAmenityId(
                event.target.value
                  ? Number(event.target.value)
                  : null
              )
            }
          >
            <option value="">Current views only</option>

            {availableOpportunities.map((amenity) => (
              <option
                key={amenity.amenity_id}
                value={amenity.amenity_id}
              >
                {amenity.name}
              </option>
            ))}
          </select>
        </div>

        <img
          className="analytics-chart"
          src={
            selectedAmenity?.projection_chart ??
            analytics.views_chart
          }
          alt={
            selectedAmenity
              ? `Illustrative projected venue views with ${selectedAmenity.name}`
              : `Simulated venue views for ${venue.name}`
          }
        />

        {selectedAmenity && (
          <div className="projection-explanation">
            <strong>What does this projection mean?</strong>

            <p>
              {selectedAmenity.name} appeared in{" "}
              <strong>{selectedAmenity.searches} searches</strong>.
              The red line estimates how venue views could change if this
              amenity were added.
            </p>

            <small>
              Illustrative estimate based on simulated demand — not a
              guaranteed increase in visits.
            </small>
          </div>
        )}
      </section>

      <section className="analytics-card">
        <h2>Most requested amenities</h2>

        <p className="section-description">
          Amenities most frequently selected in simulated nearby
          parent searches.
        </p>

        <img
          className="analytics-chart"
          src={analytics.amenity_demand_chart}
          alt="Most requested amenities"
        />
      </section>

      <section className="analytics-card">
        <h2>Your venue amenities</h2>

        <div className="amenity-list">
          {venue.amenities.length > 0 ? (
            venue.amenities.map((amenity) => (
              <span
                className="amenity-chip"
                key={amenity.id}
              >
                ✓ {amenity.name}
              </span>
            ))
          ) : (
            <p>No amenities currently recorded for this venue.</p>
          )}
        </div>
      </section>

      <section className="analytics-card">
        <h2>Amenity opportunities</h2>

        <p className="section-description">
          Amenities appearing in simulated parent searches that
          aren't currently recorded for your venue.
        </p>

        <div className="opportunity-list">
          {availableOpportunities.length > 0 ? (
            availableOpportunities.slice(0, 5).map((opportunity) => (
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
        <h2>How parents discovered your venue</h2>

        <p className="section-description">
          See which parts of Child & Me are driving parents to discover
          your venue.
        </p>

        <img
          className="analytics-chart traffic-sources-chart"
          src="/analytics/traffic-sources.png"
          alt="How parents discovered your venue"
        />

        <small className="analytics-note">
          Discovery source data is simulated for demonstration purposes.
        </small>
      </section>
    </div>
  );
}