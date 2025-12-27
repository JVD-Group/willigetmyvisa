import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function SearchPage() {
  const { search, setSearch, setResults, setSelectedFlight, setChoice, logEvent } = useTravel();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults((prev) => [...prev]);
    setSelectedFlight(null);
    setChoice(null);
    logEvent('search_submitted', search);
    navigate('/results');
  };

  return (
    <section className="page">
      <h2>Plan your route</h2>
      <p className="sub">Search normally — we keep this simple and familiar.</p>
      <form className="card form" onSubmit={handleSubmit}>
        <label className="field">
          <span>From</span>
          <input
            type="text"
            value={search.from}
            onChange={(e) => handleChange('from', e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>To</span>
          <input type="text" value={search.to} onChange={(e) => handleChange('to', e.target.value)} required />
        </label>
        <label className="field">
          <span>Date</span>
          <input
            type="date"
            value={search.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Passengers</span>
          <input
            type="number"
            min="1"
            value={search.passengers}
            onChange={(e) => handleChange('passengers', Number(e.target.value))}
          />
        </label>
        <button className="primary-btn" type="submit">
          Show flights
        </button>
      </form>
    </section>
  );
}
