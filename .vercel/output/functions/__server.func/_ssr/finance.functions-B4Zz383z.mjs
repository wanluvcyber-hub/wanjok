import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-CdvELTkK.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { p as parseISO, i as isValid, e as endOfMonth } from "../_libs/date-fns.mjs";
import { o as objectType, n as numberType, s as stringType, a as anyType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const supabaseUrl = "https://ymvufesqzawghngkmpop.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdnVmZXNxemF3Z2huZ2ttcG9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNjQ3OTMsImV4cCI6MjA5NjY0MDc5M30.0UPtI-eW2w0NWcjuewwC5UO_D9VgydbS_OV_RtHJIVM";
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
if (!isValidUrl(supabaseUrl)) {
  console.warn("Invalid or missing Supabase environment variables. Database features will not work. Please check your .env file.");
}
const supabase = createClient(
  isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder-url.supabase.co",
  supabaseAnonKey
);
async function getTransactions(limit = 10, startDate, endDate) {
  let query = supabase.from("transactions").select(`
      *,
      categories (
        name,
        icon
      )
    `).eq("user_id", "a1b2c3d4-0000-0000-0000-000000000001").order("transacted_at", { ascending: false });
  if (startDate) query = query.gte("transacted_at", startDate);
  if (endDate) query = query.lte("transacted_at", endDate);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error) throw error;
  return data;
}
async function getBudgets() {
  const { data, error } = await supabase.from("budgets").select("*").eq("user_id", "a1b2c3d4-0000-0000-0000-000000000001");
  if (error) throw error;
  return data;
}
async function getCategorySpending(startDate, endDate) {
  const [transactions, categories, budgets] = await Promise.all([
    getTransactions(1e3, startDate, endDate),
    getCategories(),
    getBudgets()
  ]);
  const spendingMap = /* @__PURE__ */ new Map();
  categories.forEach((cat) => {
    const budget = budgets.find((b) => b.category_id === cat.id);
    spendingMap.set(cat.id, {
      user_id: "a1b2c3d4-0000-0000-0000-000000000001",
      category: cat.name,
      type: cat.type,
      icon: cat.icon,
      spent: 0,
      budget: budget ? budget.amount : null,
      category_id: cat.id
    });
  });
  transactions.forEach((t) => {
    if (t.category_id && spendingMap.has(t.category_id)) {
      const entry = spendingMap.get(t.category_id);
      entry.spent += t.amount;
    }
  });
  return Array.from(spendingMap.values());
}
async function getSummary(startDate, endDate) {
  const transactions = await getTransactions(1e3, startDate, endDate);
  let income = 0;
  let expense = 0;
  let incomeCount = 0;
  let expenseCount = 0;
  transactions.forEach((t) => {
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
async function addTransaction(transaction) {
  const { data, error } = await supabase.from("transactions").insert(transaction).select().single();
  if (error) throw error;
  return data;
}
async function getTransactionById(id) {
  const { data, error } = await supabase.from("transactions").select(`
      *,
      categories (
        name,
        icon
      )
    `).eq("id", id).single();
  if (error) throw error;
  return data;
}
async function updateTransaction(id, transaction) {
  const { data, error } = await supabase.from("transactions").update(transaction).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
async function deleteTransaction(id) {
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;
  return true;
}
async function upsertBudget(budget) {
  const { data, error } = await supabase.from("budgets").upsert(budget, { onConflict: "user_id,category_id" }).select().single();
  if (error) throw error;
  return data;
}
function getBillingCycleRange(monthString, cycleDate) {
  const date = monthString ? parseISO(`${monthString}-01`) : /* @__PURE__ */ new Date();
  if (!isValid(date)) return { startDate: void 0, endDate: void 0 };
  const year = date.getFullYear();
  const month = date.getMonth();
  let startYear = year;
  let startMonth = month;
  let endYear = year;
  let endMonth = month;
  const cutOff = cycleDate && cycleDate >= 1 && cycleDate <= 28 ? cycleDate : 1;
  if (cutOff === 1) {
    const start = new Date(year, month, 1);
    const end = endOfMonth(start);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  } else {
    if (month === 0) {
      startYear = year - 1;
      startMonth = 11;
    } else {
      startMonth = month - 1;
    }
    const start = new Date(startYear, startMonth, cutOff);
    const end = new Date(endYear, endMonth, cutOff - 1);
    end.setHours(23, 59, 59, 999);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    };
  }
}
const getDashboardData_createServerFn_handler = createServerRpc({
  id: "4226c16603af43be9a545baef63240eeee3cb6898461dc7c53bfde2788c6deef",
  name: "getDashboardData",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => getDashboardData.__executeServer(opts));
const getDashboardData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  month: stringType().optional(),
  billingCycleDate: numberType().optional()
}).optional()).handler(getDashboardData_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      startDate,
      endDate
    } = getBillingCycleRange(data?.month, data?.billingCycleDate);
    const [transactions, categories, categorySpending, summary] = await Promise.all([getTransactions(10, startDate, endDate), getCategories(), getCategorySpending(startDate, endDate), getSummary(startDate, endDate)]);
    return {
      transactions,
      categories,
      categorySpending,
      summary
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      transactions: [],
      categories: [],
      categorySpending: [],
      summary: []
    };
  }
});
const getTransactionsList_createServerFn_handler = createServerRpc({
  id: "65ce070768335b90748a17b626370ae35a5ffecb0b64ca939639925b013013ac",
  name: "getTransactionsList",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => getTransactionsList.__executeServer(opts));
const getTransactionsList = createServerFn({
  method: "GET"
}).handler(getTransactionsList_createServerFn_handler, async () => {
  try {
    const transactions = await getTransactions(100);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions list:", error);
    return [];
  }
});
const getCategoriesData_createServerFn_handler = createServerRpc({
  id: "7097bef873e2918adfdeeb1df8dadd0e40dd87e3dd650a51998023b933657d4c",
  name: "getCategoriesData",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => getCategoriesData.__executeServer(opts));
const getCategoriesData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  month: stringType().optional(),
  billingCycleDate: numberType().optional()
}).optional()).handler(getCategoriesData_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      startDate,
      endDate
    } = getBillingCycleRange(data?.month, data?.billingCycleDate);
    const [categories, categorySpending] = await Promise.all([getCategories(), getCategorySpending(startDate, endDate)]);
    return {
      categories,
      categorySpending
    };
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return {
      categories: [],
      categorySpending: []
    };
  }
});
const createTransaction_createServerFn_handler = createServerRpc({
  id: "993e05ba05bf5c74900cbb5475b853f6fab07f7e90dab586cc09502158ba18db",
  name: "createTransaction",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => createTransaction.__executeServer(opts));
const createTransaction = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createTransaction_createServerFn_handler, async ({
  data
}) => {
  return await addTransaction(data);
});
const getEditData_createServerFn_handler = createServerRpc({
  id: "ca38dc0603e69fbc75fc7b4cf11ba6f65933f415938363c0b809c33499e20140",
  name: "getEditData",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => getEditData.__executeServer(opts));
const getEditData = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  id: stringType()
})).handler(getEditData_createServerFn_handler, async ({
  data
}) => {
  try {
    const [transaction, categories] = await Promise.all([getTransactionById(data.id), getCategories()]);
    return {
      transaction,
      categories
    };
  } catch (error) {
    console.error("Error fetching edit data:", error);
    throw error;
  }
});
const updateTransactionFn_createServerFn_handler = createServerRpc({
  id: "cab161165844926289194938bfaa918493ce838242ea299a63b89cecd971cb88",
  name: "updateTransactionFn",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => updateTransactionFn.__executeServer(opts));
const updateTransactionFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType(),
  data: anyType()
})).handler(updateTransactionFn_createServerFn_handler, async ({
  data
}) => {
  return await updateTransaction(data.id, data.data);
});
const deleteTransactionFn_createServerFn_handler = createServerRpc({
  id: "80e3ec7770e18c872ca2ea0fefe4df0a04e60e71b9747169f7d69ba15ad854e3",
  name: "deleteTransactionFn",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => deleteTransactionFn.__executeServer(opts));
const deleteTransactionFn = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType()
})).handler(deleteTransactionFn_createServerFn_handler, async ({
  data
}) => {
  return await deleteTransaction(data.id);
});
const updateBudgetFn_createServerFn_handler = createServerRpc({
  id: "1668ff1b022fc17b476f6f424dd2c24811323a0fd995ebad8488e16503b95cc7",
  name: "updateBudgetFn",
  filename: "src/lib/api/finance.functions.ts"
}, (opts) => updateBudgetFn.__executeServer(opts));
const updateBudgetFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateBudgetFn_createServerFn_handler, async ({
  data
}) => {
  return await upsertBudget(data);
});
export {
  createTransaction_createServerFn_handler,
  deleteTransactionFn_createServerFn_handler,
  getCategoriesData_createServerFn_handler,
  getDashboardData_createServerFn_handler,
  getEditData_createServerFn_handler,
  getTransactionsList_createServerFn_handler,
  updateBudgetFn_createServerFn_handler,
  updateTransactionFn_createServerFn_handler
};
