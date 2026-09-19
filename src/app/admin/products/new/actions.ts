'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  let slug = formData.get('slug') as string
  const category_id = formData.get('category_id') as string
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

  const { error } = await supabase
    .from('products')
    .insert({
      name,
      slug,
      category_id: category_id || null,
      sku,
      price,
      compare_at_price,
      description,
      status,
      is_active: true
    } as any)

  if (error) {
    // Basic uniqueness error checking
    if (error.code === '23505') {
      return { error: 'A product with this slug or SKU already exists.' }
    }
    return { error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  redirect('/admin/products')
}
