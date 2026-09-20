const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGh6ZW55YWFhZndrdGpjbnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTgwNjgwOCwiZXhwIjoyMTA1MzgyODA4fQ.fGfCXUnAKGRY5JKpe4B0LI9BtWV5DRTJ8QLlJXSrhZs'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY)

async function run() {
  const { data: diya } = await supabase.from('products').select('id').ilike('name', '%Diya%').single()
  const { data: rangoli } = await supabase.from('products').select('id').eq('slug', 'rangoli-colours').single()
  const { data: hamper } = await supabase.from('products').select('id').eq('slug', 'hampers-small').single()

  const insertImage = async (productId, url, alt) => {
    const { error } = await supabase.from('product_images').insert({
      product_id: productId,
      image_url: url,
      alt_text: alt,
      sort_order: 0
    })
    if (error) console.error('Error inserting image:', error)
    else console.log('Successfully inserted image for product:', productId)
  }

  if (diya) await insertImage(diya.id, '/products/diya.png', 'Handmade Terracotta Diya')
  if (rangoli) await insertImage(rangoli.id, '/products/rangoli.png', 'Vibrant Rangoli Colours')
  if (hamper) await insertImage(hamper.id, '/products/hampers.png', 'Festive Small Hamper')
}

run()
