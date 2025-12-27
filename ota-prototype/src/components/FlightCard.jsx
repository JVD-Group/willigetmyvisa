import { Link } from 'react-router-dom';

export default function FlightCard({ flight, onView }) {
  const { id, airlines, departTime, arriveTime, duration, stops, price } = flight;

  return (
    <div className="card flight-card">
      <div className="airline-row">
        <div className="avatar" aria-hidden>
          {airlines[0]?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="eyebrow">{airlines.join(' • ')}</p>
          <p className="route">
            {departTime} → {arriveTime}
          </p>
          <p className="sub">{duration}</p>
          <p className="sub muted">{stops}</p>
        </div>
        <div className="price-tag">AED {price.toLocaleString()}</div>
      </div>
      <Link className="primary-btn outline" to={`/decision/${id}`} onClick={onView}>
        View options
      </Link>
    </div>
  );
}
