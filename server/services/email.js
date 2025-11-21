import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(data) {
    /* ======================
         2️⃣ SEND EMAIL VIA GOOGLE SCRIPT
    ====================== */
    let results = {};
    try {
        await fetch(process.env.GMAIL_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        results.gmail = "ok";
    } catch (err) {
        results.gmail = "fail";
    }
}
