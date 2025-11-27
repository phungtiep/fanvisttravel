import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RouteDetail.css";

export default function RouteDetail() {
  const { code } = useParams();
  const [route, setRoute] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===================== Load API =====================
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1. Lấy danh sách tuyến
        const routeRes = await fetch(`/api/routes`);
        const routeJson = await routeRes.json();

        const found = routeJson.routes.find((r) => r.code === code);
        setRoute(found || null);

        // 2. Lấy danh sách xe
        const carRes = await fetch(`/api/cars`);
        const carJson = await carRes.json();
        setCars(carJson.cars || []);
      } catch (err) {
        console.error("Load route detail failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [code]);

  if (loading)
    return <div className="route-loading">Đang tải dữ liệu…</div>;

  if (!route)
    return (
      <div className="route-notfound">
        Không tìm thấy tuyến đường.
        <Link to="/" className="route-back">← Quay về trang chủ</Link>
      </div>
    );

  // Map các giá theo key đúng trong bảng routes
  const PRICE_MAP = {
    4: route.price_4,
    7: route.price_7,
    9: route.price_9,
    11: route.price_11,
    16: route.price_16,
    19: route.price_19,
    24: route.price_24,
    29: route.price_29,
    45: route.price_45,
    carnival: route.price_carnival,
    sedona: route.price_sedona,
  };

  return (
    <div className="route-detail-container">

      {/* Title */}
      <h1 className="route-title">{route.name}</h1>
      <p className="route-subtitle">Bảng giá & các loại xe áp dụng</p>

      {/* GRID CAR LIST */}
      <div className="car-grid">
        {cars.map((car) => {
          const price =
            PRICE_MAP[car.seat_count] ??
            PRICE_MAP[car.code] ??
            null;

          if (!price) return null; // xe không hỗ trợ tuyến này → bỏ qua

          return (
            <div className="car-card" key={car.id}>
              <img
                src={car.image_url}
                alt={car.name_vi}
                className="car-img"
              />

              <div className="car-info">
                <h3 className="car-name">
                  {car.name_vi} ({car.seat_count} chỗ)
                </h3>

                <div className="car-price">
                  {price.toLocaleString("vi-VN")} đ
                </div>

                <Link to="/dat-xe" className="car-book-btn">
                  Đặt xe ngay
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back */}
      <div className="route-bottom">
        <Link to="/" className="route-back-btn">
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
