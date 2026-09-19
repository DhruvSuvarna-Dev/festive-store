'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  return (
    <Card className="max-w-md mx-auto text-center border-none shadow-none bg-transparent">
      <CardContent className="pt-6">
        <div className="mx-auto bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        {orderId && (
          <div className="bg-muted p-4 rounded-md mb-8">
            <p className="text-sm text-muted-foreground mb-1">Order Reference ID:</p>
            <p className="font-mono font-medium text-foreground">{orderId}</p>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <Link href="/account/orders" className={buttonVariants({ size: 'lg' })}>Track Order</Link>
          <Link href="/shop" className={buttonVariants({ variant: 'outline', size: 'lg' })}>Continue Shopping</Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center">
      <Suspense fallback={<div className="text-center text-muted-foreground">Loading order details...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
