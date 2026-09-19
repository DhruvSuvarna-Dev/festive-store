import { createClient } from '@/lib/supabase/server'
import ProductForm from './ProductForm'

export const revalidate = 0

export default async function NewProductPage() {
  const supabase = await createClient()

  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('sort_order')
    .returns<any[]>()

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground mt-2">Create a new product in the catalog.</p>
      </div>

      <ProductForm categories={categories || []} />
    </div>
  )
}
