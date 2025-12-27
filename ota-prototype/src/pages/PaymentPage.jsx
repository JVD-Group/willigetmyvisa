import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function PaymentPage() {
  const { selectedFlight, managedFee, setPaymentComplete, logEvent, choice } = useTravel();
  const navigate = useNavigate();
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  useEffect(() => {
    if (choice !== 'managed') {
      navigate('/decision/' + (selectedFlight?.id ?? ''));
    }
  }, [choice, selectedFlight, navigate]);

  if (!selectedFlight) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentComplete(true);
    logEvent('responsibility_paid', { flightId: selectedFlight.id, fee: managedFee });
    navigate('/handoff');
  };

  return (
    <section className="page">
      <h2>We’ll take responsibility for this journey</h2>
      <p className="sub">
        You’re paying us to take responsibility if your arrival is significantly delayed. You’ll book and pay for the flight
        separately, exactly as usual.
      </p>

      <div className="card">
        <div className="price-row">
          <span>Responsibility fee</span>
          <strong>AED {managedFee.toLocaleString()}</strong>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Card number</span>
            <input
              type="text"
              inputMode="numeric"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              required
            />
          </label>
          <label className="field">
            <span>Expiry</span>
            <input
              type="text"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              required
            />
          </label>
          <label className="field">
            <span>CVV</span>
            <input
              type="password"
              inputMode="numeric"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              required
            />
          </label>
          <button className="primary-btn" type="submit">
            Pay & continue to booking
          </button>
        </form>
      </div>

      <p className="muted center">You’ll be redirected to book your flight on the airline or OTA website.</p>
    </section>
  );
}
