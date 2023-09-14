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
      address: {
        Row: {
          address1: string
          address2: string
          created_at: string
          detail: string | null
          id: number
          postal_code: number | null
          user_id: number | null
        }
        Insert: {
          address1: string
          address2: string
          created_at?: string
          detail?: string | null
          id?: number
          postal_code?: number | null
          user_id?: number | null
        }
        Update: {
          address1?: string
          address2?: string
          created_at?: string
          detail?: string | null
          id?: number
          postal_code?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "address_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      coupons: {
        Row: {
          created_at: string
          exclusive: boolean | null
          id: number
          name: string | null
          type: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          exclusive?: boolean | null
          id?: number
          name?: string | null
          type?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          exclusive?: boolean | null
          id?: number
          name?: string | null
          type?: string | null
          value?: number | null
        }
        Relationships: []
      }
      delivery: {
        Row: {
          created_at: string
          id: number
          order_id: number | null
          pkg_code: string | null
          reason: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: number | null
          pkg_code?: string | null
          reason?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number | null
          pkg_code?: string | null
          reason?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      order_products: {
        Row: {
          count: number | null
          created_at: string
          id: number
          order_id: number | null
          product_id: number | null
        }
        Insert: {
          count?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          product_id?: number | null
        }
        Update: {
          count?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_products_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_products_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          id: number
          key: string | null
          user_id: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          key?: string | null
          user_id?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          key?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
          price: number | null
          stock: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
          stock?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
          stock?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
