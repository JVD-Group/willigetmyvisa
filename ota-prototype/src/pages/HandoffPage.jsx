import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function HandoffPage() {
  const navigate = useNavigate();
  const { logEvent } = useTravel();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/confirm'), 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    logEvent('redirect_clicked');
    navigate('/confirm');
  };

  return (
    <section className="page">
      <h2>Opening booking partner…</h2>
      <div className="card center">
        <div className="avatar large" aria-hidden>
          OTA
        </div>
        <p className="sub">You’ll book directly on the airline or OTA website.</p>
        <button className="primary-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </section>
  );
}
