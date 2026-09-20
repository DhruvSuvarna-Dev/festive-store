const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bGh6ZW55YWFhZndrdGpjbnV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTgwNjgwOCwiZXhwIjoyMTA1MzgyODA4fQ.fGfCXUnAKGRY5JKpe4B0LI9BtWV5DRTJ8QLlJXSrhZs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  SERVICE_ROLE_KEY
)

async function run() {
  console.log('Adding new categories...')
  
  const categoriesToInsert = [
    {
      name: 'Navratri',
      slug: 'navratri',
      description: 'Dandiya, Garba outfits, and Navratri puja essentials.',
      is_active: true
    },
    {
      name: 'Ganesh Chaturthi',
      slug: 'ganesh-chaturthi',
      description: 'Eco-friendly idols and Ganesh Chaturthi decorations.',
      is_active: true
    }
  ]

  for (const cat of categoriesToInsert) {
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', cat.slug)
      .single()

    if (!existing) {
      const { error } = await supabase.from('categories').insert(cat)
      if (error) {
        console.error(`Error creating ${cat.name}:`, error)
      } else {
        console.log(`Created category: ${cat.name}`)
      }
    } else {
      console.log(`Category ${cat.name} already exists.`)
    }
  }
}

run()
