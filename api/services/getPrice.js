import { supabase } from "../../api/lib/supabase.js";

export default async function handler(req, res) {
  const { route, carType, roundtrip } = req.query;

  if (!route || !carType) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Lấy giá tuyến
  const { data: routeData, error } = await supabase
    .from("routes")
    .select("*")
    .eq("code", route)
    .single();

  if (error) return res.status(500).json({ error });

  const priceMap = {
    "4-ch": routeData.price_4,
    "7-ch": routeData.price_7,
    "16-ch": routeData.price_16,
    "29-ch": routeData.price_29,
  };

  let price = priceMap[carType] || 0;

  // Nếu là khứ hồi → nhân đôi
  if (roundtrip === "true") price *= 2;

  res.status(200).json({ price });
}
