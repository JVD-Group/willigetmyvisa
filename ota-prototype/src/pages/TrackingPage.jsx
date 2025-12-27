import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function TrackingPage() {
  const { selectedFlight, delayMinutes, setDelayMinutes, logEvent, choice } = useTravel();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedFlight) navigate('/results');
  }, [selectedFlight, navigate]);

  useEffect(() => {
    if (choice === 'managed' && delayMinutes >= 90) {
      logEvent('delay_triggered', { minutes: delayMinutes });
      navigate('/payout');
    }
  }, [delayMinutes, choice, logEvent, navigate]);

  if (!selectedFlight) return null;

  const status = delayMinutes >= 15 ? 'Delayed' : 'On time';

  return (
    <section className="page">
      <h2>We’re tracking your journey</h2>
      <div className="card">
        <p className="eyebrow">Flight</p>
        <h3>
          {selectedFlight.from} → {selectedFlight.to}
        </h3>
        <p className="sub">{selectedFlight.airlines.join(' • ')}</p>
        <p className="route">
          {selectedFlight.departTime} → {selectedFlight.arriveTime} ({selectedFlight.duration})
        </p>
        <div className={`status ${status === 'Delayed' ? 'warn' : ''}`}>{status}</div>
        <p className="banner">We step in automatically if delay ≥ 90 minutes.</p>
        <label className="field">
          <span>Simulate arrival delay</span>
          <input
            type="range"
            min="0"
            max="240"
            value={delayMinutes}
            onChange={(e) => setDelayMinutes(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>0 min</span>
            <strong>{delayMinutes} min</strong>
            <span>240 min</span>
          </div>
        </label>
      </div>
    </section>
  );
}
