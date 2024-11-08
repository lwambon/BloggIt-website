import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="heros-section">
      <div className="heros-container">
        <h1 className="heros-title">
          Unleash Your Voice by Inspiring Others Through Your Unique Journey
        </h1>
        <p className="heros-details">
          Discover the power of sharing your personal story to uplift, connect,
          and inspire others on their own journeys.
        </p>

        <div className="heros-link">
          <Link className="heros-link-items " to="/signup">
            start writing
          </Link>
          <Link className="heros-link-items " to="/explore">
            Explore stories from other readers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
