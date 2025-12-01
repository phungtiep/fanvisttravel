import { supabase } from "../lib/superbase.js";

export async function addBookingToDatabase(data) {
  const payload = {
    full_name: data.fullName,
    phone: data.phone,
    email: data.email,

    route: data.route,
    car_type: data.carType,

    pickup_place: data.pickupPlace,
    dropoff_place: data.dropoffPlace,

    date: data.date,
    time: data.time,

    round_trip: data.roundTrip,
    return_date: data.returnDate || null,
    return_time: data.returnTime || null,

    note: data.note,

    adult_count: data.adultCount,
    child_count: data.childCount,

    total_price: data.totalPrice,
  };

  const { error } = await supabase.from("bookings").insert(payload);

  if (error) {
    console.error("🚨 Lỗi khi lưu booking:", error.message);
    throw error;
  }

  return true;
}
