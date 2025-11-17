import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="lien-he">
      <div className="container">
        <h2>{t('contactSection.title')}</h2>
        <div className="card">
          <div className="contact-box">
            <div className="contact-pill">
              <span>📞 {t('contactSection.phoneLabel')}</span>
              <a href="tel:0844232144">
                <strong>0844 232 144</strong>
              </a>
            </div>
            <a
              className="social-btn btn-messenger"
              href="https://m.me/yourpageid"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {t('contactSection.messenger')}
            </a>
            <a
              className="social-btn btn-zalo"
              href="https://zalo.me/0844232144"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {t('contactSection.zalo')}
            </a>
          </div>
          <p className="note-small" style={{ marginTop: '8px' }}>
            {t('contactSection.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
