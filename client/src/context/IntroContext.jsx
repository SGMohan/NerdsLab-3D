import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const IntroContext = createContext({
  introRevealed: true,
  triggerReveal: () => {},
});

export const IntroProvider = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // If already at another route, intro is revealed immediately.
  // On home page, start false so globe is showcased first.
  const [introRevealed, setIntroRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !isHome;
  });

  const triggerReveal = useCallback(() => {
    setIntroRevealed(true);
  }, []);

  // When navigating away from home, ensure navbar and elements are revealed
  useEffect(() => {
    if (location.pathname !== '/') {
      setIntroRevealed(true);
    }
  }, [location.pathname]);

  return (
    <IntroContext.Provider value={{ introRevealed, triggerReveal }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);
