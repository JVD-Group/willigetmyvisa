import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../state/TravelContext.jsx';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const { logEvent } = useTravel();
  const [form, setForm] = useState({ airline: '', flightNumber: '', pnr: '', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    logEvent('booking_confirmed', form);
    navigate('/tracking');
  };

  return (
    <section className="page">
      <h2>Link your booking</h2>
      <p className="sub">Add your booking reference so we can monitor the journey.</p>
      <form className="card form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Airline</span>
          <input
            type="text"
            value={form.airline}
            onChange={(e) => setForm({ ...form, airline: e.target.value })}
            required
          />
        </label>
        <label className="field">
          <span>Flight number</span>
          <input
            type="text"
            value={form.flightNumber}
            onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
            required
          />
        </label>
        <label className="field">
          <span>PNR</span>
          <input type="text" value={form.pnr} onChange={(e) => setForm({ ...form, pnr: e.target.value })} required />
        </label>
        <label className="field">
          <span>Date</span>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        </label>
        <button className="primary-btn" type="submit">
          Start tracking
        </button>
      </form>
    </section>
  );
}
