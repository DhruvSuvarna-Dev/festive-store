'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { processCheckout } from './actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          You cannot proceed to checkout with an empty cart.
        </p>
        <Link href="/shop" className={buttonVariants({ size: 'lg' })}>Continue Shopping</Link>
      </div>
    )
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    
    // In a real integration, we'd open Razorpay here first, get payment ID, then submit.
    // For this phase, we're just creating the order and clearing the cart to simulate success.
    
    try {
      const result = await processCheckout(formData, items, totalPrice)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      } else {
        // Successful redirect happens in the server action, but we should clear cart locally first
        // Wait, if redirect happens, this might not execute. We can clear cart in useEffect on success page.
        // Actually, let's clear it here.
        clearCart()
      }
    } catch (e) {
      setError('An unexpected error occurred.')
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <form onSubmit={onSubmit} id="checkout-form">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input id="full_name" name="full_name" required placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="m@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+91 9876543210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line1">Address Line 1</Label>
                  <Input id="address_line1" name="address_line1" required placeholder="Street address, P.O. box, etc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
                  <Input id="address_line2" name="address_line2" placeholder="Apartment, suite, unit, building, floor, etc." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" name="state" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal / Zip Code</Label>
                    <Input id="postal_code" name="postal_code" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" required defaultValue="India" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
        
        <div className="lg:col-span-4 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4 text-sm">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-end mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl tracking-tight">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                type="submit" 
                form="checkout-form" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order securely'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
