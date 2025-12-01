import { supabase } from "./lib/superbase.js";


export async function addBookingToDatabase(data) {
  const payload = {
    full_name: data.fullName,
    phone: data.phone,
    email: data.email,
    route: data.route,
    car_type: data.carType,
    pickup: data.pickupPlace,
    dropoff: data.dropoffPlace,
    adult: data.adultCount,
    child: data.childCount,
    date: data.date,
    time: data.time,
    roundtrip: data.roundTrip,
    return_date: data.returnDate,
    return_time: data.returnTime,
    total_price: data.totalPrice,
    note: data.note,
  };

  const { error } = await supabase.from("bookings").insert(payload);

  if (error) {
    console.error("Error inserting booking:", error.message);
    throw error;
  }

  return true;
}
