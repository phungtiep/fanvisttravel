import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RouteDetail.css";

// Fallback nếu API lỗi
const FALLBACK_ROUTES = [
  // ví dụ – điền đủ các tuyến bạn muốn fallback
  // { code: "sg-dl", name: "Sài Gòn → Đà Lạt", price_4: 1200000, ... },
];

const CAR_PRICE_FIELD_MAP = {
  "4-ch": "price_4",
  "7-ch": "price_7",
  "limo-9": "price_9",
  "limo-11": "price_11",
  "16-ch": "price_16",
  "limo-19": "price_19",
  "limo-24": "price_24",
  "29-ch": "price_29",
  "45-ch": "price_45",
  carnival: "price_carnival",
  sedona: "price_sedona",
};

export default function RouteDetail() {
  const { code: routeCode } = useParams(); // /tuyen-duong/:code
  const navigate = useNavigate();

  const [route, setRoute] = useState(null);
  const [cars, setCars] = useState([]);
  const [loadingRoute, setLoadingRoute] = useState(true);
  const [loadingCars, setLoadingCars] = useState(true);
  const [error, setError] = useState("");

  // ====== LOAD ROUTE ======
  useEffect(() => {
    async function loadRoute() {
      try {
        setLoadingRoute(true);
        setError("");

        // Gọi API detail: /api/routes?code=sg-mn
        const res = await fetch(`/api/routes?code=${encodeURIComponent(routeCode)}`);
        const json = await res.json();

        if (res.ok && json.route) {
          setRoute(json.route);
        } else {
          console.warn("API không trả về route, dùng fallback", json);
          const fallback =
            FALLBACK_ROUTES.find((r) => r.code === routeCode) ||
            FALLBACK_ROUTES[0] ||
            null;
          if (!fallback) {
            setError("Không tìm thấy tuyến này.");
          }
          setRoute(fallback);
        }
      } catch (err) {
        console.error("Lỗi load route:", err);
        const fallback =
          FALLBACK_ROUTES.find((r) => r.code === routeCode) ||
          FALLBACK_ROUTES[0] ||
          null;
        if (!fallback) {
          setError("Không tìm thấy tuyến này.");
        }
        setRoute(fallback);
      } finally {
        setLoadingRoute(false);
      }
    }

    loadRoute();
  }, [routeCode]);

  // ====== LOAD CARS ======
  useEffect(() => {
    async function loadCars() {
      try {
        setLoadingCars(true);
        const res = await fetch("/api/cars");
        const json = await res.json();

        if (res.ok && Array.isArray(json.cars)) {
          setCars(json.cars.filter((c) => c.active));
        } else {
          console.error("API /api/cars lỗi", json);
          setCars([]);
        }
      } catch (err) {
        console.error("Lỗi load cars:", err);
        setCars([]);
      } finally {
        setLoadingCars(false);
      }
    }

    loadCars();
  }, []);

  if (loadingRoute) {
    return (
      <div className="route-detail-page">
        <div className="rd-loading">Đang tải thông tin tuyến đường…</div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="route-detail-page">
        <div className="rd-error">
          {error || "Không tìm thấy tuyến đường này."}
        </div>
        <button className="rd-back-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>
    );
  }

  // Chuẩn bị card xe + giá
  const carCards = cars
    .map((car) => {
      const field = CAR_PRICE_FIELD_MAP[car.code];
      const price = field ? route[field] : null;
      if (!price) return null; // tuyến này không áp dụng loại xe đó

      return {
        ...car,
        price,
      };
    })
    .filter(Boolean);

  return (
    <div className="route-detail-page">
      {/* HEADER TITLE */}
      <section className="rd-hero">
        <div className="rd-breadcrumb">
          <button onClick={() => navigate(-1)}>← Quay lại</button>
        </div>
        <h1 className="rd-title">{route.name}</h1>
        <p className="rd-subtitle">Bảng giá & các loại xe áp dụng</p>
      </section>

      {/* CAR CARDS */}
      <section className="rd-cars-section">
        {loadingCars && <div className="rd-loading">Đang tải danh sách xe…</div>}

        {!loadingCars && carCards.length === 0 && (
          <div className="rd-empty">
            Tuyến này hiện chưa cấu hình bảng giá chi tiết.
            <br />
            Vui lòng liên hệ hotline để được báo giá chính xác.
          </div>
        )}

        <div className="rd-cards-grid">
          {carCards.map((car) => (
            <article key={car.id} className="rd-card">
              <div className="rd-card-image-wrap">
                {car.image_url ? (
                  <img src={car.image_url} alt={car.name_vi} />
                ) : (
                  <div className="rd-card-image-placeholder">
                    <span role="img" aria-label="car">
                      🚗
                    </span>
                  </div>
                )}
              </div>

              <div className="rd-card-body">
                <h3 className="rd-car-name">{car.name_vi}</h3>
                <p className="rd-car-sub">
                  {car.name_vi} ({car.seat_count} chỗ)
                </p>

                <div className="rd-price">
                  {car.price.toLocaleString("vi-VN")} <span>đ</span>
                </div>

                <button
                  className="rd-book-btn"
                  onClick={() => {
                    // chuyển về form đặt xe + prefilling tuyến nếu bạn muốn
                    navigate("/dat-xe", {
                      state: {
                        routeCode,
                        carCode: car.code,
                      },
                    });
                  }}
                >
                  Đặt xe ngay
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
