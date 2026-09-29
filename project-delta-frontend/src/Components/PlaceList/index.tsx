import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaces } from "../../context/PlacesContext";
import { CATEGORY_GROUPS } from "../../services/categories";
import { Amenities } from "../../services/amenities";
import { getDistanceKm } from "../../services/distance";
import PlaceCard from "../PlaceCard";
import "./index.css";
import { TOUR_STEPS } from "../../services/tourConsts";

export default function PlaceList() {
  const { placesByCategory, userLocation, isLoading, error } = usePlaces();

  const [searchText, setSearchText] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (error) return <div className="list-message">{error}</div>;
  if (isLoading) return <div className="list-message">Loading venues...</div>;
  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  }

  const activeFilterCount =
    selectedAmenities.length + (maxDistanceKm !== null ? 1 : 0);

  function resetFilters() {
    setSelectedAmenities([]);
    setMaxDistanceKm(null);
  }

  return (
    <div className="list-wrapper">
      <div className="list-toolbar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="list-search-input"
        />

        <button
          type="button"
          className="filter-toggle"
          onClick={() => setIsFilterOpen(true)}
          aria-label="Open filters"
        >
          ☰
          {activeFilterCount > 0 && (
            <span className="filter-toggle-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <div
          className="filter-modal-backdrop"
          onClick={() => setIsFilterOpen(false)}
        >
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <h2>Filters</h2>
              <button
                type="button"
                className="filter-modal-close"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            <div className="filter-modal-body">
              <h3 className="filter-section-title">Amenities</h3>
              <div className="filter-row filter-row-wrap">
                {Amenities.map((amenity) => (
                  <button
                    type="button"
                    key={amenity}
                    className={`filter-chip ${selectedAmenities.includes(amenity) ? "active" : ""}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </button>
                ))}
              </div>

              <h3 className="filter-section-title">Distance</h3>
              <div className="filter-row filter-row-wrap">
                {[1, 5, 10, null].map((km) => (
                  <button
                    type="button"
                    key={km ?? "any"}
                    className={`filter-chip ${maxDistanceKm === km ? "active" : ""}`}
                    onClick={() => setMaxDistanceKm(km)}
                  >
                    {km ? `Within ${km} km` : "Any distance"}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-modal-actions">
              {activeFilterCount > 0 && (
                <button
                  className="btn-accent filter-modal-reset"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              )}
              <button
                className="btn-primary filter-modal-apply"
                onClick={() => setIsFilterOpen(false)}
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-sections">
        {CATEGORY_GROUPS.map((group) => {
          let groupPlaces = placesByCategory[group.key];

          if (searchText.trim()) {
            groupPlaces = groupPlaces.filter((p) =>
              p.name.toLowerCase().includes(searchText.trim().toLowerCase()),
            );
          }

          if (selectedAmenities.length > 0) {
            groupPlaces = groupPlaces.filter((p) =>
              selectedAmenities.every((a) => p.amenities.includes(a)),
            );
          }

          if (userLocation && maxDistanceKm !== null) {
            groupPlaces = groupPlaces.filter(
              (p) =>
                getDistanceKm(
                  userLocation.lat,
                  userLocation.lng,
                  p.lat,
                  p.lng,
                ) <= maxDistanceKm,
            );
          }

          if (groupPlaces.length === 0) return null;

          const sortedPlaces = userLocation
            ? [...groupPlaces].sort(
                (a, b) =>
                  getDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    a.lat,
                    a.lng,
                  ) -
                  getDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    b.lat,
                    b.lng,
                  ),
              )
            : groupPlaces;

          return (
            <section key={group.key} className="category-section">
              <h2 className="category-heading">{group.label}</h2>
              <div className="category-row">
                {sortedPlaces.map((place) => (
                  <Link
                    key={place.id}
                    to={`/venue/${place.id}`}
                    className="category-row-item"
                    data-tour={TOUR_STEPS.LISTITEM}
                  >
                    <PlaceCard
                      place={place}
                      distanceKm={
                        userLocation
                          ? getDistanceKm(
                              userLocation.lat,
                              userLocation.lng,
                              place.lat,
                              place.lng,
                            )
                          : undefined
                      }
                    />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
