const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function run() {
  console.log('Starting DB update...')
  
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
  }

  // 2. Update Diya product
  console.log(`Updating Diya product with category_id: ${category.id}...`)
  
  // We look for the product where slug is 'handmade-diyas' or name is 'Diya'
  // Earlier we formatted the slug to 'handmade-diyas' if they updated it, or maybe it's still 'handmade diyas'
  const { data: product, error: findError } = await supabase
    .from('products')
    .select('id, slug')
    .ilike('name', 'Diya')
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
    console.log('Success! Product updated.')
  }
}

run()
