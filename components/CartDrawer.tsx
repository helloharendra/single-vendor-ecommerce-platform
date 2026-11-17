'use client'

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { inr } from '@/lib/utils'
import { useContact } from './ContactModal'

export default function CartDrawer({ freeShippingAt = 999 }: { freeShippingAt?: number }) {
  const { items, open, setOpen, update, subtotal } = useCart()
  const { openContact } = useContact()
  if (!open) return null
  const remaining = Math.max(0, freeShippingAt - subtotal)

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">Your cart</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="rounded-full p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-slate-100 px-6 py-3">
            <p className="text-xs text-slate-600">{remaining ? <>Add <b>{inr(remaining)}</b> more for free delivery</> : <>🎉 You&apos;ve unlocked <b>free delivery</b></>}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${Math.min(100, (subtotal / freeShippingAt) * 100)}%` }} /></div>
          </div>
        )}

        <div className="flex-1 divide-y divide-slate-100 overflow-y-auto px-6">
          {items.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div><ShoppingBag className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 text-sm text-slate-500">Your cart is empty</p></div>
            </div>
          )}
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.image} alt={i.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <p className="font-semibold leading-snug text-slate-800">{i.name}</p>
                {i.variant && <p className="text-xs text-slate-400">{i.variant}</p>}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full ring-1 ring-slate-200">
                    <button onClick={() => update(i.id, i.qty - 1)} className="p-1.5 text-slate-500">{i.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}</button>
                    <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                    <button onClick={() => update(i.id, i.qty + 1)} className="p-1.5 text-slate-500"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <span className="font-bold text-slate-900">{inr(i.price * i.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 p-6">
          <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span className="text-lg font-bold text-slate-900">{inr(subtotal)}</span></div>
          <p className="mt-1 text-xs text-slate-400">Taxes and delivery calculated at checkout</p>
          <button disabled={!items.length} onClick={() => openContact('Secure Checkout & Payments')} className="btn-primary mt-4 w-full py-3.5 disabled:opacity-50">Checkout</button>
        </div>
      </aside>
    </div>
  )
}
