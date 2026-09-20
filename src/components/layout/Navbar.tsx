'use client'

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/context/CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-semibold">Home</Link>
                <Link href="/shop" className="text-lg font-semibold">Shop All</Link>
                <Link href="/shop/diwali" className="text-lg">Diwali</Link>
                <Link href="/shop/navratri" className="text-lg">Navratri</Link>
                <Link href="/shop/ganesh-chaturthi" className="text-lg">Ganesh Chaturthi</Link>
                <Link href="/shop/christmas" className="text-lg">Christmas</Link>
                <Link href="/about" className="text-lg font-semibold mt-4">About</Link>
                <Link href="/contact" className="text-lg font-semibold">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">FESTIVE STORE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium ml-4">
            <Link href="/" className="transition-colors hover:text-foreground/80">Home</Link>
            <Link href="/shop" className="transition-colors hover:text-foreground/80">Shop</Link>
            <div className="group relative">
              <span className="cursor-pointer transition-colors hover:text-foreground/80">Categories</span>
              <div className="absolute top-full left-0 hidden group-hover:block w-48 pt-2">
                <div className="bg-popover border text-popover-foreground rounded-md shadow-md p-2 flex flex-col gap-1">
                  <Link href="/shop/diwali" className="px-3 py-2 text-sm hover:bg-muted rounded-sm">Diwali</Link>
                  <Link href="/shop/navratri" className="px-3 py-2 text-sm hover:bg-muted rounded-sm">Navratri</Link>
                  <Link href="/shop/ganesh-chaturthi" className="px-3 py-2 text-sm hover:bg-muted rounded-sm">Ganesh Chaturthi</Link>
                  <Link href="/shop/christmas" className="px-3 py-2 text-sm hover:bg-muted rounded-sm">Christmas</Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <form action="/shop" className="hidden lg:flex items-center relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search products..."
              className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </form>
          
          <Link href="/shop" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "lg:hidden")}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Link>

          <Link href="/account" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
          
          <Link href="/cart" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "relative")}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
