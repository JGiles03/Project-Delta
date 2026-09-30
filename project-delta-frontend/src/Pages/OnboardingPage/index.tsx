import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Amenities } from "../../services/amenities";
import { savePreferences } from "../../services/users";
import "./index.css";

type Step = "intro" | "preferences" | "done";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [step, setStep] = useState<Step>("intro");
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!token) return <Navigate to="/login" replace />;

  function toggleAmenity(amenity: string) {
    setSelected((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  }

  async function handleSave() {
    setError("");
    setIsSubmitting(true);

    try {
      await savePreferences(selected);
      setStep("done");
    } catch (err) {
      console.error(err);
      setError("We couldn't save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        {step === "intro" && (
          <>
            <h1>
              Welcome to <span className="onboarding-highlight">Child & Me</span>
            </h1>
            <p>
              Find cafés, playgrounds and museums near you, and see at a glance
              which ones have high chairs, changing facilities, pram space and
              step-free access.
            </p>
            <button className="btn-primary" onClick={() => setStep("preferences")}>
              Continue
            </button>
          </>
        )}

        {step === "preferences" && (
          <>
            <h1>What matters most to you?</h1>
            <p>Pick the amenities you look for. You can change these later.</p>

            <div className="amenity-grid">
              {Amenities.map((amenity) => {
                const isSelected = selected.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
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
              className="btn-primary"
              onClick={handleSave}
              disabled={isSubmitting || selected.length === 0}
            >
              {isSubmitting ? "Saving..." : "Save preferences"}
            </button>
            <button className="onboarding-skip" onClick={() => navigate("/map")}>
              Skip for now
            </button>
          </>
        )}

        {step === "done" && (
          <>
            <div className="onboarding-check">✓</div>
            <h1>Thank you!</h1>
            <p>Your preferences are saved. Enjoy exploring.</p>
            <Link to="/map" className="btn-accent">Get started</Link>
          </>
        )}
      </div>
    </div>
  );
}