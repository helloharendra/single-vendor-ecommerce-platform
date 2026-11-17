'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useContact } from './ContactModal'

const plans = [
  { name: 'Fortnightly', bags: '2 bags / month', price: 1099, save: '15%' },
  { name: 'Monthly', bags: '1 bag / month', price: 579, save: '10%' },
  { name: 'Office pack', bags: '4 bags / month', price: 2049, save: '20%' },
]

export default function Subscribe() {
  const { openContact } = useContact()
  const [sel, setSel] = useState(0)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p, i) => (
        <button key={p.name} onClick={() => setSel(i)} className={`rounded-3xl p-6 text-left transition ${sel === i ? 'bg-amber-50 text-[#2a1a12] shadow-2xl' : 'bg-white/5 text-amber-50 ring-1 ring-white/15 hover:bg-white/10'}`}>
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl">{p.name}</p>
            <span className={`grid h-6 w-6 place-items-center rounded-full ${sel === i ? 'bg-brand-600 text-white' : 'ring-1 ring-white/30'}`}>{sel === i && <Check className="h-4 w-4" />}</span>
          </div>
          <p className="mt-1 text-sm opacity-70">{p.bags}</p>
          <p className="mt-6 text-3xl font-bold">₹{p.price.toLocaleString('en-IN')}<span className="text-sm font-normal opacity-60"> / delivery</span></p>
          <p className="mt-2 text-xs font-semibold text-brand-500">Save {p.save} · pause or skip anytime</p>
        </button>
      ))}
      <button onClick={() => openContact('Subscriptions & Recurring Payments')} className="btn-primary md:col-span-3 py-4 text-base">Start my {plans[sel].name.toLowerCase()} subscription</button>
    </div>
  )
}
