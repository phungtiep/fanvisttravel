import { supabase } from "../lib/superbase.js";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing route code" });
  }

  try {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("code", code)
      .eq("active", true)
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ route: null });
    }

    return res.status(200).json({ route: data[0] });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
