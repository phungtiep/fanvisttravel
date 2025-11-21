// import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";
// dotenv.config();

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// export async function saveBookingToSupabase(data) {
//   const { error } = await supabase.from("bookings").insert({
//     full_name: data.fullName,
//     phone: data.phone,
//     email: data.email,
//     route: data.route,
//     car_type: data.carType,
//     pickup: data.pickupPlace,
//     dropoff: data.dropoffPlace,
//     adult: data.adultCount,
//     child: data.childCount,
//     date: data.date,
//     time: data.time,
//     roundtrip: data.roundTrip,
//     return_date: data.returnDate,
//     return_time: data.returnTime,
//     total_price: data.totalPrice,
//     note: data.note,
//   });

//   if (error) throw error;

//   return true;
// }
