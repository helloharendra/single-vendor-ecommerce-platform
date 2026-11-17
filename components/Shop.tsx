'use client'

import { useState } from 'react'
import { Plus, Star } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { inr } from '@/lib/utils'
import { products } from '@/lib/data'

const grinds = ['Whole bean', 'French press', 'Filter', 'Espresso']

export default function Shop() {
  const { add } = useCart()
  const [roast, setRoast] = useState('All')
  const [grind, setGrind] = useState(grinds[0])
  const list = products.filter((p) => roast === 'All' || p.roast.startsWith(roast))

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['All', 'Light', 'Medium', 'Dark'].map((r) => (
            <button key={r} onClick={() => setRoast(r)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${roast === r ? 'bg-[#2a1a12] text-amber-50' : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-stone-300'}`}>{r} roast</button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-stone-500">Grind
          <select value={grind} onChange={(e) => setGrind(e.target.value)} className="input w-auto rounded-full py-2">{grinds.map((g) => <option key={g}>{g}</option>)}</select>
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.id} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-amber-900/5 transition hover:-translate-y-1 hover:shadow-xl animate-fade-up">
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              {p.tag && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#2a1a12] backdrop-blur">{p.tag}</span>}
              <span className="absolute right-4 top-4 rounded-full bg-[#2a1a12]/80 px-3 py-1 text-xs font-semibold text-amber-50 backdrop-blur">{p.roast}</span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-display text-2xl text-[#2a1a12]">{p.name}</h3><p className="text-xs text-stone-500">{p.origin} · {p.weight}</p></div>
                <span className="flex items-center gap-1 text-sm font-semibold text-stone-700"><Star className="h-4 w-4 fill-brand-400 text-brand-400" />{p.rating}</span>
              </div>
              <p className="mt-3 text-sm text-stone-600">{p.notes}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold text-[#2a1a12]">{inr(p.price)}</span>
                <button onClick={() => add({ id: `${p.id}-${grind}`, name: p.name, price: p.price, image: p.image, variant: `${p.weight} · ${grind}` })} className="btn-primary py-2"><Plus className="h-4 w-4" /> Add</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
