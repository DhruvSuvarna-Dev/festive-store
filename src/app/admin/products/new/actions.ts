'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  let slug = formData.get('slug') as string
  const category_ids = formData.getAll('category_ids') as string[]
  const sku = formData.get('sku') as string
  const price = parseFloat(formData.get('price') as string)
  const compare_at_price = formData.get('compare_at_price') 
    ? parseFloat(formData.get('compare_at_price') as string) 
    : null
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  if (!name || !slug || !price) {
    return { error: 'Name, Slug, and Price are required.' }
  }

  // Format the slug to be URL friendly
  slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const { data: newProduct, error } = await supabase
    .from('products')
    .insert({
      name,
      slug,
      sku,
      price,
      compare_at_price,
      description,
      status,
      is_active: true
    } as any)
    .select('id')
    .single()

  if (error) {
    return { error: 'Failed to create product. Slug must be unique.' }
  }

  // Insert multiple categories
  if (category_ids && category_ids.length > 0) {
    const categoryMappings = category_ids.map(id => ({
      product_id: (newProduct as any).id,
      category_id: id
    }))
    
    await supabase.from('product_categories').insert(categoryMappings as any)
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  redirect('/admin/products')
}
