'use client'

import { useState } from 'react'
import { createProduct } from './actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function ProductForm({ categories }: { categories: any[] }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(event.currentTarget)
    const result = await createProduct(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Handmade Diya Set" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL friendly name) *</Label>
              <Input id="slug" name="slug" required placeholder="e.g. handmade-diya-set" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Categories</Label>
              {categories.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-md p-4 bg-muted/20">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`cat-${category.id}`}
                        name="category_ids"
                        value={category.id}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No categories found. Create one first.</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
              <Input id="sku" name="sku" placeholder="e.g. DIYA-001" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input id="price" name="price" type="number" step="0.01" required placeholder="999.00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="compare_at_price">Compare at Price (₹)</Label>
              <Input id="compare_at_price" name="compare_at_price" type="number" step="0.01" placeholder="1299.00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select 
              id="status" 
              name="status" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="AVAILABLE"
            >
              <option value="AVAILABLE">Available</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
              <option value="PRE_ORDER">Pre-Order</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Product details..." className="min-h-[120px]" />
          </div>
          
          <div className="flex gap-4 pt-4 border-t">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
            <Link href="/admin/products" className={buttonVariants({ variant: 'outline' })}>
              Cancel
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
