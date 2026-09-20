import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/product/ProductCard'
import { notFound } from 'next/navigation'

export const revalidate = 60 // Revalidate every minute

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const resolvedParams = await params
  const categorySlug = resolvedParams.category
  const supabase = await createClient()

  // Find the category
  const { data: category } = await supabase
    .from('categories')
    .select('id, name, description')
    .eq('slug', categorySlug)
    .single<any>()

  if (!category) {
    notFound()
  }

  // Fetch products for this category using the joining table
  const { data: categoryProducts } = await supabase
    .from('product_categories')
    .select('product_id, products(*, product_images(image_url, alt_text))')
    .eq('category_id', category.id)
    .returns<any[]>()

  // Extract products and filter by is_active
  const products = categoryProducts
    ?.map(cp => cp.products)
    .filter(p => p && p.is_active) || []

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-4">
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
          <p className="text-lg text-muted-foreground">No products available in this category yet.</p>
        </div>
      )}
    </div>
  )
}
