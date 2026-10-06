'use client'

import { motion } from 'framer-motion'
import { MessageCircleQuestion } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading } from './section-heading'
import { FAQS, WA_LINK } from '@/lib/site-config'

export function Faq() {
  return (
    <section id="faq" aria-label="Pertanyaan yang sering diajukan" className="bg-gradient-to-b from-white to-emerald-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Semua yang perlu Anda tahu sebelum mulai mengurus izin bersama kami."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-gray-100 bg-white px-5 shadow-sm transition-colors data-[state=open]:border-emerald-200 data-[state=open]:shadow-md sm:px-6"
              >
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-gray-900 hover:no-underline hover:text-emerald-700 sm:text-lg">
                  <span className="flex items-center gap-3">
                    <MessageCircleQuestion className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Masih ada pertanyaan lain?{' '}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
          >
            Chat tim kami di WhatsApp
          </a>{' '}
          — dijawab manusia, bukan bot, dalam hitungan menit.
        </p>
      </div>
    </section>
  )
}
