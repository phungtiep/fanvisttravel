import { supabase } from "./lib/superbase.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { data, error } = await supabase
      .from("cars")
      .select("id, code, name_vi, name_en, seat_count, base_price, image_url, active")
      .eq("active", true)
      .order("seat_count", { ascending: true })
      .order("name_vi", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ cars: data });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
