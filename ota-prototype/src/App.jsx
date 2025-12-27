import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import DecisionPage from './pages/DecisionPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import HandoffPage from './pages/HandoffPage.jsx';
import ConfirmPage from './pages/ConfirmPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import PayoutPage from './pages/PayoutPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const location = useLocation();
  const isAuthFlow = ['/handoff', '/payment', '/confirm', '/tracking', '/payout'].some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <div className="app-shell">
      <Header compact={isAuthFlow} />
      <main className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/decision/:id" element={<DecisionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/handoff" element={<HandoffPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/payout" element={<PayoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
