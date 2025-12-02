"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ConsentContextState = {
  loaded: boolean;
  instance: typeof window.INTA | null;
};

const ConsentContext = createContext<ConsentContextState>({
  loaded: false,
  instance: null
});

export function IntastellarConsentProvider({ children, config }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

    // Prevent multiple loads
    if (window.__INTASTELLAR_CONSENT_INITIALIZED__) {
      setLoaded(true);
      return;
    }

    // Assign configuration BEFORE script loads
    window.INTA = config;

    const script = document.createElement("script");
    script.src = "https://consents.cdn.intastellarsolutions.com/uc.js"; 
    script.async = true;

    script.onload = () => {
      window.__INTASTELLAR_CONSENT_INITIALIZED__ = true;
      setLoaded(true);
    };

    document.body.appendChild(script);

  }, [config]);

  return (
    <ConsentContext.Provider
      value={{
        loaded,
        instance: loaded ? window.INTA : null
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

// ──────────────────────────────────────────────────────────────
// Helper Hook
// ──────────────────────────────────────────────────────────────

export function useIntastellarConsent() {
  return useContext(ConsentContext);
}
