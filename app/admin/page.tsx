import type { Metadata } from 'next'
import { IndianRupee, Package, Repeat, Users } from 'lucide-react'
import AdminActions from '@/components/AdminActions'
import { adminStats, products } from '@/lib/data'
import { inr } from '@/lib/utils'

export const metadata: Metadata = { title: 'Store admin · Urban Roast demo' }

const tone: Record<string, string> = {
  Shipped: 'bg-sky-50 text-sky-700', Processing: 'bg-amber-50 text-amber-700', Delivered: 'bg-emerald-50 text-emerald-700', Cancelled: 'bg-rose-50 text-rose-700',
}
const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

export default function Admin() {
  const max = Math.max(...adminStats.revenue)
  const kpis = [
    { label: 'Revenue (Nov)', value: '₹9.2L', delta: '+18%', icon: IndianRupee },
    { label: 'Orders', value: '1,486', delta: '+12%', icon: Package },
    { label: 'Active subscriptions', value: '642', delta: '+9%', icon: Repeat },
    { label: 'Customers', value: '12,410', delta: '+6%', icon: Users },
  ]
  return (
    <div className="container-x py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Store admin</p><h1 className="mt-2 font-display text-4xl text-[#2a1a12]">Good evening, Urban Roast ☕</h1></div>
        <AdminActions />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="rounded-3xl bg-white p-6 ring-1 ring-amber-900/5">
            <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Icon className="h-5 w-5" /></span><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{delta}</span></div>
            <p className="mt-4 text-sm text-stone-500">{label}</p>
            <p className="text-2xl font-bold text-[#2a1a12]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-amber-900/5 lg:col-span-2">
          <p className="font-semibold text-[#2a1a12]">Monthly revenue</p>
          <p className="text-xs text-stone-500">₹ thousand, last 12 months</p>
          <div className="mt-6 flex h-56 items-end gap-2">
            {adminStats.revenue.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-semibold text-stone-400 opacity-0 transition group-hover:opacity-100">{v}k</span>
                <div className={`w-full rounded-t-xl transition-all ${i === adminStats.revenue.length - 1 ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-amber-100 group-hover:bg-brand-300'}`} style={{ height: `${(v / max) * 100}%` }} />
                <span className="text-[10px] text-stone-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-amber-900/5">
          <p className="font-semibold text-[#2a1a12]">Stock levels</p>
          <ul className="mt-4 space-y-4">
            {products.slice(0, 5).map((p, i) => {
              const stock = [82, 46, 12, 64, 30][i]
              return (
                <li key={p.id}>
                  <div className="flex justify-between text-sm"><span className="text-stone-700">{p.name}</span><span className={stock < 20 ? 'font-semibold text-rose-600' : 'text-stone-500'}>{stock} bags</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-amber-50"><div className={`h-full rounded-full ${stock < 20 ? 'bg-rose-500' : 'bg-brand-500'}`} style={{ width: `${stock}%` }} /></div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl bg-white ring-1 ring-amber-900/5">
        <p className="border-b border-stone-100 px-6 py-4 font-semibold text-[#2a1a12]">Recent orders</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-wide text-stone-400">{['Order', 'Customer', 'Items', 'City', 'Status', 'Amount'].map((h) => <th key={h} className="px-6 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-stone-100">
              {adminStats.orders.map((o) => (
                <tr key={o.id} className="hover:bg-amber-50/40">
                  <td className="px-6 py-4 font-semibold text-[#2a1a12]">{o.id}</td>
                  <td className="px-6 py-4 text-stone-600">{o.customer}</td>
                  <td className="px-6 py-4 text-stone-600">{o.items}</td>
                  <td className="px-6 py-4 text-stone-600">{o.city}</td>
                  <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone[o.status]}`}>{o.status}</span></td>
                  <td className="px-6 py-4 font-semibold text-[#2a1a12]">{inr(o.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
