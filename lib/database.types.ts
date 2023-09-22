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
          address2: string | null
          created_at: string
          detail: string | null
          id: number
          postal_code: string | null
          user_id: number | null
        }
        Insert: {
          address1: string
          address2?: string | null
          created_at?: string
          detail?: string | null
          id?: number
          postal_code?: string | null
          user_id?: number | null
        }
        Update: {
          address1?: string
          address2?: string | null
          created_at?: string
          detail?: string | null
          id?: number
          postal_code?: string | null
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
          key: string
          name: string | null
          stock: number
          type: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          exclusive?: boolean | null
          id?: number
          key: string
          name?: string | null
          stock?: number
          type?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          exclusive?: boolean | null
          id?: number
          key?: string
          name?: string | null
          stock?: number
          type?: string | null
          value?: number | null
        }
        Relationships: []
      }
      delivery: {
        Row: {
          address_id: number | null
          created_at: string
          id: number
          order_id: number | null
          pkg_code: string | null
          reason: string | null
          status: string | null
        }
        Insert: {
          address_id?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          pkg_code?: string | null
          reason?: string | null
          status?: string | null
        }
        Update: {
          address_id?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          pkg_code?: string | null
          reason?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
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
          show: boolean
          stock: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
          show?: boolean
          stock?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
          price?: number | null
          show?: boolean
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
      decrement_stock: {
        Args: {
          key_param: string
        }
        Returns: undefined
      }
      get_transactions: {
        Args: Record<PropertyKey, never>
        Returns: {
          order_id: number
          order_date: string
          order_key: string
          user_id: number
          user_name: string
          address_id: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
