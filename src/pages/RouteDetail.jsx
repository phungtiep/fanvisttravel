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

    /* LOCK PAGE SCROLL WHEN POPUP OPEN */
    useEffect(() => {
        if (showBooking) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [showBooking]);

    /* FETCH DATA */
    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                const resRoute = await fetch(`/api/routes?code=${encodeURIComponent(code)}`);
                const jsonRoute = await resRoute.json();

                if (jsonRoute.route) setRoute(jsonRoute.route);
                else setError("Không tìm thấy tuyến đường.");

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

    /* PRICE MAP */
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

                            {/* IMAGE */}
                            <div className="rd-img-box">
                                <img
                                    src={car.image_url || "/car-placeholder.webp"}
                                    alt={car.name_vi}
                                    className="rd-img"
                                />
                            </div>

                            {/* INFO */}
                            <div className="rd-card-body">
                                <h3 className="rd-car-title">{car.name_vi}</h3>

                                <div className="rd-price-text">
                                    {price?.toLocaleString("vi-VN")} đ
                                </div>

                                <div className="rd-price-info">
                                    ✔ Giá 1 chiều đã bao gồm phí cầu đường  
                                    <br /> ✖ Chưa bao gồm thuế VAT
                                </div>

                                <button
                                    className="btn-book-elegant"
                                    onClick={() => {
                                        setSelectedRouteCode(route.code);
                                        setSelectedCarType(car.code);
                                        setShowBooking(true);
                                    }}
                                >
                                    🚗 Đặt Xe Ngay
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* BOOKING POPUP */}
            {showBooking && (
                <div className="popup-container">
                    <div className="popup-overlay" onClick={() => setShowBooking(false)} />

                    <div className="popup-card popup-animate">
                        <div className="popup-header">
                            <h2>Đặt xe nhanh</h2>
                            <button className="popup-close" onClick={() => setShowBooking(false)}>×</button>
                        </div>

                        <div className="popup-body">
                            <BookingForm
                                defaultRouteCode={selectedRouteCode}
                                defaultCarType={selectedCarType}
                                onSuccess={() => setShowBooking(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
