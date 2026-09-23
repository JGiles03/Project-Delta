import { Link } from "react-router-dom";
import "./index.css";

export default function HomePage() {
  return (
    <div className="home-container">
      
      <div className="home-card">
        <h1>Welcome to <span className="highlight">Child & Me</span></h1>
        <p>The only place needed to plan your next adventure with your kids</p>

        <div className="home-actions">
          <Link to="/signup" className="btn-primary">Sign up</Link>
          <Link to="/login" className="btn-secondary">Log in</Link>
            <Link to="/home/map" className="btn-secondary">Continue as a guest</Link>
        </div>
      </div>
    </div>
  );
}