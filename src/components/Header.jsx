import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      // Nếu đang ở trang khác → quay về Home trước
      navigate("/");

      // Đợi Home render rồi mới scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      // Đang ở Home → scroll luôn
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
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
            <a href="/">
              <img src="/logo.webp" className="site-logo" alt="Fanvist Travel" />
            </a>
          </div>

          <nav className="hd-menu">
            <Link to="/dat-xe">{t("nav.booking")}</Link>
            <Link to="/bang-gia">{t("nav.pricing")}</Link>
            <Link to="/tuyen-duong">{t("nav.routes")}</Link>
            <Link to="/faq">{t("nav.faq")}</Link>
            <Link to="/lien-he">{t("nav.contact")}</Link>
          </nav>

          {/* <nav className="hd-menu">
            <ul>
              <li>
                <button onClick={() => goToSection("dat-xe")}>
                  {t("nav.booking")}
                </button>
              </li>

              <li>
                <button onClick={() => goToSection("bang-gia")}>
                  {t("nav.pricing")}
                </button>
              </li>

              <li>
                <button onClick={() => goToSection("tuyen-duong")}>
                  {t("nav.routes")}
                </button>
              </li>

              <li>
                <button onClick={() => goToSection("faq")}>
                  {t("nav.faq")}
                </button>
              </li>

              <li>
                <button onClick={() => goToSection("lien-he")}>
                  {t("nav.contact")}
                </button>
              </li>
            </ul>
          </nav> */}


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

          <a href="/">
            <img src="/logo.webp" className="site-logo mobile-logo" alt="Thue xe di phan thiet" />
          </a>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM SHEET MENU =====
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
      </div> */}
      {/* ===== MOBILE BOTTOM SHEET MENU ===== */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <button onClick={() => goToSection("dat-xe")}>
          {t("nav.booking")}
        </button>

        <button onClick={() => goToSection("bang-gia")}>
          {t("nav.pricing")}
        </button>

        <button onClick={() => goToSection("tuyen-duong")}>
          {t("nav.routes")}
        </button>

        <button onClick={() => goToSection("faq")}>
          {t("nav.faq")}
        </button>

        <button onClick={() => goToSection("lien-he")}>
          {t("nav.contact")}
        </button>
      </div>



    </>
  );
}
