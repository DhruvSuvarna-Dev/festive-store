import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/product/ProductCard'

export const dynamic = 'force-dynamic' // Always fetch live products

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q
  const supabase = await createClient()

  let dbQuery = supabase
    .from('products')
    .select('*, product_images(image_url, alt_text)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`)
  }

  const { data: products } = await dbQuery.returns<any[]>()

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {products?.length || 0} products found.
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No products found for your search.</p>
        </div>
      )}
    </div>
  )
}
