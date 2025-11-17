import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Benefits from './components/Benefits.jsx';
import Pricing from './components/Pricing.jsx';
import RoutesSection from './components/RoutesSection.jsx';
import BookingForm from './components/BookingForm.jsx';
import ContactSection from './components/ContactSection.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

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
      <Header />
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
      <Footer />
      <div className={`floating-buttons`}>

        <a
          href="tel:0844232144"
          target="_blank"
          className="float-btn"
        >
          <img src="/phone.webp" alt="Gọi điện" loading="lazy" />
        </a>

        <a
          href="https://m.me/thuexesaigonphanthietmuine"
          target="_blank"
          className="float-btn"
        >
          <img src="/messenger.webp" alt="Chat Messenger" loading="lazy" />
        </a>

        <a
          href="https://zalo.me/0844232144"
          target="_blank"
          className="float-btn"
        >
          <img src="/zalo.webp" alt="Chat Zalo" loading="lazy" />
        </a>
      </div>
    </>
  );
}
