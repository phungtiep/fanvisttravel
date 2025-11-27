import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm({
  defaultRouteCode = "",
  defaultCarType = "",
  onSuccess = () => {}
}) {

  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const inc = (setter, max = 50) => setter(prev => Math.min(max, prev + 1));
  const dec = (setter, min = 0) => setter(prev => Math.max(min, prev - 1));

  // Receive data from RouteDetail
  const [carType, setCarType] = useState(defaultCarType);
  const [route, setRoute] = useState(defaultRouteCode);

  const [roundTrip, setRoundTrip] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [routesData, setRoutesData] = useState([]);
  const [cars, setCars] = useState([]);


  /** ==========================
   *  PRICE TABLE
   =========================== */
  const PRICE_TABLE = {
    "sg-pt": { price: { "4-ch": 1200000, "7-ch": 1400000, "16-ch": 2200000, "29-ch": 4000000 }},
    "sg-mn": { price: { "4-ch": 1300000, "7-ch": 1500000, "16-ch": 2300000, "29-ch": 2700000 }},
    "sg-nt": { price: { "4-ch": 2800000, "7-ch": 3200000, "16-ch": 4200000, "29-ch": 7000000 }},
  };

  /** ====================================================
   *  LOAD ROUTES + CARS
   ==================================================== */
  useEffect(() => {
    fetch("/api/routes")
      .then(res => res.json())
      .then(data => setRoutesData(data.routes || []));
  }, []);

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

  // When RouteDetail updates selections
  useEffect(() => {
    if (defaultRouteCode) setRoute(defaultRouteCode);
  }, [defaultRouteCode]);

  useEffect(() => {
    if (defaultCarType) setCarType(defaultCarType);
  }, [defaultCarType]);


  /** ==========================
   * TÍNH GIÁ REALTIME
   =========================== */
  useEffect(() => {
    if (!route || !carType) {
      setTotalPrice(0);
      return;
    }

    const basePrice = PRICE_TABLE?.[route]?.price?.[carType] || 0;
    let price = basePrice;
    if (roundTrip) price *= 2;

    setTotalPrice(price);
  }, [route, carType, roundTrip]);


  /** ==========================
   *  SUBMIT BOOKING
   =========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    // Dùng route thật từ API, không dùng ROUTE_MAP nữa
    const mappedRoute = form.route.value;
    const mappedCar = carType;

    const data = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      route: mappedRoute,
      carType: mappedCar,
      pickupPlace: form.pickupPlace.value.trim(),
      dropoffPlace: form.dropoffPlace.value.trim(),
      date: form.date.value,
      time: form.time.value,
      roundTrip,
      returnDate: roundTrip ? returnDate : null,
      returnTime: roundTrip ? returnTime : null,
      note: form.note.value.trim(),
      adultCount,
      childCount,
      totalPrice
    };

    alert(t("booking.alert"));

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "ok") {

        // IMPORTANT FIX — tắt loading TRƯỚC khi popup đóng
        setLoading(false);

        setSuccess(true);
        form.reset();

        // Close popup from parent
        onSuccess();

        setTimeout(() => setSuccess(false), 2000);
        return;
      } else {
        alert("Gửi thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Lỗi hệ thống, vui lòng thử lại sau!");
    }

    setLoading(false);
  };

  return (
    <>
      {/* ===== LOADING OVERLAY ===== */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Đang gửi thông tin...</p>
        </div>
      )}

      {/* ===== POPUP SUCCESS ===== */}
      {success && (
        <div className="success-popup">
          <div className="success-box">
            <div className="checkmark">✔</div>
            <p>Gửi thành công! Chúng tôi sẽ liên hệ ngay.</p>
          </div>
        </div>
      )}

      <section id="dat-xe">
        <div className="container">
          <h2>{t("booking.title")}</h2>
          <div className="card">
            <p>{t("booking.intro")}</p>

            <form id="bookingForm" className="booking-form" onSubmit={handleSubmit}>

              {/* ===== USER INFO ===== */}
              <div className="form-row-3">
                <div>
                  <label htmlFor="fullName">{t("booking.fullName")}</label>
                  <input id="fullName" name="fullName" required />
                </div>

                <div>
                  <label htmlFor="phone">{t("booking.phone")}</label>
                  <input id="phone" name="phone" required />
                </div>

                <div>
                  <label htmlFor="email">{t("booking.email")}</label>
                  <input id="email" name="email" type="email" required />
                </div>
              </div>

              {/* ===== ROUTE ===== */}
              <select
                id="route"
                name="route"
                required
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              >
                <option value="">-- Chọn tuyến --</option>
                {routesData.map(r => (
                  <option key={r.id} value={r.code}>{r.name}</option>
                ))}
              </select>

              {/* ===== CAR TYPE ===== */}
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

              {/* ===== PICKUP + DROPOFF ===== */}
              <div className="form-row">
                <div>
                  <label>{t("booking.pickup")}</label>
                  <input id="pickupPlace" name="pickupPlace" required />
                </div>
                <div>
                  <label>{t("booking.dropoff")}</label>
                  <input id="dropoffPlace" name="dropoffPlace" required />
                </div>
              </div>

              {/* ===== PASSENGERS ===== */}
              <div className="form-row">
                <div>
                  <label>{t("booking.adult")}</label>
                  <div className="number-input">
                    <button type="button" onClick={() => dec(setAdultCount, 1)}>-</button>
                    <span>{adultCount}</span>
                    <button type="button" onClick={() => inc(setAdultCount)}>+</button>
                  </div>
                </div>

                <div>
                  <label>{t("booking.child")}</label>
                  <div className="number-input">
                    <button type="button" onClick={() => dec(setChildCount, 0)}>-</button>
                    <span>{childCount}</span>
                    <button type="button" onClick={() => inc(setChildCount)}>+</button>
                  </div>
                </div>
              </div>

              {/* ===== DATE + TIME ===== */}
              <div className="form-row">
                <div>
                  <label>{t("booking.date")}</label>
                  <input type="date" id="date" name="date" required />
                </div>

                <div>
                  <label>{t("booking.time")}</label>
                  <input type="time" id="time" name="time" required />
                </div>
              </div>

              {/* ===== ROUND TRIP ===== */}
              <div className="form-row-roundtrip">
                <div className="switch-wrap">
                  <label className="switch">
                    <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                  <span className="switch-label">{t("booking.roundTrip")}</span>
                </div>

                {route && carType && (
                  <div className="price-box">
                    <strong>Giá tạm tính:</strong>
                    <p>{cars.find(c => c.code === carType)?.name_vi}</p>
                    <p>{totalPrice.toLocaleString()} đ</p>
                  </div>
                )}
              </div>

              {/* ===== RETURN DATE ===== */}
              {roundTrip && (
                <div className="form-row">
                  <div>
                    <label>{t("booking.returnDate")}</label>
                    <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
                  </div>
                  <div>
                    <label>{t("booking.returnTime")}</label>
                    <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />
                  </div>
                </div>
              )}

              {/* ===== NOTE ===== */}
              <div>
                <label>{t("booking.note")}</label>
                <textarea id="note" name="note" />
              </div>

              <button type="submit" className="btn-primary">
                ✉ {t("booking.submit")}
              </button>

              <p className="note-small">{t("booking.afterSubmit")}</p>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}
