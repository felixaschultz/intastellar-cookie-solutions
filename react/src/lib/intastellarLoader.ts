// src/lib/intastellarLoader.ts

export function loadIntastellarConsent(config) {
  if (typeof window === "undefined") return; // SSR guard

  // Prevent double-loading
  if (window.__INTASTELLAR_CONSENT_LOADED__) return;

  window.INTA = config;

  const script = document.createElement("script");
  script.src = "https://consents.cdn.intastellarsolutions.com/uc.js";
  script.async = true;

  script.onload = () => {
    window.__INTASTELLAR_CONSENT_LOADED__ = true;
  };

  document.body.appendChild(script);
}