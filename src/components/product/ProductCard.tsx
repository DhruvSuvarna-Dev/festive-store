import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ProductImage = {
  image_url: string
  alt_text?: string
}

type Product = {
  id: string
  name: string
  slug: string
  price: number
  compare_at_price?: number | null
  status: string
  product_images?: ProductImage[]
}

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.product_images?.[0]?.image_url
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  
  // Calculate discount percentage if applicable
  const discountPercent = hasDiscount 
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0

  return (
    <Card className="overflow-hidden flex flex-col group h-full">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-muted-foreground text-sm">
            No Image
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {hasDiscount && (
            <Badge variant="destructive" className="font-semibold shadow-sm">
              {discountPercent}% OFF
            </Badge>
          )}
          {product.status !== 'AVAILABLE' && (
            <Badge variant="secondary" className="shadow-sm">
              {product.status.replace(/_/g, ' ')}
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:underline line-clamp-2 font-medium">
          {product.name}
        </Link>
        <div className="mt-auto pt-4 flex items-baseline gap-2">
          <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.compare_at_price?.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {product.status === 'AVAILABLE' ? (
          <Link 
            href={`/product/${product.slug}`}
            className={cn(buttonVariants({ variant: 'default' }), "w-full")}
          >
            View Product
          </Link>
        ) : (
          <button 
            disabled 
            className={cn(buttonVariants({ variant: 'secondary' }), "w-full cursor-not-allowed")}
          >
            Unavailable
          </button>
        )}
      </CardFooter>
    </Card>
  )
}
