import "./Hero.css";

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
          <a href="" className="heros-link-items">
            start writting
          </a>
          <a href="" className="heros-link-items">
            explore stories for readers
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
