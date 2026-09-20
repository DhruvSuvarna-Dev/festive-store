const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function run() {
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, product_images(image_url, alt_text)')
    .eq('is_active', true)
    .eq('status', 'AVAILABLE')
    .limit(4)
    
  console.log(JSON.stringify(featuredProducts, null, 2))
}
run()
