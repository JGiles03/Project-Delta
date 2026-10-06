import { useEffect, useState } from "react";
import { Amenities } from "../../services/amenities";
import { getUserById, savePreferences } from "../../services/users";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function PreferencesForm() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      try {
        setError("");

        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("No user ID found");
        }

        const user = await getUserById(userId);

        setSelected(user.preferences ?? []);
      } catch (err) {
        console.error(err);
        setError("We couldn't load your preferences.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPreferences();
  }, []);

  function toggleAmenity(amenity: string) {
    setSelected((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  }

  async function handleSave() {
    setError("");
    setIsSubmitting(true);

    try {
      await savePreferences(selected);
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError("We couldn't save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="preferences-form">
        <h1>Your preferences</h1>
        <p>Loading your preferences...</p>
      </div>
    );
  }

  return (
    <div className="preferences-form">
      <h1>Your preferences</h1>

      <p>Select the amenities that are important to you.</p>

      <div className="amenity-grid">
        {Amenities.map((amenity) => {
          const isSelected = selected.includes(amenity);

          return (
            <button
              key={amenity}
              type="button"
              className={`amenity-chip ${isSelected ? "selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => toggleAmenity(amenity)}
            >
              {amenity}
            </button>
          );
        })}
      </div>

      {error && <div className="message-box error">{error}</div>}

      <button
        type="button"
        className="btn-primary"
        onClick={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save preferences"}
      </button>
    </div>
  );
}
