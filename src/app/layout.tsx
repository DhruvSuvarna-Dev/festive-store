import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/lib/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Festive Store | Premium Festive Products & Decor',
    template: '%s | Festive Store'
  },
  description: 'Shop premium, handcrafted festive products, diyas, decorations, and gifts. Elevate your celebrations with our exclusive collection.',
  keywords: ['festive', 'decor', 'diyas', 'gifts', 'celebration', 'handcrafted'],
  openGraph: {
    title: 'Festive Store',
    description: 'Premium Festive Products & Decor',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
