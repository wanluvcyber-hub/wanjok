export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          line_user_id: string
          display_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          line_user_id: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          line_user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          type: string
          icon: string | null
          is_default: boolean
        }
        Insert: {
          id?: string
          name: string
          type: string
          icon?: string | null
          is_default?: boolean
        }
        Update: {
          id?: string
          name?: string
          type?: string
          icon?: string | null
          is_default?: boolean
        }
      }
      slips: {
        Row: {
          id: string
          user_id: string
          image_url: string | null
          raw_text: string | null
          parsed_json: Json | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url?: string | null
          raw_text?: string | null
          parsed_json?: Json | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string | null
          raw_text?: string | null
          parsed_json?: Json | null
          status?: string
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          slip_id: string | null
          amount: number
          type: string
          note: string | null
          transacted_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          slip_id?: string | null
          amount: number
          type: string
          note?: string | null
          transacted_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          slip_id?: string | null
          amount?: number
          type?: string
          note?: string | null
          transacted_at?: string
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string
          amount: number
          period: string
          start_date: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          amount: number
          period?: string
          start_date?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          amount?: number
          period?: string
          start_date?: string
        }
      }
    }
    Views: {
      monthly_summary: {
        Row: {
          user_id: string | null
          month: string | null
          type: string | null
          total: number | null
          count: number | null
        }
      }
      category_spending: {
        Row: {
          user_id: string | null
          category: string | null
          type: string | null
          icon: string | null
          spent: number | null
          budget: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
