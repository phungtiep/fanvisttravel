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

    const [showBooking, setShowBooking] = useState(false);
    const [selectedRouteCode, setSelectedRouteCode] = useState(null);
    const [selectedCarType, setSelectedCarType] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                // Fetch route detail
                const resRoute = await fetch(`/api/routes?code=${encodeURIComponent(code)}`);
                const jsonRoute = await resRoute.json();

                if (jsonRoute.route) setRoute(jsonRoute.route);
                else setError("Không tìm thấy tuyến đường.");

                // Fetch car list
                const resCars = await fetch("/api/cars");
                const jsonCars = await resCars.json();
                setCars(jsonCars.cars || []);

            } catch (err) {
                setError("Lỗi tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [code]);

    useEffect(() => {
        if (showBooking) {
            document.documentElement.classList.add("modal-open");
            document.body.classList.add("modal-open");
        } else {
            document.documentElement.classList.remove("modal-open");
            document.body.classList.remove("modal-open");
        }
    }, [showBooking]);



    if (!route) {
        return (
            <div className="rd-notfound">
                {error}
                <div style={{ marginTop: 12 }}>
                    <Link to="/">← Quay lại</Link>
                </div>
            </div>
        );
    }

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

    const carsWithPrice = cars.filter((c) => PRICE_FROM_CODE[c.code] != null);

    return (
        <div className="rd-container">

            {/* PAGE TITLE */}
            <h1 className="rd-title">{route.name}</h1>
            <p className="rd-subtitle">Bảng giá 1 chiều & các loại xe áp dụng</p>

            {/* GRID */}
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

            {/* BOOKING POPUP */}
            {showBooking && (
                <div className="booking-popup">
                    <div className="booking-overlay" onClick={() => setShowBooking(false)}></div>

                    <div className="booking-box popup-animate">
                        <BookingForm
                            defaultRouteCode={selectedRouteCode}
                            defaultCarType={selectedCarType}
                            onSuccess={() => setShowBooking(false)}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
