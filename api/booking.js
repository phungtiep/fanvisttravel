import { sendTelegram } from "./services/telegram.js";
import { sendEmail } from "./services/email.js";
import { sendToSheet } from "./services/googleSheet.js";
import { confirmEmail } from "./services/comfirmEmail.js";
import { addBookingToDatabase } from "../api/addBookingDatabase";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  try {

    // 1) insert data base
    await addBookingDatabase(data);
    // 2) Gửi Telegram
    await sendTelegram(data);

    // 3) Gửi Email Admin
    await sendEmail(data);

    // 4) Gửi Google Sheet
    await sendToSheet(data);

    // 5) Gửi Email Xác Nhận Người Dùng
    await confirmEmail(data);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Booking ERROR:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
