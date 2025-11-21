import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("active", true);

  if (error) return res.status(500).json({ error });

  return res.status(200).json({ routes: data });
}
