import { Link } from "react-router-dom";
import "./index.css";
import childAndMeLogo from "../../assets/amenities/child-and-me-logo.svg";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">
        <img
          src={childAndMeLogo}
          alt="Child & Me logo"
          className="home-logo"
        />

        <h1>
          Welcome to <span className="highlight">Child & Me</span>
        </h1>

        <p>
          The only place needed to plan your next adventure with your kids
        </p>

        <div className="home-actions">
          <Link to="/signup" className="btn-primary">
            Sign up
          </Link>

          <Link to="/login" className="btn-secondary">
            Log in
          </Link>

          <Link to="/list" className="btn-secondary">
            Continue as a guest
          </Link>
        </div>
      </div>
    </div>
  );
}