import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RouteDetail.css";

export default function RouteDetail() {
  const { code } = useParams();

  const [route, setRoute] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================================
      FETCH ROUTE + CARS DATA
  ============================================ */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1️⃣ Fetch route chi tiết
        const resRoute = await fetch(`/api/routes?code=${code}`);
        const jsonRoute = await resRoute.json();

        if (!jsonRoute?.routes?.length) return setRoute(null);
        const r = jsonRoute.routes[0];

        // 2️⃣ Fetch cars
        const resCars = await fetch("/api/cars");
        const jsonCars = await resCars.json();

        setRoute(r);
        setCars(jsonCars.cars || []);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [code]);

  if (loading) return <div className="rd-loading">Đang tải dữ liệu…</div>;
  if (!route) return <div className="rd-notfound">Không tìm thấy tuyến đường</div>;

  /* ============================================
      PRICE MAPPING – CHUẨN XÁC 100%
  ============================================ */
  const PRICE_FROM_CODE = {
    "4-ch": route.price_4,
    "7-ch": route.price_7,
    "carnival": route.price_carnival,
    "sedona": route.price_sedona,
    "limo-9": route.price_9,
    "limo-11": route.price_11,
    "16-ch": route.price_16,
    "limo-19": route.price_19,
    "limo-24": route.price_24,
    "29-ch": route.price_29,
    "45-ch": route.price_45,
  };

  /* ============================================
      FORMAT GIÁ
  ============================================ */
  const formatPrice = (v) =>
    v ? v.toLocaleString("vi-VN") + " đ" : "Liên hệ";

  /* ============================================
      UI RENDER – DANH SÁCH XE
  ============================================ */
  return (
    <div className="rd-container">
      {/* TITLE */}
      <h1 className="rd-title">{route.name}</h1>
      <p className="rd-subtitle">Bảng giá & các loại xe áp dụng</p>

      {/* CARS GRID */}
      <div className="rd-grid">
        {cars.map((car) => {
          const price = PRICE_FROM_CODE[car.code];

          return (
            <div className="rd-card" key={car.id}>
              {/* IMAGE */}
              <div className="rd-img-box">
                <img
                  src={car.image_url || "/car-placeholder.webp"}
                  alt={car.name_vi}
                  className="rd-img"
                />
              </div>

              {/* NAME */}
              <div className="rd-car-name">{car.name_vi}</div>

              {/* PRICE */}
              <div className="rd-price">{formatPrice(price)}</div>

              {/* ACTION */}
              <Link to="/dat-xe" state={{ route: route.code, car: car.code }}>
                <button className="rd-btn">Đặt xe ngay</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
