import { supabase } from "../supabase";
import { Database } from "../database.types";

export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategorySpending = Database["public"]["Views"]["category_spending"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];

const DEFAULT_USER_ID = "a1b2c3d4-0000-0000-0000-000000000001";

// Simple request-level cache (simulated since this runs per server function execution)
let cachedUser: User | null = null;

export async function getUserProfile(userId = DEFAULT_USER_ID) {
  if (cachedUser) return cachedUser;

  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  // Fallback to the most recent user if default not found
  if (!data && !error) {
    const { data: latestUser } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    data = latestUser;
  }

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  
  cachedUser = data;
  return data;
}

export async function getTransactions(limit = 10, startDate?: string, endDate?: string) {
  const user = await getUserProfile();
  if (!user) return [];

  let query = supabase
    .from("transactions")
    .select(`
      *,
      categories (
        name,
        icon
      )
    `)
    .eq("user_id", user.id)
    .order("transacted_at", { ascending: false });
    
  if (startDate) query = query.gte("transacted_at", startDate);
  if (endDate) query = query.lte("transacted_at", endDate);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}

export async function getBudgets() {
  const user = await getUserProfile();
  if (!user) return [];

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
  return data;
}

export async function getCategorySpending(startDate?: string, endDate?: string) {
  // To avoid circular or redundant calls, we fetch dependencies directly
  const [user, categories] = await Promise.all([
    getUserProfile(),
    getCategories()
  ]);

  if (!user) return [];
  const userId = user.id;

  const [transactions, budgets] = await Promise.all([
    getTransactions(1000, startDate, endDate),
    getBudgets()
  ]);

  const spendingMap = new Map<string, any>();

  categories.forEach(cat => {
    const budget = budgets.find(b => b.category_id === cat.id);
    spendingMap.set(cat.id, {
      user_id: userId,
      category: cat.name,
      type: cat.type,
      icon: cat.icon,
      spent: 0,
      budget: budget ? budget.amount : null,
      category_id: cat.id
    });
  });

  transactions.forEach(t => {
    if (t.category_id && spendingMap.has(t.category_id)) {
      const entry = spendingMap.get(t.category_id);
      entry.spent += t.amount;
    }
  });

  return Array.from(spendingMap.values());
}

export async function getSummary(startDate?: string, endDate?: string) {
  const transactions = await getTransactions(1000, startDate, endDate);
  
  let income = 0;
  let expense = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  transactions.forEach(t => {
    if (t.type === "รายรับ") {
      income += t.amount;
      incomeCount++;
    } else if (t.type === "รายจ่าย") {
      expense += t.amount;
      expenseCount++;
    }
  });

  return [
    { type: "รายรับ", total: income, count: incomeCount },
    { type: "รายจ่าย", total: expense, count: expenseCount }
  ];
}

export async function addTransaction(transaction: Database["public"]["Tables"]["transactions"]["Insert"]) {
  const { data, error } = await supabase
    .from("transactions")
    .insert(transaction)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTransactionById(id: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        name,
        icon
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTransaction(id: string, transaction: Database["public"]["Tables"]["transactions"]["Update"]) {
  const { data, error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function upsertBudget(budget: Database["public"]["Tables"]["budgets"]["Insert"]) {
  const { data, error } = await supabase
    .from("budgets")
    .upsert(budget, { onConflict: 'user_id,category_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}
