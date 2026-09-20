const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function testQuery() {
  const { data: category } = await supabase.from('categories').select('id, name').eq('slug', 'diwali').single()
  console.log('Category:', category)

  const { data: categoryProducts, error } = await supabase
    .from('product_categories')
    .select('product_id, products(*)')
    .eq('category_id', category.id)
    
  console.log('Query result:', categoryProducts)
  console.log('Error:', error)
}
testQuery()
