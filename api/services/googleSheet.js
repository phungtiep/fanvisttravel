import dotenv from "dotenv";
dotenv.config();

export async function sendToSheet(data) {
  await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}