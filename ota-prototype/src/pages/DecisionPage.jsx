import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import flights from '../data/flights.js';
import { useTravel } from '../state/TravelContext.jsx';

export default function DecisionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedFlight, setSelectedFlight, setChoice, managedFee, logEvent } = useTravel();

  useEffect(() => {
    if (!selectedFlight || selectedFlight.id !== id) {
      const match = flights.find((f) => f.id === id);
      if (match) setSelectedFlight(match);
    }
    window.scrollTo(0, 0);
  }, [id, selectedFlight, setSelectedFlight]);

  if (!selectedFlight) {
    return (
      <section className="page">
        <p>Flight not found. Return to results.</p>
        <button className="primary-btn outline" onClick={() => navigate('/results')}>
          Back to results
        </button>
      </section>
    );
  }

  const managedPrice = selectedFlight.price + managedFee;

  const handleManaged = () => {
    setChoice('managed');
    logEvent('managed_selected', { id });
    navigate('/payment');
  };

  const handleCheapest = () => {
    setChoice('cheapest');
    logEvent('cheapest_selected', { id });
    navigate('/handoff');
  };

  return (
    <section className="page">
      <div className="sticky-card">
        <p className="eyebrow">Your selection</p>
        <h3>
          {selectedFlight.from} → {selectedFlight.to}
        </h3>
        <p className="sub">{selectedFlight.date} · {selectedFlight.airlines.join(' • ')}</p>
        <p className="route">
          {selectedFlight.departTime} → {selectedFlight.arriveTime} ({selectedFlight.duration})
        </p>
      </div>

      <h2>Choose how you want to travel</h2>

      <div className="card option managed">
        <div className="tag">Recommended</div>
        <div className="option-head">
          <div>
            <p className="eyebrow">Option A</p>
            <h3>Managed journey</h3>
          </div>
          <div className="price-large">AED {managedPrice.toLocaleString()}</div>
        </div>
        <ul className="bullets">
          <li>We monitor your trip automatically</li>
          <li>If arrival is delayed ≥ 90 min, we step in</li>
          <li>Fixed outcome. No forms.</li>
        </ul>
        <button className="primary-btn" onClick={handleManaged}>
          Choose managed
        </button>
      </div>

      <div className="card option flat">
        <div className="option-head">
          <div>
            <p className="eyebrow">Option B</p>
            <h3>Cheapest journey</h3>
          </div>
          <div className="price-large">AED {selectedFlight.price.toLocaleString()}</div>
        </div>
        <ul className="bullets">
          <li>Same flight</li>
          <li>You handle disruptions yourself</li>
        </ul>
        <button className="primary-btn outline" onClick={handleCheapest}>
          Choose cheapest
        </button>
      </div>
    </section>
  );
}
