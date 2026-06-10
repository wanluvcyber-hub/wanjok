
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  const { data: categories, error: catError } = await supabase.from("categories").select("*");
  if (catError) {
    console.error("Error fetching categories:", catError);
  } else {
    console.log("Categories count:", categories?.length);
    console.log("Categories:", categories);
  }

  const { data: transactions, error: transError } = await supabase.from("transactions").select("*").limit(5);
  if (transError) {
    console.error("Error fetching transactions:", transError);
  } else {
    console.log("Transactions count (limited to 5):", transactions?.length);
  }
}

checkData();
