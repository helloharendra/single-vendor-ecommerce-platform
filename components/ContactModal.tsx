'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { CheckCircle2, Globe, Lock, Mail, MessageCircle, Phone, X } from 'lucide-react'
import { contact } from '@/lib/contact'

type Ctx = { openContact: (feature?: string) => void }
const ContactContext = createContext<Ctx>({ openContact: () => {} })
export const useContact = () => useContext(ContactContext)

/**
 * This repository is a UI preview. Any premium action (checkout, login,
 * admin, etc.) calls openContact('Feature') to show this dialog.
 */
export function ContactProvider({ appName, children }: { appName: string; children: ReactNode }) {
  const [feature, setFeature] = useState<string | null>(null)
  const openContact = useCallback((name?: string) => setFeature(name || appName), [appName])
  const close = () => setFeature(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const msg = encodeURIComponent(`Hi Naya Prayog, I saw the ${appName} demo on GitHub and I'm interested in the complete project.`)

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      {feature && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={close} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in">
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-7 pb-8 pt-7 text-white">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Lock className="h-3.5 w-3.5" /> Available in the full version
              </span>
              <h3 className="relative mt-4 text-2xl font-bold leading-tight">{feature}</h3>
              <p className="relative mt-2 text-sm text-white/85">
                This repository is a UI preview of {appName}. The complete platform with backend, admin panel, payments and mobile apps is available from Naya Prayog Technologies.
              </p>
            </div>
            <div className="px-7 py-6">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {contact.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <a href={`https://wa.me/${contact.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer" className="btn bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
                <a href={`mailto:${contact.email}?subject=${encodeURIComponent(appName + ' – complete project')}`} className="btn-primary">
                  <Mail className="h-4 w-4" /> Email us
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <a href={contact.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand-600"><Globe className="h-3.5 w-3.5" /> nayaprayog.com</a>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-brand-600"><Phone className="h-3.5 w-3.5" /> {contact.phone}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  )
}

/** Small banner shown at the top of every page so visitors know it's a demo. */
export function DemoBar({ appName }: { appName: string }) {
  const { openContact } = useContact()
  return (
    <div className="bg-slate-950 text-xs text-slate-300">
      <div className="container-x flex h-9 items-center justify-center gap-2 text-center">
        <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 sm:inline-block" />
        <span className="truncate">You&apos;re viewing a UI demo of {appName}.</span>
        <button onClick={() => openContact(`Complete ${appName}`)} className="shrink-0 font-semibold text-white underline-offset-4 hover:underline">
          Get the complete project →
        </button>
      </div>
    </div>
  )
}
