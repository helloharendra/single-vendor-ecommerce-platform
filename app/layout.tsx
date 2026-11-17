import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import { ContactProvider, DemoBar } from '@/components/ContactModal'
import { CartProvider } from '@/lib/cart'
import CartDrawer from '@/components/CartDrawer'
import Header from '@/components/Header'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })
const display = DM_Serif_Display({ subsets: ['latin'], variable: '--font-display', weight: '400' })

export const metadata: Metadata = {
  title: 'Urban Roast – Single Vendor E-commerce Demo | Naya Prayog Technologies',
  description: 'Premium single-vendor (D2C) online store UI demo with storefront, subscriptions, cart and store admin. Contact Naya Prayog Technologies for the complete project.',
}

const APP = 'Urban Roast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-[#fbf7f2] font-sans">
        <ContactProvider appName={APP}>
          <CartProvider>
            <DemoBar appName={APP} />
            <Header />
            <main>{children}</main>
            <footer className="mt-24 bg-[#2a1a12] py-12 text-center text-sm text-amber-100/60">
              <p className="font-display text-3xl text-amber-50">Urban Roast</p>
              <p className="mt-2">Small-batch Indian specialty coffee · UI demo by Naya Prayog Technologies · nayaprayog.com</p>
            </footer>
            <CartDrawer freeShippingAt={799} />
          </CartProvider>
        </ContactProvider>
      </body>
    </html>
  )
}
