import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BookingForm() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      route: form.route.value,
      carType: form.carType.value,
      pickupPlace: form.pickupPlace.value.trim(),
      dropoffPlace: form.dropoffPlace.value.trim(),
      date: form.date.value,
      time: form.time.value,
      note: form.note.value.trim(),
    };

    console.log('Booking data:', data);
    alert(t('booking.alert'));
    form.reset();
  };

  return (
    <section id="dat-xe">
      <div className="container">
        <h2>{t('booking.title')}</h2>
        <div className="card">
          <p style={{ marginBottom: '8px' }}>
            {t('booking.intro')}
          </p>
          <form id="bookingForm" onSubmit={handleSubmit}>
            <div className="form-row">
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
            </div>

            <div className="form-row">
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
            </div>

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
              <div>
                <label htmlFor="date">{t('booking.date')}</label>
                <input type="date" id="date" name="date" required />
              </div>
              <div>
                <label htmlFor="time">{t('booking.time')}</label>
                <input type="time" id="time" name="time" required />
              </div>
            </div>

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
  );
}
