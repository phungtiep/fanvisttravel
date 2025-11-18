export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const data = req.body;

    const messageText = `
📌 *Thông tin đặt xe mới*  
———————————————  
👤 Họ tên: ${data.fullName}  
📞 SĐT: ${data.phone}  
🚗 Tuyến: ${data.route}  
🚘 Loại xe: ${data.carType}  
📍 Điểm đón: ${data.pickupPlace}  
🏁 Điểm trả: ${data.dropoffPlace}
👨‍👩‍👧 Người lớn: ${data.adultCount}
🧒 Trẻ em: ${data.childCount}  
📅 Ngày đi: ${data.date}  
⏰ Giờ: ${data.time}  
📝 Ghi chú: ${data.note || "(không có)"}  
———————————————
  `;

    let results = {};

    /* ======================
       1️⃣ SEND TELEGRAM
    ====================== */
    try {
        const TG_BOT = process.env.TELEGRAM_BOT_TOKEN;
        const TG_CHAT = process.env.TELEGRAM_CHAT_ID;

        await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TG_CHAT,
                text: messageText,
                parse_mode: "Markdown",
            }),
        });

        results.telegram = "ok";
    } catch (err) {
        results.telegram = "fail";
    }

    /* ======================
       2️⃣ SEND EMAIL VIA GOOGLE SCRIPT
  ====================== */
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

    /* ======================
       3️⃣ SEND TO GOOGLE SHEET
    ====================== */
    try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        results.sheet = "ok";
    } catch (err) {
        results.sheet = "fail";
    }

    return res.status(200).json({
        status: "done",
        results,
    });
}
