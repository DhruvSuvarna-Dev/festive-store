const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGh6ZW55YWFhZndrdGpjbnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTgwNjgwOCwiZXhwIjoyMTA1MzgyODA4fQ.fGfCXUnAKGRY5JKpe4B0LI9BtWV5DRTJ8QLlJXSrhZs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY)

async function run() {
  console.log('Fetching categories...')
  const { data: categories } = await supabase.from('categories').select('id, slug')
  
  const getCatId = (slug) => categories.find(c => c.slug === slug)?.id

  const catIds = {
    diwali: getCatId('diwali'),
    navratri: getCatId('navratri'),
    ganesh: getCatId('ganesh-chaturthi'),
    christmas: getCatId('christmas')
  }

  // Create Christmas category if it doesn't exist
  if (!catIds.christmas) {
    const { data: newXmas } = await supabase.from('categories')
      .insert({ name: 'Christmas', slug: 'christmas', is_active: true })
      .select('id').single()
    catIds.christmas = newXmas.id
  }

  const commonCategories = [catIds.diwali, catIds.navratri, catIds.ganesh].filter(Boolean)

  console.log('Inserting products...')
  
  // 1. Rangoli Colours
  const { data: rangoli } = await supabase.from('products').upsert({
    name: 'Rangoli Colours',
    slug: 'rangoli-colours',
    price: 99,
    compare_at_price: 149,
    status: 'AVAILABLE',
    is_active: true
  }, { onConflict: 'slug' }).select('id').single()

  // 2. Hampers (small)
  const { data: hamper } = await supabase.from('products').upsert({
    name: 'Hampers (small)',
    slug: 'hampers-small',
    price: 299,
    compare_at_price: 399,
    status: 'AVAILABLE',
    is_active: true
  }, { onConflict: 'slug' }).select('id').single()

  // 3. Find Diya
  const { data: diya } = await supabase.from('products').select('id').ilike('name', '%Diya%').single()

  console.log('Mapping products to categories...')

  const mappings = []

  // Add Diya to common
  if (diya) {
    commonCategories.forEach(cid => mappings.push({ product_id: diya.id, category_id: cid }))
  }
  
  // Add Rangoli to common
  if (rangoli) {
    commonCategories.forEach(cid => mappings.push({ product_id: rangoli.id, category_id: cid }))
  }

  // Add Hamper to common + Christmas
  if (hamper) {
    commonCategories.forEach(cid => mappings.push({ product_id: hamper.id, category_id: cid }))
    if (catIds.christmas) {
      mappings.push({ product_id: hamper.id, category_id: catIds.christmas })
    }
  }

  // Upsert mappings
  const { error } = await supabase.from('product_categories').upsert(mappings, { onConflict: 'product_id,category_id' })
  
  if (error) {
    console.error('Error linking categories:', error)
  } else {
    console.log('Success! All products have been mapped to their multiple categories.')
  }
}

run()
