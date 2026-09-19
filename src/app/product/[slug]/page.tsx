import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Separator } from '@/components/ui/separator'

import { Metadata } from 'next'

export const revalidate = 60 // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single<any>()

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.description || `Buy ${product.name} at Festive Store.`,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, category:categories(name, slug), product_images(image_url, alt_text)')
    .eq('slug', slug)
    .single<any>()

  if (!product || !product.is_active) {
    notFound()
  }

  const images = product.product_images || []
  const primaryImage = images[0]?.image_url
  
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercent = hasDiscount 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const isAvailable = product.status === 'AVAILABLE'

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted border">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
            {!isAvailable && (
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="shadow-md text-sm px-3 py-1">
                  {product.status.replace(/_/g, ' ')}
                </Badge>
              </div>
            )}
          </div>
          {/* Thumbnails (if multiple images) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: any, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-md overflow-hidden bg-muted border cursor-pointer hover:ring-2 ring-primary">
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || `${product.name} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            {product.category && (
              <a href={`/shop/${product.category.slug}`} className="text-sm font-medium text-primary hover:underline uppercase tracking-wider">
                {product.category.name}
              </a>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-4 mb-6">
            <span className="text-3xl font-bold tracking-tight">₹{product.price.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="text-xl text-muted-foreground line-through mb-1">
                  ₹{product.compare_at_price.toFixed(2)}
                </span>
                <Badge variant="destructive" className="mb-2 font-semibold">
                  {discountPercent}% OFF
                </Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            {product.description || 'No description available for this product.'}
          </p>

          <Separator className="my-8" />

          <AddToCartButton product={product} disabled={!isAvailable} />

          <Separator className="my-8" />

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">SKU</span>
              <span className="font-medium">{product.sku || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Availability</span>
              <span className="font-medium">{product.status.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
