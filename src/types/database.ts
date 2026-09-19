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
      profiles: {
        Row: {
          id: string
          role: 'CUSTOMER' | 'ADMIN'
          full_name: string | null
          email: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'CUSTOMER' | 'ADMIN'
          full_name?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'CUSTOMER' | 'ADMIN'
          full_name?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string
          address_line_1: string
          address_line_2: string | null
          area: string | null
          city: string
          state: string
          postal_code: string
          landmark: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone: string
          address_line_1: string
          address_line_2?: string | null
          area?: string | null
          city: string
          state: string
          postal_code: string
          landmark?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone?: string
          address_line_1?: string
          address_line_2?: string | null
          area?: string | null
          city?: string
          state?: string
          postal_code?: string
          landmark?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          slug: string
          description: string | null
          price: number
          compare_at_price: number | null
          sku: string | null
          status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'TEMPORARILY_UNAVAILABLE' | 'DRAFT'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          sku?: string | null
          status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'TEMPORARILY_UNAVAILABLE' | 'DRAFT'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          sku?: string | null
          status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'TEMPORARILY_UNAVAILABLE' | 'DRAFT'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: 'PENDING_PAYMENT' | 'PAID' | 'ORDER_CONFIRMED' | 'PROCUREMENT' | 'READY_TO_SHIP' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'PAYMENT_FAILED' | 'CANCELLED' | 'REFUNDED' | 'RETURN_REQUESTED' | 'RETURNED'
          subtotal: number
          delivery_fee: number
          discount: number
          total_amount: number
          delivery_address_snapshot: Json
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number: string
          status?: 'PENDING_PAYMENT' | 'PAID' | 'ORDER_CONFIRMED' | 'PROCUREMENT' | 'READY_TO_SHIP' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'PAYMENT_FAILED' | 'CANCELLED' | 'REFUNDED' | 'RETURN_REQUESTED' | 'RETURNED'
          subtotal: number
          delivery_fee?: number
          discount?: number
          total_amount: number
          delivery_address_snapshot: Json
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          status?: 'PENDING_PAYMENT' | 'PAID' | 'ORDER_CONFIRMED' | 'PROCUREMENT' | 'READY_TO_SHIP' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'PAYMENT_FAILED' | 'CANCELLED' | 'REFUNDED' | 'RETURN_REQUESTED' | 'RETURNED'
          subtotal?: number
          delivery_fee?: number
          discount?: number
          total_amount?: number
          delivery_address_snapshot?: Json
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string
          sku: string | null
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name: string
          sku?: string | null
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string
          sku?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          amount: number
          currency: string
          status: 'CREATED' | 'SUCCESS' | 'FAILED'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          amount: number
          currency?: string
          status?: 'CREATED' | 'SUCCESS' | 'FAILED'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          amount?: number
          currency?: string
          status?: 'CREATED' | 'SUCCESS' | 'FAILED'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
