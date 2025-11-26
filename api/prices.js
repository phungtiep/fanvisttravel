import { supabase } from "./lib/superbase.js";

// export default async function handler(req, res) {
//   const { route, code, roundtrip } = req.query;

//   if (!route || !code) {
//     return res.status(400).json({ error: "Missing route or code" });
//   }

//   const { data: routeData, error } = await supabase
//     .from("routes")
//     .select("*")
//     .eq("code", route)
//     .single();

//   if (error) return res.status(500).json({ error: error.message });

//   const priceMap = {
//     "4-ch": routeData.price_4,
//     "7-ch": routeData.price_7,
//     "16-ch": routeData.price_16,
//     "29-ch": routeData.price_29,
//   };

//   let price = priceMap[code] || 0;
//   if (roundtrip === "true") price *= 2;

//   return res.status(200).json({ price });
// }



export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { route, code, roundtrip } = req.query;

    if (!route || !code) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    // Lấy dữ liệu tuyến từ Supabase
    const { data: routeData, error } = await supabase
      .from("routes")
      .select("*")
      .eq("code", route)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    const priceMap = {
      "4-ch": routeData.price_4,
      "7-ch": routeData.price_7,
      "16-ch": routeData.price_16,
      "29-ch": routeData.price_29,
      "45-ch": routeData.price_45,

      "limo-9": routeData.price_9,
      "limo-11": routeData.price_11,
      "limo-19": routeData.price_19,
      "limo-24": routeData.price_24,

      "carnival": routeData.price_carnival,
      "sedona": routeData.price_sedona,
    };

    let price = priceMap[code] || 0;

    // Nếu là khứ hồi → nhân đôi
    if (roundtrip === "true") {
      price *= 2;
    }

    return res.status(200).json({ price });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
