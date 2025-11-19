import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t } = useTranslation();
  const rows = t('pricing.rows', { returnObjects: true });

  return (
    <section id="bang-gia">
      <div className="container">
        <h2>{t('pricing.title')}</h2>
        <div className="card">
          <table aria-label="Bảng giá xe riêng (tham khảo)">
            <thead>
              <tr>
                <th>{t('pricing.cols.route')}</th>
                <th>{t('pricing.cols.car4')}</th>
                <th>{t('pricing.cols.car7')}</th>
                <th>{t('pricing.cols.car16')}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rows) &&
                rows.map((r) => (
                  <tr key={r}>
                    <td>{r}</td>
                    <td>{t('pricing.contact')}</td>
                    <td>{t('pricing.contact')}</td>
                    <td>{t('pricing.contact')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="table-note">{t('pricing.note')}</p>
        </div>
      </div>
    </section>
  );
}
