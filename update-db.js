const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// USING THE SECURE SERVICE ROLE KEY TO BYPASS RLS
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGh6ZW55YWFhZndrdGpjbnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTgwNjgwOCwiZXhwIjoyMTA1MzgyODA4fQ.fGfCXUnAKGRY5JKpe4B0LI9BtWV5DRTJ8QLlJXSrhZs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  SERVICE_ROLE_KEY
)

async function run() {
  console.log('Starting DB update with Admin Privileges...')
  
  // 1. Check if Diwali category exists
  let { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'diwali')
    .single()

  if (!category) {
    console.log('Creating Diwali category...')
    const { data: newCat, error } = await supabase
      .from('categories')
      .insert({
        name: 'Diwali',
        slug: 'diwali',
        description: 'Premium Diwali decorations and gifts.',
        is_active: true
      })
      .select('id')
      .single()
      
    if (error) {
      console.error('Error creating category:', error)
      return
    }
    category = newCat
    console.log('Category created with ID:', category.id)
  }

  // 2. Update Diya product
  console.log(`Updating Diya product with category_id: ${category.id}...`)
  
  const { data: product, error: findError } = await supabase
    .from('products')
    .select('id, slug')
    .ilike('name', '%Diya%')
    .limit(1)
    .single()

  if (findError || !product) {
    console.error('Error finding product:', findError || 'Product not found')
    return
  }

  const { error: updateError } = await supabase
    .from('products')
    .update({ category_id: category.id })
    .eq('id', product.id)

  if (updateError) {
    console.error('Error updating product:', updateError)
  } else {
    console.log('Success! Product successfully assigned to Diwali category.')
  }
}

run()
