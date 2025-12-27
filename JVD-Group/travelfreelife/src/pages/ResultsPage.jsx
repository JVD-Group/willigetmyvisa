import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../components/FlightCard.jsx';
import { useTravel } from '../state/TravelContext.jsx';

export default function ResultsPage() {
  const { results, setSelectedFlight, logEvent } = useTravel();
  const navigate = useNavigate();
  const sorted = [...results].sort((a, b) => a.price - b.price);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!sorted.length) {
    return (
      <section className="page">
        <h2>No flights found</h2>
        <p className="sub">Try adjusting your route or date to see more options.</p>
        <div className="card center">
          <button className="primary-btn" onClick={() => navigate('/search')}>
            Update search
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Choose a flight</h2>
      <p className="sub">Sorted by the lowest fare. Tap a flight to review options.</p>
      <div className="stack">
        {sorted.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onView={() => {
              setSelectedFlight(flight);
              logEvent('flight_viewed', { id: flight.id });
            }}
          />
        ))}
      </div>
    </section>
  );
}
