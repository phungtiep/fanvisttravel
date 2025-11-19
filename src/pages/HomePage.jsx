// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';


import Hero from "../components/sections/Hero.jsx";
import Benefits from "../components/sections/Benefits.jsx";
import Pricing from "../components/sections/Pricing.jsx";
import RoutesSection from "../components/sections/RoutesSection.jsx";
import BookingForm from "../components/sections/BookingForm.jsx";
import ContactSection from "../components/sections/ContactSection.jsx";
import FAQ from "../components/sections/FAQ.jsx";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('seo.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo.description'));
    }
  }, [t, i18n.language]);

  return (
    <>
      <div className="hero-section">
        <div className="hero-left">
          <BookingForm />
        </div>

        <div className="hero-right">
          <Hero />
        </div>
      </div>
      <Benefits />
      <Pricing />
      <RoutesSection />
      <ContactSection />
      <FAQ />
      
    </>
  );
}
