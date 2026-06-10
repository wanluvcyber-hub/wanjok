import { createServerFn } from "@tanstack/react-start";
import { 
  getTransactions as fetchTransactions, 
  getCategories as fetchCategories, 
  getCategorySpending as fetchCategorySpending,
  getSummary as fetchSummary,
  addTransaction as insertTransaction,
  getTransactionById as fetchTransactionById,
  updateTransaction as patchTransaction,
  deleteTransaction as removeTransaction,
  upsertBudget as patchBudget,
  getUserProfile as fetchUserProfile
} from "./finance";
import { Database } from "../database.types";
import { z } from "zod";
import { getBillingCycleRange } from "../date-utils";

export const getDashboardData = createServerFn({ method: "GET" })
  .inputValidator(z.object({ 
    month: z.string().optional(),
    billingCycleDate: z.number().optional()
  }).optional())
  .handler(async ({ data }) => {
    try {
      const { startDate, endDate } = getBillingCycleRange(data?.month, data?.billingCycleDate);

      const [transactions, categories, categorySpending, summary, userProfile] = await Promise.all([
        fetchTransactions(10, startDate, endDate),
        fetchCategories(),
        fetchCategorySpending(startDate, endDate), 
        fetchSummary(startDate, endDate),
        fetchUserProfile()
      ]);

      return {
        transactions,
        categories,
        categorySpending,
        summary,
        userProfile
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return {
        transactions: [],
        categories: [],
        categorySpending: [],
        summary: [],
        userProfile: null
      };
    }
  });

export const getTransactionsList = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const transactions = await fetchTransactions(100);
      return transactions;
    } catch (error) {
      console.error("Error fetching transactions list:", error);
      return [];
    }
  });

export const getCategoriesData = createServerFn({ method: "GET" })
  .inputValidator(z.object({ 
    month: z.string().optional(),
    billingCycleDate: z.number().optional()
  }).optional())
  .handler(async ({ data }) => {
    try {
      const { startDate, endDate } = getBillingCycleRange(data?.month, data?.billingCycleDate);

      const [categories, categorySpending] = await Promise.all([
        fetchCategories(),
        fetchCategorySpending(startDate, endDate)
      ]);
      return { categories, categorySpending };
    } catch (error) {
      console.error("Error fetching categories data:", error);
      return { categories: [], categorySpending: [] };
    }
  });

export const createTransaction = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data as Database["public"]["Tables"]["transactions"]["Insert"])
  .handler(async ({ data }) => {
    return await insertTransaction(data);
  });

export const getEditData = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    try {
      const [transaction, categories] = await Promise.all([
        fetchTransactionById(data.id),
        fetchCategories()
      ]);
      return { transaction, categories };
    } catch (error) {
      console.error("Error fetching edit data:", error);
      throw error;
    }
  });

export const updateTransactionFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    data: z.any() 
  }))
  .handler(async ({ data }) => {
    return await patchTransaction(data.id, data.data);
  });

export const deleteTransactionFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await removeTransaction(data.id);
  });

export const updateBudgetFn = createServerFn({ method: "POST" })
  .inputValidator((data: any) => data as Database["public"]["Tables"]["budgets"]["Insert"])
  .handler(async ({ data }) => {
    return await patchBudget(data);
  });
