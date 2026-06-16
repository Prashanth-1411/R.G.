import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationContextType {
  isNavigating: boolean;
  navigateWithAnimation: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useAnimatedNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useAnimatedNavigation must be used within NavigationProvider');
  return ctx;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateWithAnimation = useCallback((to: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      navigate(to);
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    }, 600);
  }, [navigate, isNavigating]);

  return (
    <NavigationContext.Provider value={{ isNavigating, navigateWithAnimation }}>
      {children}
    </NavigationContext.Provider>
  );
};
