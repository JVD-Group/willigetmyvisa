import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function PayoutPage() {
  const { delayMinutes, choice, logEvent } = useTravel();
  const navigate = useNavigate();

  useEffect(() => {
    if (choice !== 'managed' || delayMinutes < 90) {
      navigate('/tracking');
    } else {
      logEvent('payout_triggered', { minutes: delayMinutes });
    }
  }, [delayMinutes, choice, logEvent, navigate]);

  return (
    <section className="page">
      <h2>Delay confirmed</h2>
      <div className="card">
        <p>Your arrival was delayed. We’ve triggered your fixed outcome.</p>
        <div className="price-large">AED 300</div>
        <button className="primary-btn">Add payout method (mock)</button>
        <p className="muted">No forms. No follow-up. Handled automatically.</p>
      </div>
    </section>
  );
}
