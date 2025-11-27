import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);   // ⭐ dropdown state
  const [routes, setRoutes] = useState([]);              // ⭐ list routes
  const [routesLoading, setRoutesLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ========== LOAD ROUTES ==========
  useEffect(() => {
    async function loadRoutes() {
      try {
        setRoutesLoading(true);

        // Ở môi trường production (cùng domain) dùng đường dẫn tương đối:
        const res = await fetch("/api/routes");
        const json = await res.json();

        if (Array.isArray(json.routes)) {
          setRoutes(json.routes);
        } else {
          console.error("API /api/routes không trả về routes array", json);
          setRoutes([]);
        }
      } catch (err) {
        console.error("Lỗi load routes:", err);
        setRoutes([]);
      } finally {
        setRoutesLoading(false);
      }
    }

    loadRoutes();
  }, []);

  // ========== MENU MOBILE ==========
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

            {/* ⭐ DROPDOWN BẢNG GIÁ + TUYẾN ĐƯỜNG */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setShowRoutes(true)}
              onMouseLeave={() => setShowRoutes(false)}
            >
              <button className="nav-btn">
                Bảng giá & Tuyến đường ▾
              </button>

              {showRoutes && (
                <div className="dropdown-box">
                  <div className="dropdown-title">
                    Danh sách tuyến đường
                  </div>

                  {routesLoading && (
                    <div className="dropdown-empty">Đang tải dữ liệu…</div>
                  )}

                  {!routesLoading && routes.length === 0 && (
                    <div className="dropdown-empty">
                      Đang cập nhật tuyến đường
                    </div>
                  )}

                  {!routesLoading && routes.length > 0 && (
                    <div className="dropdown-grid">
                      {routes.map((r) => (
                        <Link
                          key={r.id}
                          to={`/tuyen-duong/${r.code}`}
                          className="dropdown-item"
                        >
                          <span className="route-icon">🚗</span>
                          <span className="route-text">{r.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/faq">{t("nav.faq")}</Link>
            <Link to="/lien-he">{t("nav.contact")}</Link>
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

          <a href="/">
            <img
              src="/logo.webp"
              className="site-logo mobile-logo"
              alt="Thue xe di phan thiet"
            />
          </a>
        </div>
      </header>

      {/* ===== MOBILE NAV ===== */}
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
