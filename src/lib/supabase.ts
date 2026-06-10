import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  console.warn("Invalid or missing Supabase environment variables. Database features will not work. Please check your .env file.");
}

export const supabase = createClient<Database>(
  isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
