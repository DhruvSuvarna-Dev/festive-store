'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CartItem } from '@/lib/context/CartContext'

export async function processCheckout(formData: FormData, cartItems: CartItem[], totalAmount: number) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  const fullName = formData.get('full_name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const addressLine1 = formData.get('address_line1') as string
  const addressLine2 = formData.get('address_line2') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const postalCode = formData.get('postal_code') as string
  const country = formData.get('country') as string

  const shippingAddress = {
    full_name: fullName,
    phone,
    address_line1: addressLine1,
    address_line2: addressLine2,
    city,
    state,
    postal_code: postalCode,
    country
  }

  // Generate a random order number
  const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

  // Insert Order
  const response = await supabase
    .from('orders')
    .insert({
      user_id: user?.id || null,
      order_number: orderNumber,
      status: 'PENDING_PAYMENT',
      subtotal: totalAmount,
      total_amount: totalAmount,
      delivery_address_snapshot: shippingAddress,
    } as any)
    .select('id')
    .single()

  const orderError = response.error
  const order = response.data as any

  if (orderError || !order) {
    return { error: 'Failed to create order. Please try again.' }
  }

  // Insert Order Items
  const orderItemsData = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    sku: null,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData as any)

  if (itemsError) {
    // Ideally we should rollback the order here in a real production environment or use an RPC
    return { error: 'Failed to add items to order.' }
  }

  // Proceed to success page
  redirect(`/checkout/success?order_id=${order.id}`)
}
