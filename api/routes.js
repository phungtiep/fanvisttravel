import { supabase } from "./lib/superbase.js";

export default async function handler(req, res) {
  try {
    // Lấy query ?code=sg-mn từ URL
    const url = new URL(req.url, "http://localhost");
    const code = url.searchParams.get("code");

    // === TRƯỜNG HỢP DETAIL: /api/routes?code=sg-mn ===
    if (code) {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("code", code)
        .eq("active", true)
        .single();

      if (error || !data) {
        console.error("Route not found:", error);
        return res.status(404).json({ error: "Route not found" });
      }

      return res.status(200).json({ route: data });
    }

    // === TRƯỜNG HỢP LIST: /api/routes ===
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("active", true)
      .order("code", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json({ routes: data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
