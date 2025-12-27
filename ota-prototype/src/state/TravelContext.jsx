import { createContext, useContext, useMemo, useState } from 'react';
import flights from '../data/flights.js';

const TravelContext = createContext();

const feeByComplexity = {
  low: 60,
  medium: 90,
  high: 120,
};

export function TravelProvider({ children }) {
  const [search, setSearch] = useState({
    from: 'DXB',
    to: 'LHR',
    date: flights[0]?.date ?? new Date().toISOString().slice(0, 10),
    passengers: 1,
  });
  const [results, setResults] = useState(flights);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [choice, setChoice] = useState(null); // 'managed' | 'cheapest'
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState(0);

  const logEvent = (name, payload = {}) => {
    console.log(`[analytics] ${name}`, payload);
  };

  const managedFee = selectedFlight ? feeByComplexity[selectedFlight.complexityLevel] : 0;

  const value = useMemo(
    () => ({
      search,
      setSearch,
      results,
      setResults,
      selectedFlight,
      setSelectedFlight,
      choice,
      setChoice,
      paymentComplete,
      setPaymentComplete,
      delayMinutes,
      setDelayMinutes,
      managedFee,
      logEvent,
    }),
    [search, results, selectedFlight, choice, paymentComplete, delayMinutes, managedFee],
  );

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

export function useTravel() {
  const ctx = useContext(TravelContext);
  if (!ctx) throw new Error('useTravel must be used within TravelProvider');
  return ctx;
}
