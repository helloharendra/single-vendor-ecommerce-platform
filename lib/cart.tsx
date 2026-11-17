'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type CartItem = { id: string; name: string; price: number; image: string; qty: number; variant?: string }

type CartCtx = {
  items: CartItem[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  update: (id: string, qty: number) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  const add: CartCtx['add'] = (item, qty = 1) => {
    setItems((list) => {
      const found = list.find((i) => i.id === item.id)
      return found ? list.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)) : [...list, { ...item, qty }]
    })
    setOpen(true)
  }
  const update: CartCtx['update'] = (id, qty) =>
    setItems((list) => (qty <= 0 ? list.filter((i) => i.id !== id) : list.map((i) => (i.id === id ? { ...i, qty } : i))))

  const value = useMemo(() => ({
    items, open, setOpen, add, update,
    count: items.reduce((s, i) => s + i.qty, 0),
    subtotal: items.reduce((s, i) => s + i.qty * i.price, 0),
  }), [items, open])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

