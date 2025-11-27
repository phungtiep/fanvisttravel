import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [routesLoading, setRoutesLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  /* =====================================
        FETCH ROUTES
  ====================================== */
  useEffect(() => {
    async function loadRoutes() {
      try {
        setRoutesLoading(true);
        const res = await fetch("/api/routes");
        const json = await res.json();

        if (Array.isArray(json.routes)) {
          setRoutes(json.routes);
        } else setRoutes([]);
      } catch (err) {
        console.error(err);
        setRoutes([]);
      } finally {
        setRoutesLoading(false);
      }
    }

    loadRoutes();
  }, []);

  /* =====================================
        GROUP ROUTES BY REGION
  ====================================== */
  function groupRoutes(list) {
    const groups = {};

    const map = {
      sg: "Từ Sài Gòn",
      dl: "Từ Đà Lạt",
      mn: "Từ Mũi Né",
      pt: "Từ Phan Thiết",
      vt: "Từ Vũng Tàu",
      nt: "Từ Nha Trang",
    };

    list.forEach((r) => {
      const prefix = r.code.split("-")[0];
      const region = map[prefix] ?? "Khác";

      if (!groups[region]) groups[region] = [];
      groups[region].push(r);
    });

    return groups;
  }

  const grouped = groupRoutes(routes);

  /* =====================================
       👉 ĐẨY "Từ Sài Gòn" LÊN ĐẦU
  ====================================== */
  const groupedOrdered = (() => {
    const sg = "Từ Sài Gòn";
    const out = {};

    if (grouped[sg]) out[sg] = grouped[sg];

    Object.keys(grouped).forEach((key) => {
      if (key !== sg) out[key] = grouped[key];
    });

    return out;
  })();

  /* =====================================
        CLICK OUTSIDE TO CLOSE
  ====================================== */
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowRoutes(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* =====================================
        MOBILE MENU
  ====================================== */
  const openMenu = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => (open ? closeMenu() : openMenu());

  const goToSection = (id) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={closeMenu} />

      <header className="site-header">
        <div className="header-desktop">
          <div className="hd-left">
            <a href="/">
              <img src="/logo.webp" className="site-logo" alt="Fanvist Travel" />
            </a>
          </div>

          {/* ================= MENU ================ */}
          <nav className="hd-menu">
            <Link to="/dat-xe">{t("nav.booking")}</Link>

            {/* DROPDOWN */}
            <div
              className="nav-dropdown"
              ref={dropdownRef}
              onMouseEnter={() => setShowRoutes(true)}
            >
              <button className="nav-btn" onClick={() => setShowRoutes(!showRoutes)}>
                {t("nav.pricing")} ▾
              </button>

              {showRoutes && (
                <div className="dropdown-box">
                  <h3 className="dropdown-title">Danh sách tuyến đường</h3>
                  <p className="dropdown-subtitle">
                    Chọn tuyến để xem chi tiết giá & loại xe
                  </p>

                  <div className="dropdown-divider" />

                  {/* Loading */}
                  {routesLoading && (
                    <div className="dropdown-empty">Đang tải dữ liệu…</div>
                  )}

                  {/* Empty */}
                  {!routesLoading && routes.length === 0 && (
                    <div className="dropdown-empty">Chưa có dữ liệu tuyến</div>
                  )}

                  {/* GROUPED ROUTES — ĐÃ ĐẨY SG LÊN ĐẦU */}
                  {!routesLoading &&
                    Object.keys(groupedOrdered).map((region) => (
                      <div key={region} className="route-group">
                        <div className="route-group-title">{region}</div>

                        <div className="dropdown-grid">
                          {groupedOrdered[region].map((r) => (
                            <Link
                              key={r.id}
                              to={`/tuyen-duong/${r.code}`}
                              className="dropdown-item"
                              onClick={() => setShowRoutes(false)}
                            >
                              🚗{" "}
                              <span className="rt-main">
                                {r.name.split("→")[0]?.trim()} →
                              </span>
                              <span className="rt-sub">
                                {r.name.split("→")[1]?.trim()}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <Link to="/faq">{t("nav.faq")}</Link>
            <Link to="/lien-he">{t("nav.contact")}</Link>
          </nav>

          {/* LANGUAGE */}
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

          {/* HOTLINE */}
          <div className="hd-right">
            <a href="tel:0844232144" className="hotline-btn">
              📞 0844 232 144
            </a>
          </div>
        </div>

        {/* MOBILE HEADER */}
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

      {/* MOBILE NAV */}
      <div className={`mobile-nav ${open ? "show" : ""}`}>
        <button onClick={() => goToSection("dat-xe")}>{t("nav.booking")}</button>
        <button onClick={() => goToSection("bang-gia")}>{t("nav.pricing")}</button>
        <button onClick={() => goToSection("tuyen-duong")}>{t("nav.routes")}</button>
        <button onClick={() => goToSection("faq")}>{t("nav.faq")}</button>
        <button onClick={() => goToSection("lien-he")}>{t("nav.contact")}</button>
      </div>
    </>
  );
}
