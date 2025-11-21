import { supabase } from "../../api/lib/supabase.js";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("active", true);

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
