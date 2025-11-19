import React from 'react';
import { useTranslation } from 'react-i18next';

export default function RoutesSection() {
  const { t } = useTranslation();
  const lines = t('routes.lines', { returnObjects: true });
  const provinces = t('routes.provinces', { returnObjects: true });

  return (
    <section id="tuyen-duong">
      <div className="container grid-2">
        <div>
          <h2>{t('routes.titleMain')}</h2>
          <div className="card">
            <h3>{t('routes.cardTitle')}</h3>
            <ul>
              {Array.isArray(lines) &&
                lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
            <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>
              {t('routes.desc')}
            </p>
          </div>
        </div>

        <div>
          <h2>{t('routes.titleProvince')}</h2>
          <div className="card">
            <p style={{ marginBottom: '6px' }}>
              {t('routes.provinceIntro')}
            </p>
            <div className="province-list">
              {Array.isArray(provinces) &&
                provinces.map((p) => (
                  <span className="province-item" key={p}>
                    {p}
                  </span>
                ))}
            </div>
            <p className="note-small" style={{ marginTop: '6px' }}>
              {t('routes.provinceNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
