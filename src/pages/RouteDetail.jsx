import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookingForm from "../components/sections/BookingForm";

import "./RouteDetail.css";

export default function RouteDetail() {
    const { code } = useParams();

    const [route, setRoute] = useState(null);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // === BOOKING POPUP ===
    const [showBooking, setShowBooking] = useState(false);
    const [selectedRouteCode, setSelectedRouteCode] = useState(null);
    const [selectedCarType, setSelectedCarType] = useState(null);

    /* ============================================
        FETCH ROUTE + CARS DATA
    ============================================ */
    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const resRoute = await fetch(
                    `/api/routes?code=${encodeURIComponent(code)}`
                );
                const jsonRoute = await resRoute.json();

                if (jsonRoute.route) {
                    setRoute(jsonRoute.route);
                } else {
                    setRoute(null);
                    setError("Không tìm thấy tuyến đường này.");
                }

                const resCars = await fetch("/api/cars");
                const jsonCars = await resCars.json();
                setCars(jsonCars.cars || []);
            } catch (e) {
                console.error(e);
                setError("Có lỗi khi tải dữ liệu, vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [code]);

    if (loading) {
        return <div className="rd-loading">Đang tải dữ liệu…</div>;
    }

    if (!route) {
        return (
            <div className="rd-notfound">
                {error || "Không tìm thấy tuyến đường"}
                <div style={{ marginTop: 12 }}>
                    <Link to="/">← Quay lại trang chủ</Link>
                </div>
            </div>
        );
    }

    /* ============================================
        Ánh xạ giá theo code
    ============================================ */
    const PRICE_FROM_CODE = {
        "4-ch": route.price_4,
        "7-ch": route.price_7,
        carnival: route.price_carnival,
        sedona: route.price_sedona,
        "limo-9": route.price_9,
        "limo-11": route.price_11,
        "16-ch": route.price_16,
        "limo-19": route.price_19,
        "limo-24": route.price_24,
        "29-ch": route.price_29,
        "45-ch": route.price_45,
    };

    const carsWithPrice = cars.filter(
        (car) => PRICE_FROM_CODE[car.code] != null
    );

    const formatPrice = (v) =>
        v != null ? v.toLocaleString("vi-VN") + " đ" : "Liên hệ";

    /* ============================================
        UI RENDER
    ============================================ */
    return (
        <>
            <div className="rd-container">
                <h1 className="rd-title">{route.name}</h1>
                <p className="rd-subtitle">Bảng giá & các loại xe áp dụng</p>

                <div className="rd-grid">
                    {carsWithPrice.map((car) => {
                        const price = PRICE_FROM_CODE[car.code];

                        return (
                            <div className="rd-card" key={car.id}>
                                <div className="rd-img-box">
                                    <img
                                        src={car.image_url || "/car-placeholder.webp"}
                                        alt={car.name_vi}
                                        className="rd-img"
                                    />
                                </div>

                                <div className="rd-card-body">
                                    <h3 className="rd-car-title">{car.name_vi}</h3>

                                    <div className="rd-price-text">
                                        {price?.toLocaleString("vi-VN")} đ
                                    </div>

                                    <button
                                        className="btn-book-elegant"
                                        onClick={() => {
                                            setSelectedRouteCode(route.code);
                                            setSelectedCarType(car.code);
                                            setShowBooking(true);
                                        }}
                                    >
                                        <span>🚘</span> Đặt Xe Ngay
                                    </button>
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>

            {/* ============================================
                POPUP BOOKING FORM
            ============================================ */}
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
                            onSuccess={() => setShowBooking(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
