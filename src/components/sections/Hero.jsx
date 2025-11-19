import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const badges = t('hero.badges', { returnObjects: true });

  return (
    <section className="hero">
      <h1 className='hero-title'>
        {t('hero.titlePrefix')} <span>{t('hero.titleHighlight')}</span>
      </h1>
      <div className="container hero-inner">
        <div>

          <p className="subtitle">
            {t('hero.subtitle', { count: 34 })}
          </p>
          <div className="hero-badges">
            {Array.isArray(badges) &&
              badges.map((b) => (
                <div className="badge" key={b}>
                  {b}
                </div>
              ))}
          </div>
          <div className="hero-cta">
            <a href="#dat-xe" className="btn-primary">
              🚗 {t('hero.ctaBook')}
            </a>
          </div>
          <p className="hero-note">
            {t('hero.note')}
          </p>
        </div>

        <aside className="hero-card" aria-label="Thông tin nhanh">
          <h2>{t('routes.titleMain')}</h2>
          <ul>
            <li>{t('routes.lines.0')}</li>
            <li>{t('routes.lines.1')}</li>
            <li>{t('routes.lines.2')}</li>
            <li>{t('routes.lines.3')}</li>
          </ul>
          <p>
            <strong>Loại xe / Car type:</strong> 4, 7, 16 chỗ / seats
          </p>
          <div className="list-inline">
            <span>✅ Đặt cọc nhẹ</span>
            <span>✅ Hỗ trợ đổi giờ</span>
            <span>✅ Hóa đơn khi cần</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
