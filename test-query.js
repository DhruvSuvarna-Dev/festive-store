const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(name, slug), product_images(image_url, alt_text)')

  console.log('PRODUCTS:', JSON.stringify(data, null, 2))
  console.log('ERROR:', error)
}

test()
