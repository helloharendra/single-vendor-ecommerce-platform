import Link from 'next/link'
import { Leaf, Package, Timer } from 'lucide-react'
import Shop from '@/components/Shop'
import Subscribe from '@/components/Subscribe'
import { img } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Roasted to order · Shipped in 48 hrs</p>
          <h1 className="mt-5 font-display text-6xl leading-[1.02] text-[#2a1a12] sm:text-7xl">Freshly roasted<br /><em className="text-brand-600">Indian coffee</em>,<br />at your door.</h1>
          <p className="mt-6 max-w-md text-lg text-stone-600">Single-estate beans from Coorg, Chikmagalur and Araku, roasted in small batches every Tuesday and Friday.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#shop" className="btn-primary px-7 py-3.5">Shop coffee</Link>
            <Link href="#subscribe" className="btn-ghost px-7 py-3.5">Subscribe & save 20%</Link>
          </div>
        </div>
        <div className="relative animate-fade-up [animation-delay:150ms]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img('1514432324607-a09d9b4aefdd', 1200)} alt="Latte art" className="aspect-[4/5] w-full rounded-[3rem] object-cover shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5]" />
          <div className="absolute -left-4 bottom-10 rounded-3xl bg-white p-5 shadow-xl sm:-left-10">
            <p className="text-3xl font-bold text-[#2a1a12]">4.9★</p>
            <p className="text-xs text-stone-500">from 12,000+ coffee lovers</p>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-4 sm:grid-cols-3">
        {[[Timer, 'Roasted to order', 'Never sits in a warehouse'], [Leaf, 'Direct from farms', 'Fair prices to growers'], [Package, 'Free shipping', 'On orders above ₹799']].map(([Icon, t, d]) => {
          const I = Icon as typeof Timer
          return (
            <div key={t as string} className="flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-amber-900/5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700"><I className="h-6 w-6" /></span>
              <div><p className="font-semibold text-[#2a1a12]">{t as string}</p><p className="text-sm text-stone-500">{d as string}</p></div>
            </div>
          )
        })}
      </section>

      <section id="shop" className="container-x mt-24 scroll-mt-24">
        <p className="eyebrow">The roastery</p>
        <h2 className="mb-8 mt-2 font-display text-5xl text-[#2a1a12]">Our coffees</h2>
        <Shop />
      </section>

      <section id="subscribe" className="mt-24 scroll-mt-24 bg-[#2a1a12] py-20 text-amber-50">
        <div className="container-x">
          <p className="eyebrow text-brand-400">Never run out</p>
          <h2 className="mb-10 mt-2 font-display text-5xl">Coffee subscriptions</h2>
          <Subscribe />
        </div>
      </section>

      <section id="story" className="container-x mt-24 grid items-center gap-12 lg:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img('1497935586351-b67a49e012bf', 1000)} alt="Our café" loading="lazy" className="aspect-[4/3] w-full rounded-[2.5rem] object-cover" />
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-5xl text-[#2a1a12]">From the hills of Coorg to your cup.</h2>
          <p className="mt-6 leading-relaxed text-stone-600">We started Urban Roast with a single roaster and a simple belief: India grows some of the world&apos;s best coffee, and it deserves to be enjoyed fresh. Today we work directly with 40+ farms.</p>
        </div>
      </section>
    </>
  )
}
