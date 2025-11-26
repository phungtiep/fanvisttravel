import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const inc = (setter, max = 50) => setter((prev) => Math.min(max, prev + 1));
  const dec = (setter, min = 0) => setter((prev) => Math.max(min, prev - 1));

  const [carType, setCarType] = useState("");
  const [rawCarType, setRawCarType] = useState("");
  const [route, setRoute] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);


  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [routesData, setRoutesData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [cars, setCars] = useState([]);


  /** ==========================
   *  QUY ĐỊNH SỐ KHÁCH & GIÁ
   =========================== */
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

  /** ==========================
 *  BẢNG GIÁ CHUẨN
 =========================== */
  const PRICE_TABLE = {
    "sg-pt": {
      name: "Sài Gòn → Phan Thiết",
      price: { "4-ch": 1200000, "7-ch": 1400000, "16-ch": 2200000, "29-ch": 4000000 }
    },
    "sg-mn": {
      name: "Sài Gòn → Mũi Né",
      price: { "4-ch": 1300000, "7-ch": 1500000, "16-ch": 2300000, "29-ch": 2700000 }
    },
    "sg-nt": {
      name: "Sài Gòn → Nha Trang",
      price: { "4-ch": 2800000, "7-ch": 3200000, "16-ch": 4200000, "29-ch": 7000000 }
    }
  };

  // Lấy danh sách tuyến từ API backend
  useEffect(() => {
    fetch("/api/routes")
      .then((res) => res.json())
      .then((data) => setRoutesData(data.routes || []));
  }, []);

  // Lấy danh sách loại xe từ backend
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



  /** ==========================
   *  RÀNG BUỘC SỐ LƯỢNG KHÁCH
   =========================== */
  useEffect(() => {
    if (!carType || !cars || cars.length === 0) return;

    // tìm xe theo code
    const car = cars.find(c => c.code === carType);
    if (!car) return;

    const max = car.seat_count;
    const total = adultCount + childCount;

    if (total > max) {
      alert(`❗ Xe này chỉ chở tối đa ${max} hành khách.`);

      // Tự động điều chỉnh lại cho hợp lệ
      if (adultCount >= max) {
        setAdultCount(max);
        setChildCount(0);
      } else {
        setChildCount(max - adultCount);
      }
    }
  }, [carType, adultCount, childCount, cars]);


  /** ==========================
 *  TÍNH GIÁ REALTIME
 =========================== */
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




  // Tính giá realtime theo database
  useEffect(() => {
    async function fetchPrice() {
      if (!route || !carType) return;

      const res = await fetch(`/api/prices?route=${route}&code=${carType}&roundtrip=${roundTrip}`);
      const json = await res.json();
      setTotalPrice(json.price);
    }
    fetchPrice();
  }, [route, carType, roundTrip]);


  /** ==========================
   *  SUBMIT BOOKING
   =========================== */


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bật loading
    const form = e.target;

    const mappedCar = carType; // 4 → 4-ch

    const mappedRoute = ROUTE_MAP[form.route.value];

    const rules = CAR_RULES[mappedCar];
    const totalPassengers = adultCount + childCount;

    // Check lần cuối
    if (totalPassengers > rules.maxPassengers) {
      alert(
        `❗ Xe này chỉ chở tối đa ${rules.maxPassengers} khách. Vui lòng điều chỉnh lại.`
      );
      setLoading(false);
      return;
    }


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

    console.log('Booking data:', data);
    alert(t('booking.alert'));

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();



      if (result.status === "ok") {
        // alert("Đã gửi yêu cầu thành công!");
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert("Gửi thất bại, vui lòng thử lại!");
      }

    } catch (error) {
      console.error("Submit error:", error);
      alert("Lỗi hệ thống, vui lòng thử lại sau!");
    }

    setLoading(false); // Tắt loading
  };

  return (
    <>
      {/* ===== LOADING OVERLAY ===== */}
      {
        loading && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <p>Đang gửi thông tin...</p>
          </div>
        )
      }
      {/* ===== POPUP THÀNH CÔNG ===== */}
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
          <h2>{t('booking.title')}</h2>
          <div className="card">
            <p style={{ marginBottom: '8px' }}>
              {t('booking.intro')}
            </p>
            <form id="bookingForm" className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row-3">
                <div>
                  <label htmlFor="fullName">{t('booking.fullName')}</label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    placeholder={t('booking.fullNamePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="phone">{t('booking.phone')}</label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    placeholder={t('booking.phonePlaceholder')}
                  />
                </div>
                {/* ===== EMAIL ===== */}
                <div style={{ width: "100%" }}>
                  <label htmlFor="email">{t('booking.email')}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              {/* <div className="form-row">
                <div>
                  <label htmlFor="route">{t('booking.route')}</label>
                  <select id="route" name="route" required>
                    <option value="">
                      {t('booking.routeOptions.placeholder')}
                    </option>
                    <option value="sg-pt">{t('booking.routeOptions.sgPt')}</option>
                    <option value="sg-mn">{t('booking.routeOptions.sgMn')}</option>
                    <option value="sg-nt">{t('booking.routeOptions.sgNt')}</option>
                    <option value="sg-khac">{t('booking.routeOptions.sgOther')}</option>
                    <option value="khac">{t('booking.routeOptions.other')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="carType">{t('booking.carType')}</label>
                  <select id="carType" name="carType" required>
                    <option value="">
                      {t('booking.carTypeOptions.placeholder')}
                    </option>
                    <option value="4">{t('booking.carTypeOptions.c4')}</option>
                    <option value="7">{t('booking.carTypeOptions.c7')}</option>
                    <option value="16">{t('booking.carTypeOptions.c16')}</option>
                    <option value="29">{t('booking.carTypeOptions.c29')}</option>
                  </select>
                </div>
              </div> */}

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




              <div className="form-row">
                <div>
                  <label htmlFor="pickupPlace">{t('booking.pickup')}</label>
                  <input
                    id="pickupPlace"
                    name="pickupPlace"
                    required
                    placeholder={t('booking.pickupPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="dropoffPlace">{t('booking.dropoff')}</label>
                  <input
                    id="dropoffPlace"
                    name="dropoffPlace"
                    required
                    placeholder={t('booking.dropoffPlaceholder')}
                  />
                </div>
              </div>

              <div className="form-row">
                {/* Người lớn */}
                <div>
                  <label>{t("booking.adult")}</label>
                  <div className="number-input">
                    <button type="button" onClick={() => dec(setAdultCount, 1)}>-</button>
                    <span>{adultCount}</span>
                    <button type="button" onClick={() => inc(setAdultCount)}>+</button>
                  </div>
                </div>

                {/* Trẻ em */}
                <div>
                  <label>{t("booking.child")}</label>
                  <div className="number-input">
                    <button type="button" onClick={() => dec(setChildCount, 0)}>-</button>
                    <span>{childCount}</span>
                    <button type="button" onClick={() => inc(setChildCount)}>+</button>
                  </div>
                </div>
              </div>


              <div className="form-row">
                <div>
                  <label htmlFor="date">{t('booking.date')}</label>
                  <input type="date" id="date" name="date" required />
                </div>
                <div>
                  <label htmlFor="time">{t('booking.time')}</label>
                  <input type="time" id="time" name="time" required />
                </div>
              </div>

              {/* --- KHỨ HỒI --- */}
              <div
                className="form-row-roundtrip"
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >


                <div className="switch-wrap">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={roundTrip}
                      onChange={(e) => setRoundTrip(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>

                  <span className="switch-label">{t("booking.roundTrip")}</span>
                </div>


                {route && carType && (
                  <div className="price-box">
                    <strong>Giá tạm tính:</strong>
                    <p>
                      {i18n.language === "vi"
                        ? cars.find(c => c.code === carType)?.name_vi
                        : cars.find(c => c.code === carType)?.name_en}
                    </p>
                    <p>{totalPrice.toLocaleString()} đ</p>
                  </div>
                )}
              </div>


              {/* --- NGÀY / GIỜ KHỨ HỒI GỌN ĐẸP --- */}
              {roundTrip && (
                <div className="form-row" style={{ marginTop: "10px" }}>
                  <div>
                    <label>{t("booking.returnDate")}</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                      className="input"
                    />
                  </div>

                  <div>
                    <label>{t("booking.returnTime")}</label>
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      required
                      className="input"
                    />
                  </div>
                </div>
              )}



              <div>
                <label htmlFor="note">{t('booking.note')}</label>
                <textarea
                  id="note"
                  name="note"
                  placeholder={t('booking.notePlaceholder')}
                />
              </div>

              <button type="submit" className="btn-primary">
                ✉ {t('booking.submit')}
              </button>
              <p className="note-small">
                {t('booking.afterSubmit')}
              </p>
            </form>
          </div>
        </div>
      </section>


    </>
  );
}
