import express from "express";
import { saveBookingToSupabase } from "../services/database.js";
import { sendTelegram } from "../services/telegram.js";
import { sendEmail } from "../services/email.js";
import { sendToSheet } from "../services/googleSheet.js";
import { confirmEmail } from "./services/confirmEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    // 1) Lưu vào database
    await saveBookingToSupabase(data);

    // 2) Gửi Telegram
    await sendTelegram(data);

    // 3) Gửi Gmail confirm
    await sendEmail(data);

    // 4) Gửi Google Sheet
    await sendToSheet(data);

    // 5) gửi email xác nhận
    await confirmEmail(data)

    return res.json({ status: "ok" });
  } catch (err) {
    console.error("Booking ERROR:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
