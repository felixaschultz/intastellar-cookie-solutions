// src/components/IntastellarConsent.tsx
"use client"; // Required for Next.js app router

import { useIntastellarConsent } from "../hooks/useIntastellarConsent";

export default function IntastellarConsent() {
  const isReady = useIntastellarConsent({
    policy_link: "/privacy",
    settings: {
      language: "en",
      company: "Example Corp",
      rootDomain: "example.com"
    }
  });

  return null; // Banner handles itself
}
