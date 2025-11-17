import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    if (open) closeMenu();
    else openMenu();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      <header className="site-header">
        {/* ===== DESKTOP HEADER ===== */}
        <div className="header-desktop">
          <div className="hd-left">
            <img src="/logo.png" className="site-logo" alt="Fanvist Travel" />
          </div>

          <nav className="hd-menu">
            <a href="#dat-xe">{t("nav.booking")}</a>
            <a href="#bang-gia">{t("nav.pricing")}</a>
            <a href="#tuyen-duong">{t("nav.routes")}</a>
            <a href="#faq">{t("nav.faq")}</a>
            <a href="#lien-he">{t("nav.contact")}</a>
          </nav>

          <div className="lang-switch">
            <button
              className={i18n.language === "vi" ? "active" : ""}
              onClick={() => i18n.changeLanguage("vi")}
            >
              🇻🇳 VI
            </button>

            <button
              className={i18n.language === "en" ? "active" : ""}
              onClick={() => i18n.changeLanguage("en")}
            >
              🇺🇸 EN
            </button>
          </div>

          <div className="hd-right">
            <a href="tel:0844232144" className="hotline-btn">
              📞 0844 232 144
            </a>
          </div>
        </div>

        {/* ===== MOBILE HEADER ===== */}
        <div className="header-mobile">
          <button
            className={`hamburger ${open ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Mở menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a href="tel:0844232144" className="hotline-btn mobile-hotline">
            📞 0844 232 144
          </a>

          <img src="/logo.png" className="site-logo mobile-logo" alt="Fanvist Travel" />
        </div>
      </header>

      {/* ===== MOBILE BOTTOM SHEET MENU ===== */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <a
          href="#dat-xe"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            const el = document.querySelector("#dat-xe");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("nav.booking")}
        </a>

        <a
          href="#bang-gia"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            const el = document.querySelector("#bang-gia");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("nav.pricing")}
        </a>

        <a
          href="#tuyen-duong"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            const el = document.querySelector("#tuyen-duong");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("nav.routes")}
        </a>

        <a
          href="#faq"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            const el = document.querySelector("#faq");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("nav.faq")}
        </a>

        <a
          href="#lien-he"
          onClick={(e) => {
            e.preventDefault();
            closeMenu();
            const el = document.querySelector("#lien-he");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {t("nav.contact")}
        </a>
      </div>
    </>
  );
}
