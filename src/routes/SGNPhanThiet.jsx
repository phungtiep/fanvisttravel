import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function RoutePhanThiet() {
  const { t } = useTranslation();

  // Inject JSON-LD Schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Trip",
      "name": "Xe riêng Sài Gòn → Phan Thiết / Mũi Né",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Fanvist Travel",
        "telephone": "+84844232144",
        "url": "https://thuexephanthiet.info.vn"
      },
      "distance": "180 km",
      "estimatedTime": "3 – 3.5 giờ",
      "offers": [
        { "@type": "Offer", "name": "Xe 4 chỗ", "price": "1200000", "priceCurrency": "VND" },
        { "@type": "Offer", "name": "Xe 7 chỗ", "price": "1400000", "priceCurrency": "VND" },
        { "@type": "Offer", "name": "Xe 16 chỗ", "price": "1800000", "priceCurrency": "VND" }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => document.head.removeChild(script);
  }, []);

  return (
    <main className="route-page">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">{t("routes.home")}</a> › {t("routes.pt.title")}
      </div>

      {/* HERO SECTION */}
      <section className="route-hero">
        <div className="hero-left">
          <h1>{t("routes.pt.h1")}</h1>
          <p className="subtitle">{t("routes.pt.subtitle")}</p>
          <a className="btn-primary" href="/#dat-xe">
            {t("routes.pt.cta")}
          </a>
        </div>

        <div className="hero-right">
          <img src="/images/routes/phanthiet-hero.png" alt="Xe riêng đi Phan Thiết" />
        </div>
      </section>

      {/* Benefits section */}
      <section className="route-section">
        <h2>{t("routes.pt.whyTitle")}</h2>
        <ul className="icon-list">
          {t("routes.pt.why", { returnObjects: true }).map((item, i) => (
            <li key={i}>
              <img src="/images/icons/check.png" alt="✔" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Price table */}
      <section className="route-section">
        <h2>{t("routes.pt.priceTitle")}</h2>

        <table className="price-table">
          <thead>
            <tr>
              <th>{t("routes.pt.table.car")}</th>
              <th>{t("routes.pt.table.pt")}</th>
              <th>{t("routes.pt.table.mn")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("routes.pt.table.c4")}</td>
              <td>1.200.000đ</td>
              <td>1.300.000đ</td>
            </tr>
            <tr>
              <td>{t("routes.pt.table.c7")}</td>
              <td>1.400.000đ</td>
              <td>1.500.000đ</td>
            </tr>
            <tr>
              <td>{t("routes.pt.table.c16")}</td>
              <td>1.800.000đ</td>
              <td>1.900.000đ</td>
            </tr>
          </tbody>
        </table>

        <p className="note">{t("routes.pt.priceNote")}</p>
      </section>

      {/* Lộ trình */}
      <section className="route-section">
        <h2>{t("routes.pt.routeTitle")}</h2>
        <ol className="step-list">
          {t("routes.pt.route", { returnObjects: true }).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="route-section faq">
        <h2>{t("routes.pt.faqTitle")}</h2>

        {t("routes.pt.faq", { returnObjects: true }).map((q, i) => (
          <details key={i}>
            <summary>{q.q}</summary>
            <p>{q.a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
