'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/lib/context/CartContext'

export default function AddToCartButton({ 
  product,
  disabled
}: { 
  product: any
  disabled?: boolean
}) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image_url: product.product_images?.[0]?.image_url,
      quantity,
    })
    toast.success(`Added ${quantity} x ${product.name} to cart.`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="font-medium text-sm">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={disabled || quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="w-12 text-center text-sm font-medium">
            {quantity}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(quantity + 1)}
            disabled={disabled}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Button 
          size="lg" 
          className="flex-1"
          onClick={handleAdd}
          disabled={disabled}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button 
          size="lg" 
          variant="secondary"
          className="flex-1"
          disabled={disabled}
          onClick={() => {
            handleAdd()
            router.push('/checkout')
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}
