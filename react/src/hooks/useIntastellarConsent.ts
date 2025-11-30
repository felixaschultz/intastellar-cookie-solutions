// src/hooks/useIntastellarConsent.ts
import { useEffect, useState } from "react";
import { loadIntastellarConsent } from "../lib/intastellarLoader";

export function useIntastellarConsent(options) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadIntastellarConsent(options);
    
    const interval = setInterval(() => {
      if (window.__INTASTELLAR_CONSENT_LOADED__) {
        clearInterval(interval);
        setLoaded(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return loaded;
}