import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function BookingForm({
  defaultRouteCode = "",
  defaultCarType = "",
  onSuccess = () => {},
}) {
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

  /** ==========================
   * LOAD ROUTES
   ========================== */
  useEffect(() => {
    fetch("/api/routes")
      .then((res) => res.json())
      .then((data) => setRoutesData(data.routes || []));
  }, []);

  /** ==========================
   * LOAD CARS
   ========================== */
  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.cars || []));
  }, []);

  /** ==========================
   * APPLY DEFAULTS FROM ROUTE DETAIL
   ========================== */
  useEffect(() => {
    if (defaultRouteCode) setRoute(defaultRouteCode);
  }, [defaultRouteCode]);

  useEffect(() => {
    if (defaultCarType) setCarType(defaultCarType);
  }, [defaultCarType]);

  /** ==========================
   * FETCH PRICE FROM BACKEND
   ========================== */
  useEffect(() => {
    async function fetchPrice() {
      if (!route || !carType) {
        setTotalPrice(0);
        return;
      }

      try {
        const res = await fetch(
          `/api/prices?route=${route}&code=${carType}&roundtrip=${roundTrip}`
        );
        const json = await res.json();

        if (json?.price != null) {
          setTotalPrice(json.price);
        } else {
          setTotalPrice(0);
        }
      } catch (err) {
        setTotalPrice(0);
      }
    }

    fetchPrice();
  }, [route, carType, roundTrip]);

  /** ==========================
   * SUBMIT BOOKING
   ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      route,
      carType,
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
      totalPrice,
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
        // FIX: tắt loading trước khi popup bị đóng
        setLoading(false);
        setSuccess(true);

        form.reset();
        onSuccess();

        setTimeout(() => setSuccess(false), 200);
        return;
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
      {/* LOADING */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Đang gửi thông tin...</p>
        </div>
      )}

      {/* SUCCESS */}
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

            <form className="booking-form" onSubmit={handleSubmit}>
              {/* ========= USER INFO ========= */}
              <div className="form-row-3">
                <div>
                  <label>{t("booking.fullName")}</label>
                  <input
                    name="fullName"
                    placeholder={t("booking.fullNamePlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label>{t("booking.phone")}</label>
                  <input
                    name="phone"
                    placeholder={t("booking.phonePlaceholder")}
                    required
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <label>{t("booking.email")}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* ========= ROUTE ========= */}
              <select value={route} onChange={(e) => setRoute(e.target.value)} required>
                <option value="">-- Chọn tuyến --</option>
                {routesData.map((r) => (
                  <option key={r.id} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>

              {/* ========= CAR TYPE ========= */}
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                required
              >
                <option value="">-- Chọn loại xe --</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.code}>
                    {i18n.language === "vi" ? car.name_vi : car.name_en}
                  </option>
                ))}
              </select>

              {/* ========= PICKUP / DROPOFF ========= */}
              <div className="form-row">
                <div>
                  <label>{t("booking.pickup")}</label>
                  <input
                    name="pickupPlace"
                    placeholder={t("booking.pickupPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label>{t("booking.dropoff")}</label>
                  <input
                    name="dropoffPlace"
                    placeholder={t("booking.dropoffPlaceholder")}
                    required
                  />
                </div>
              </div>

              {/* ========= PASSENGERS ========= */}
              <div className="form-row">
                <div>
                  <label>{t("booking.adult")}</label>
                  <div className="number-input">
                    <button
                      type="button"
                      onClick={() => dec(setAdultCount, 1)}
                    >
                      -
                    </button>
                    <span>{adultCount}</span>
                    <button type="button" onClick={() => inc(setAdultCount)}>
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label>{t("booking.child")}</label>
                  <div className="number-input">
                    <button type="button" onClick={() => dec(setChildCount, 0)}>
                      -
                    </button>
                    <span>{childCount}</span>
                    <button type="button" onClick={() => inc(setChildCount)}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* ========= DATE / TIME ========= */}
              <div className="form-row">
                <div>
                  <label>{t("booking.date")}</label>
                  <input type="date" name="date" required />
                </div>

                <div>
                  <label>{t("booking.time")}</label>
                  <input type="time" name="time" required />
                </div>
              </div>

              {/* ========= ROUND TRIP ========= */}
              <div className="form-row-roundtrip">
                <div className="switch-wrap">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={roundTrip}
                      onChange={(e) => setRoundTrip(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>

                  <span>{t("booking.roundTrip")}</span>
                </div>

                {/* PRICE BOX (UI ĐẸP) */}
                {route && carType && (
                  <div className="price-box">
                    <strong>Giá tạm tính:</strong>
                    <p>{cars.find((c) => c.code === carType)?.name_vi}</p>
                    <p>{totalPrice.toLocaleString("vi-VN")} đ</p>
                  </div>
                )}
              </div>

              {/* ========= RETURN ROUND TRIP ========= */}
              {roundTrip && (
                <div className="form-row">
                  <div>
                    <label>{t("booking.returnDate")}</label>
                    <input
                      type="date"
                      value={returnDate}
                      required
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>{t("booking.returnTime")}</label>
                    <input
                      type="time"
                      value={returnTime}
                      required
                      onChange={(e) => setReturnTime(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* ========= NOTE ========= */}
              <div>
                <label>{t("booking.note")}</label>
                <textarea
                  name="note"
                  placeholder={t("booking.notePlaceholder")}
                />
              </div>

              {/* ========= SUBMIT ========= */}
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
