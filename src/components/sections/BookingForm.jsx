import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm({ defaultRouteCode = "", defaultCarType = "" }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const inc = (setter, max = 50) => setter((prev) => Math.min(max, prev + 1));
  const dec = (setter, min = 0) => setter((prev) => Math.max(min, prev - 1));

  const [carType, setCarType] = useState(defaultCarType);
  const [route, setRoute] = useState(defaultRouteCode);
  const [roundTrip, setRoundTrip] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [routesData, setRoutesData] = useState([]);
  const [cars, setCars] = useState([]);

  // Receive props updates
  useEffect(() => {
    if (defaultRouteCode) setRoute(defaultRouteCode);
  }, [defaultRouteCode]);

  useEffect(() => {
    if (defaultCarType) setCarType(defaultCarType);
  }, [defaultCarType]);

  // Load routes
  useEffect(() => {
    fetch("/api/routes")
      .then((res) => res.json())
      .then((data) => setRoutesData(data.routes || []));
  }, []);

  // Load cars
  useEffect(() => {
    async function loadCars() {
      try {
        const res = await fetch("/api/cars");
        const json = await res.json();
        setCars(json.cars);
      } catch (e) {
        console.error("Load cars failed:", e);
      }
    }
    loadCars();
  }, []);

  // Car rules
  const CAR_RULES = {
    "4-ch": { maxPassengers: 4 },
    "7-ch": { maxPassengers: 7 },
    "16-ch": { maxPassengers: 15 },
    "29-ch": { maxPassengers: 28 },
  };

  const ROUTE_MAP = {
    "sg-pt": "sgn-phanthiet",
    "sg-mn": "sgn-muine",
    "sg-nt": "sgn-nhatrang",
    "sg-khac": "other",
    khac: "other",
  };

  const PRICE_TABLE = {
    "sg-pt": {
      price: { "4-ch": 1200000, "7-ch": 1400000, "16-ch": 2200000, "29-ch": 4000000 }
    },
    "sg-mn": {
      price: { "4-ch": 1300000, "7-ch": 1500000, "16-ch": 2300000, "29-ch": 2700000 }
    },
    "sg-nt": {
      price: { "4-ch": 2800000, "7-ch": 3200000, "16-ch": 4200000, "29-ch": 7000000 }
    }
  };

  // Passenger validation
  useEffect(() => {
    if (!carType || !cars.length) return;

    const car = cars.find(c => c.code === carType);
    if (!car) return;

    const max = car.seat_count;
    const total = adultCount + childCount;

    if (total > max) {
      alert(`❗ Xe này chỉ chở tối đa ${max} khách.`);

      if (adultCount >= max) {
        setAdultCount(max);
        setChildCount(0);
      } else {
        setChildCount(max - adultCount);
      }
    }
  }, [carType, adultCount, childCount, cars]);

  // Price calculation
  useEffect(() => {
    if (!route || !carType) {
      setTotalPrice(0);
      return;
    }

    const basePrice = PRICE_TABLE[route]?.price?.[carType] || 0;
    let price = basePrice;

    if (roundTrip) price *= 2;

    setTotalPrice(price);
  }, [route, carType, roundTrip]);

  // Fetch dynamic price
  useEffect(() => {
    async function fetchPrice() {
      if (!route || !carType) return;

      const res = await fetch(`/api/prices?route=${route}&code=${carType}&roundtrip=${roundTrip}`);
      const json = await res.json();
      setTotalPrice(json.price);
    }
    fetchPrice();
  }, [route, carType, roundTrip]);

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const data = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      route,
      carType,
      pickupPlace: form.pickupPlace.value,
      dropoffPlace: form.dropoffPlace.value,
      date: form.date.value,
      time: form.time.value,
      roundTrip,
      returnDate: roundTrip ? returnDate : null,
      returnTime: roundTrip ? returnTime : null,
      note: form.note.value,
      adultCount,
      childCount,
      totalPrice
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "ok") {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert("Gửi thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      alert("Lỗi hệ thống, vui lòng thử lại sau!");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Đang gửi thông tin...</p>
        </div>
      )}

      {/* Popup success */}
      {success && (
        <div className="success-popup">
          <div className="success-box">
            <div className="checkmark">✔</div>
            <p>Gửi thành công!</p>
          </div>
        </div>
      )}

      {/* FORM */}
      <section id="dat-xe">
        <div className="container">
          <h2>{t('booking.title')}</h2>
          <div className="card">
            <form className="booking-form" onSubmit={handleSubmit}>

              {/* ROUTE SELECT */}
              <select
                id="route"
                name="route"
                required
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              >
                <option value="">-- Chọn tuyến --</option>

                {routesData.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>

              {/* CAR TYPE */}
              <select
                id="carType"
                name="carType"
                required
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="">-- Chọn loại xe --</option>

                {cars.map(car => (
                  <option key={car.id} value={car.code}>
                    {i18n.language === "vi" ? car.name_vi : car.name_en}
                  </option>
                ))}
              </select>

              {/* Các phần còn lại giữ nguyên trong file của bạn */}
              {/* Pickup, dropoff, ngày giờ, round trip... */}
              {/* ... */}

            </form>
          </div>
        </div>
      </section>
    </>
  );
}
