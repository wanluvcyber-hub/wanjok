
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach(line => {
  const [key, value] = line.split("=");
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase
    .from("category_spending")
    .select("*"); // Just a dummy query

  // To get the view definition, we query Postgres through a special approach if possible,
  // or we can just fetch the raw SQL from the rest API if it exposes it, but it usually doesn't.
  // Actually, we can use the Supabase JS client to query a custom Postgres function, but we don't have one.
  // Instead, let's just observe the data for income categories that have known transactions.
  
  // Let's get ALL transactions for user a1b2...
  const { data: trans } = await supabase
    .from("transactions")
    .select("*, categories(name, icon)")
    .eq("user_id", "a1b2c3d4-0000-0000-0000-000000000001");
    
  console.log("All Transactions (User a1b2...):", JSON.stringify(trans, null, 2));

  // Let's check spending again
  const { data: spending } = await supabase
    .from("category_spending")
    .select("*")
    .eq("user_id", "a1b2c3d4-0000-0000-0000-000000000001");
  console.log("Category Spending (User a1b2...):", JSON.stringify(spending, null, 2));
}

check();
