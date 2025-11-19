import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Benefits() {
  const { t } = useTranslation();
  const items = t('benefits.items', { returnObjects: true });
  const tags = t('benefits.tags', { returnObjects: true });

  return (
    <section id="uu-diem">
      <div className="container grid-2">
        <div>
          <h2>{t('benefits.title')}</h2>
          <div className="card">
            <h3>{t('benefits.cardTitle')}</h3>
            <ul>
              {Array.isArray(items) &&
                items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
            <div className="tag-list">
              {Array.isArray(tags) &&
                tags.map((tg) => (
                  <span className="tag" key={tg}>
                    {tg}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
