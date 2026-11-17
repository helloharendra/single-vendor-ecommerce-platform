'use client'

import Link from 'next/link'
import { Coffee, LayoutDashboard, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function Header() {
  const { count, setOpen } = useCart()
  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/10 bg-[#fbf7f2]/85 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-8">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl text-[#2a1a12]"><Coffee className="h-6 w-6 text-brand-600" /> Urban Roast</Link>
        <nav className="hidden gap-6 text-sm font-medium text-stone-600 md:flex">
          <Link href="/#shop" className="hover:text-stone-900">Shop coffee</Link>
          <Link href="/#subscribe" className="hover:text-stone-900">Subscriptions</Link>
          <Link href="/#story" className="hover:text-stone-900">Our story</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin" className="btn-ghost hidden py-2 text-xs sm:inline-flex"><LayoutDashboard className="h-4 w-4" /> Store admin</Link>
          <button onClick={() => setOpen(true)} className="relative rounded-full p-2.5 text-stone-700 hover:bg-amber-100/60" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
