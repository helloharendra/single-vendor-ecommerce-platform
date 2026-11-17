'use client'

import { Plus, Settings } from 'lucide-react'
import { useContact } from './ContactModal'

export default function AdminActions() {
  const { openContact } = useContact()
  return (
    <div className="flex gap-2">
      <button onClick={() => openContact('Store Settings, Shipping & Payments')} className="btn-ghost"><Settings className="h-4 w-4" /> Settings</button>
      <button onClick={() => openContact('Product & Inventory Management')} className="btn-primary"><Plus className="h-4 w-4" /> Add product</button>
    </div>
  )
}
