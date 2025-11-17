import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>
          © <span>{year}</span> {t('footer.text1')}
        </p>
        <p>{t('footer.text2')}</p>
      </div>
    </footer>
  );
}
