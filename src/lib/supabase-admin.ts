import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// ใช้ Service Role Key เพื่อทะลุ RLS (ใช้เฉพาะฝั่ง Server เท่านั้น)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Missing Supabase Admin environment variables.");
}

export const supabaseAdmin = createClient<Database>(
  supabaseUrl || "",
  supabaseServiceKey || ""
);
