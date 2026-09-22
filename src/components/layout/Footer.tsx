import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary">
              FESTIVE STORE
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Bringing joy to your celebrations with premium festive products, gifts, and decorations.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/shop/diwali" className="hover:text-foreground transition-colors">Diwali Collection</Link></li>
              <li><Link href="/shop/christmas" className="hover:text-foreground transition-colors">Christmas Shop</Link></li>
              <li><Link href="/product/hampers-small" className="hover:text-foreground transition-colors">Gift Hampers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-foreground transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              <li><Link href="/account/orders" className="hover:text-foreground transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Festive Store. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span className="sr-only">Social links can go here</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
