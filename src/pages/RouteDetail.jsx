import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/sections/BookingForm";

export default function RouteDetail() {
  const { slug } = useParams();
  const [route, setRoute] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // Popup states
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRouteCode, setSelectedRouteCode] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      const res = await fetch(`/api/route-detail/${slug}`);
      const json = await res.json();
      setRoute(json.route || null);
      setCars(json.cars || []);
    }
    loadDetail();
  }, [slug]);

  if (!route) return <p>Đang tải...</p>;

  return (
    <>
      <section className="route-detail container">
        <h1 className="route-title">{route.name}</h1>
        <p>{route.description}</p>

        <h2 className="section-title">Các loại xe</h2>

        <div className="car-list">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`car-card ${
                selectedCar?.id === car.id ? "selected" : ""
              }`}
              onClick={() => setSelectedCar(car)}
            >
              <h3>{car.name_vi}</h3>
              <p>Số chỗ: {car.seat_count}</p>
              <p>Giá: {car.price.toLocaleString()}đ</p>
            </div>
          ))}
        </div>

        {/* BUTTON ĐẶT XE */}
        <button
          className="btn-primary"
          onClick={() => {
            setSelectedRouteCode(route.code);
            setSelectedCarType(selectedCar?.code);
            setShowBooking(true);
          }}
        >
          Đặt Xe Ngay
        </button>
      </section>

      {/* POPUP BOOKING FORM */}
      {showBooking && (
        <div
          className="booking-popup-overlay"
          onClick={() => setShowBooking(false)}
        >
          <div
            className="booking-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowBooking(false)}
            >
              ✕
            </button>

            <BookingForm
              defaultRouteCode={selectedRouteCode}
              defaultCarType={selectedCarType}
            />
          </div>
        </div>
      )}
    </>
  );
}
