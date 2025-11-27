import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [showRouteMenu, setShowRouteMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ===== FETCH ROUTES =====
  useEffect(() => {
    async function loadRoutes() {
      try {
        const res = await fetch("/api/routes");
        const json = await res.json();

        // API trả về { routes: [...] }
        if (Array.isArray(json.routes)) {
          setRoutes(json.routes);
        } else {
          console.error("API /api/routes không trả về routes array", json);
          setRoutes([]);
        }
      } catch (err) {
        console.error("Lỗi load routes:", err);
        setRoutes([]);
      }
    }

    loadRoutes();
  }, []);

  // ===== MOBILE MENU =====
  const openMenu = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    open ? closeMenu() : openMenu();
  };

  const goToSection = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ===== Overlay ===== */}
      <div className={`overlay ${open ? "show" : ""}`} onClick={closeMenu}></div>

      <header className="site-header">
        {/* ▬▬▬▬▬ DESKTOP HEADER ▬▬▬▬▬ */}
        <div className="header-desktop">
          <div className="hd-left">
            <a href="/">
              <img src="/logo.webp" className="site-logo" alt="Fanvist Travel" />
            </a>
          </div>

          <nav className="hd-menu">
            <Link to="/dat-xe">{t("nav.booking")}</Link>

            {/* ⭐ DROPDOWN GỘP BẢNG GIÁ + TUYẾN ĐƯỜNG */}
            <div
              className="menu-dropdown"
              onMouseEnter={() => setShowRouteMenu(true)}
              onMouseLeave={() => setShowRouteMenu(false)}
            >
              <button className="menu-btn">
                {t("nav.pricing")} <span className="arrow">▼</span>
              </button>

              {showRouteMenu && (
                <div className="dropdown-panel">
                  {routes.map((r) => (
                    <Link
                      key={r.code}
                      to={`/tuyen-duong/${r.code}`}
                      className="dropdown-item"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/faq">{t("nav.faq")}</Link>
            <Link to="/lien-he">{t("nav.contact")}</Link>
          </nav>

          {/* LANG SWITCH */}
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

        {/* ▬▬▬▬▬ MOBILE HEADER ▬▬▬▬▬ */}
        <div className="header-mobile">
          <button
            className={`hamburger ${open ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>

          <a href="tel:0844232144" className="hotline-btn mobile-hotline">
            📞 0844 232 144
          </a>

          <a href="/">
            <img src="/logo.webp" className="site-logo mobile-logo" alt="Fanvist Travel" />
          </a>
        </div>
      </header>

      {/* ▬▬▬▬▬ MOBILE MENU ▬▬▬▬▬ */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <button onClick={() => goToSection("dat-xe")}>
          {t("nav.booking")}
        </button>

        <button
          onClick={() => setShowRouteMenu((prev) => !prev)}
        >
          {t("nav.pricing_routes")}
        </button>

        {showRouteMenu && (
          <div className="mobile-routes">
            {routes.map((r) => (
              <button
                key={r.code}
                onClick={() => {
                  closeMenu();
                  navigate(`/tuyen-duong/${r.code}`);
                }}
              >
                {r.name}
              </button>
            ))}
          </div>
        )}

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
