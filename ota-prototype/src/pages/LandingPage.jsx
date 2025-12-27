import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="page hero">
      <p className="eyebrow">Decision-first travel</p>
      <h1>Travel without the chaos when flights delay</h1>
      <p className="lead">Choose how you want to travel — cheapest or managed.</p>
      <div className="cta-row">
        <Link className="primary-btn" to="/search">
          Search flights
        </Link>
        <a className="link" href="#how-it-works">
          How it works
        </a>
      </div>
      <div id="how-it-works" className="card info">
        <h3>Calm support, no pressure</h3>
        <ul className="bullets">
          <li>Search normally, with fares straight from airlines and OTAs.</li>
          <li>Pick between a managed journey or the absolute cheapest.</li>
          <li>If you choose managed, we step in automatically when delays hit.</li>
        </ul>
      </div>
    </section>
  );
}
