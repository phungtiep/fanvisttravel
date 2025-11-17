import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true });

  return (
    <section id="faq">
      <div className="container">
        <h2>{t('faq.title')}</h2>
        <div className="card">
          {Array.isArray(items) &&
            items.map((item) => (
              <div className="faq-item" key={item.q}>
                <div className="faq-q">{item.q}</div>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
