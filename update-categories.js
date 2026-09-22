const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGh6ZW55YWFhZndrdGpjbnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTgwNjgwOCwiZXhwIjoyMTA1MzgyODA4fQ.fGfCXUnAKGRY5JKpe4B0LI9BtWV5DRTJ8QLlJXSrhZs'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY)

async function run() {
  const categories = [
    { slug: 'diwali', url: '/categories/diwali.png' },
    { slug: 'navratri', url: '/categories/navratri.png' },
    { slug: 'ganesh-chaturthi', url: '/categories/ganesh-chaturthi.png' },
    { slug: 'christmas', url: '/categories/christmas.png' }
  ]

  for (const cat of categories) {
    const { error } = await supabase
      .from('categories')
      .update({ image_url: cat.url })
      .eq('slug', cat.slug)

    if (error) {
      console.error(`Error updating category ${cat.slug}:`, error)
    } else {
      console.log(`Successfully updated image for category: ${cat.slug}`)
    }
  }
}

run()
