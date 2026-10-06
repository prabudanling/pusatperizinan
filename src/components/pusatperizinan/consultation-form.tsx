'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send, ShieldCheck, Timer, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { SERVICES } from '@/lib/site-config'

const BUSINESS_TYPES = [
  'UMKM / Usaha Perorangan',
  'Perdagangan / Retail',
  'Makanan & Minuman (F&B)',
  'Jasa & Profesional',
  'Konstruksi',
  'Kesehatan',
  'Manufaktur',
  'Investasi Asing (PMA)',
  'Lainnya',
]

interface FormState {
  name: string
  phone: string
  email: string
  businessType: string
  serviceType: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  businessType: '',
  serviceType: '',
  message: '',
}

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { toast } = useToast()

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setDone(true)
        toast({
          title: 'Berhasil dikirim! 🎉',
          description: data.message,
        })
      } else {
        toast({
          title: 'Gagal mengirim',
          description: data.error ?? 'Silakan periksa kembali data Anda.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Koneksi bermasalah',
        description: 'Periksa koneksi internet Anda lalu coba lagi.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="konsultasi" aria-label="Formulir konsultasi gratis" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-emerald-950 shadow-2xl shadow-emerald-200">
          <div className="grid lg:grid-cols-5">
            {/* Panel teks */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
              className="relative flex flex-col justify-center p-8 text-white sm:p-12 lg:col-span-2"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:24px_24px]"
              />
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/60 px-4 py-1.5 text-sm font-semibold text-emerald-300">
                <Timer className="h-4 w-4" aria-hidden="true" />
                Respon &lt; 15 menit (jam kerja)
              </span>
              <h2 className="relative mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Mulai Gratis — Konsultasi Dulu, Baru Putuskan
              </h2>
              <p className="relative mt-4 text-base leading-relaxed text-emerald-100/80">
                Isi formulir singkat ini. Ahli perizinan kami akan menganalisis kebutuhan usaha Anda dan
                mengirim rekomendasi jalur tercepat + estimasi biaya. Tanpa biaya, tanpa komitmen.
              </p>

              <ul className="relative mt-8 space-y-4">
                {[
                  { icon: Wallet, text: 'Estimasi biaya & waktu yang jujur sejak awal' },
                  { icon: ShieldCheck, text: 'Data Anda dijamin kerahasiaannya' },
                  { icon: CheckCircle2, text: 'Checklist dokumen personal langsung dikirim' },
                ].map((li) => (
                  <li key={li.text} className="flex items-start gap-3 text-sm text-emerald-50/90">
                    <li.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
                    {li.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Panel form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-white p-8 sm:p-12 lg:col-span-3"
            >
              {done ? (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    <CheckCircle2 className="h-20 w-20 text-emerald-600" aria-hidden="true" />
                  </motion.div>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900">Permintaan Terkirim! 🎉</h3>
                  <p className="mt-3 max-w-md text-gray-600">
                    Terima kasih, <strong>{form.name}</strong>. Tim Pusat Perizinan akan menghubungi Anda
                    di WhatsApp <strong>{form.phone}</strong> dalam <strong>15 menit</strong> pada jam kerja.
                  </p>
                  <Button
                    onClick={() => {
                      setForm(INITIAL)
                      setDone(false)
                    }}
                    variant="outline"
                    className="mt-8 rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Kirim permintaan lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        minLength={2}
                        placeholder="cth. Budi Santoso"
                        value={form.name}
                        onChange={(e) => set('name')(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="cth. 0812 3456 7890"
                        value={form.phone}
                        onChange={(e) => set('phone')(e.target.value)}
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (opsional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="cth. budi@usahaku.id"
                      value={form.email}
                      onChange={(e) => set('email')(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Jenis Usaha *</Label>
                      <Select required value={form.businessType} onValueChange={set('businessType')}>
                        <SelectTrigger id="businessType" className="h-12 w-full rounded-xl border-gray-200 focus:ring-emerald-500">
                          <SelectValue placeholder="Pilih jenis usaha" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUSINESS_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">Layanan yang Dibutuhkan *</Label>
                      <Select required value={form.serviceType} onValueChange={set('serviceType')}>
                        <SelectTrigger id="serviceType" className="h-12 w-full rounded-xl border-gray-200 focus:ring-emerald-500">
                          <SelectValue placeholder="Pilih layanan" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((s) => (
                            <SelectItem key={s.slug} value={s.title}>
                              {s.title}
                            </SelectItem>
                          ))}
                          <SelectItem value="Belum tahu / konsultasi dulu">
                            Belum tahu / konsultasi dulu
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Ceritakan rencana usaha Anda (opsional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="cth. Saya mau buka cabang kedai kopi di Bandung, perlu izin apa saja?"
                      value={form.message}
                      onChange={(e) => set('message')(e.target.value)}
                      className="resize-none rounded-xl border-gray-200 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="h-14 w-full rounded-full bg-emerald-600 text-base font-bold shadow-lg shadow-emerald-200 transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        Mengirim…
                      </>
                    ) : (
                      <>
                        Kirim &amp; Dapatkan Konsultasi Gratis
                        <Send className="ml-2 h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    Dengan mengirim formulir, Anda menyetujui kami menghubungi via WhatsApp/telepon.
                    Data Anda aman & tidak dibagikan ke pihak ketiga.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
