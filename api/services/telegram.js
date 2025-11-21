import dotenv from "dotenv";
dotenv.config();

export async function sendTelegram(data) {
    const roundtripText = data.roundTrip ? "Có" : "Không";


    const messageText = `
📌 *Thông tin đặt xe mới*  
———————————————  
👤 Họ tên: ${data.fullName}  
📞 SĐT: ${data.phone}
📧 Email: ${data.email}  
🚗 Tuyến: ${data.route}  
🚘 Loại xe: ${data.carType}  
📍 Điểm đón: ${data.pickupPlace}  
🏁 Điểm trả: ${data.dropoffPlace}
👨‍👩‍👧 Người lớn: ${data.adultCount}
🧒 Trẻ em: ${data.childCount}
🧳 Khứ hồi: ${roundtripText}  
📅 Ngày đi: ${data.date}  
⏰ Giờ đi: ${data.time}
📅 Ngày về: ${data.returnDate}  
⏰ Giờ về: ${data.returnTime}  
📝 Ghi chú: ${data.note || "(không có)"} 
🤑 Tổng tiền: ${data.totalPrice} 
———————————————
  `;

    await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: messageText,
                parse_mode: "Markdown"
            }),
        }
    );
}
