import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Truck, Shield, Heart } from 'lucide-react'
import Image from 'next/image'
import ProductCard from '@/components/product/ProductCard'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
    .limit(4)
    .returns<any[]>()

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, product_images(image_url, alt_text)')
    .eq('is_active', true)
    .eq('status', 'AVAILABLE')
    .limit(4)
    .returns<any[]>()

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Celebrate with Joy & <span className="text-primary">Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our curated collection of premium festive gifts, decorations, and hampers designed to make every occasion memorable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className={cn(buttonVariants({ size: 'lg' }), "w-full sm:w-auto text-lg px-8")}>
              Shop Now
            </Link>
            <Link href="/product/hampers-small" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), "w-full sm:w-auto text-lg px-8")}>
              View Hampers
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Festival */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Shop by Festival</h2>
          <p className="text-muted-foreground">Find the perfect items for your upcoming celebrations.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Link key={category.id} href={`/shop/${category.slug}`} className="group relative block overflow-hidden rounded-xl bg-muted aspect-square">
                {category.image_url ? (
                  <Image src={category.image_url} alt={category.name} fill className="object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                    <span className="text-primary font-medium text-lg">{category.name}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold tracking-wide drop-shadow-md">{category.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">Categories coming soon.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/shop" className="text-primary font-medium hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">Products coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-none shadow-none bg-transparent text-center">
            <CardContent className="pt-6">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Handpicked products ensuring the highest festive standards.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent text-center">
            <CardContent className="pt-6">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Quick and reliable delivery straight to your doorstep.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent text-center">
            <CardContent className="pt-6">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">100% secure payments via Razorpay integration.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent text-center">
            <CardContent className="pt-6">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">Curated to bring out the best emotions of every festival.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make your festival memorable?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who trust us for their festive needs. Explore our collection today.
          </p>
          <Link href="/shop" className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), "text-lg px-8")}>
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
