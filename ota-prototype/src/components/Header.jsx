import { Link, useLocation } from 'react-router-dom';

export default function Header({ compact = false }) {
  const { pathname } = useLocation();
  const showBack = pathname !== '/';

  return (
    <header className={`top-bar ${compact ? 'top-bar--compact' : ''}`}>
      <div className="logo-mark">Travelflow</div>
      {showBack && (
        <Link className="back-link" to={-1}>
          ← Back
        </Link>
      )}
    </header>
  );
}
