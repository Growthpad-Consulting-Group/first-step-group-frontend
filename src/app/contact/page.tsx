import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { SITE_URL } from '@/lib/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import ContactForm from '@/features/contact/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Inquiry',
  description:
    'Speak with the First Step showroom team about products, pricing, quotes and showroom visits — by inquiry form, phone or WhatsApp.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

const CONTACT_ROWS = [
  {
    icon: 'solar:phone-linear',
    label: 'Phone / WhatsApp',
    value: '+263 78 230 418',
  },
  {
    icon: 'solar:map-point-linear',
    label: 'Showroom',
    value: 'Borrowdale, Harare',
  },
  {
    icon: 'solar:clock-circle-linear',
    label: 'Hours',
    value: 'Monday–Friday  8:00–17:00\nSaturday  9:00–13:00',
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/images/contact-hero.webp"
            alt="First Step showroom interior"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="container-fluid grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:py-0">
          <div className="flex flex-col lg:py-16 lg:pr-12">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contact First Step
            </h4>
            <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
              Start with the right
              <br />
              conversation.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
              Whether you are selecting one piece, planning a complete interior
              or arranging a showroom visit, tell us what you need and our team
              will guide the next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Start an Enquiry
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
              <Link
                href={getWhatsAppUrl('Hi First Step, I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-cream/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                <Icon icon="mdi:whatsapp" className="h-4 w-4" />
                WhatsApp Us
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-auto pt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Product &nbsp;•&nbsp; Project &nbsp;•&nbsp; Showroom Support
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-md lg:hidden">
            <Image
              src="/images/contact-hero.webp"
              alt="First Step showroom interior"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-fluid grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col rounded-md bg-slate p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Direct Contact &nbsp;•&nbsp; Borrowdale, Harare
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-cream sm:text-3xl">
              Prefer to speak
              <br />
              to us directly?
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dark">
              Talk to our team about product selection, quotations, technical
              questions or showroom appointments.
            </p>

            <ul className="mt-8 flex flex-col divide-y divide-cream/15 border-y border-cream/15">
              {CONTACT_ROWS.map((row) => (
                <li key={row.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
                  <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-gold">
                    <Icon icon={row.icon} className="h-4.5 w-4.5 shrink-0" />
                    {row.label}
                  </span>
                  <span className="whitespace-pre-line text-sm text-cream sm:text-right">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
              <Link
                href="/showroom"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-cream/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                View Showroom
              </Link>
              <Link
                href={getWhatsAppUrl('Hi First Step, I have an enquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                <Icon icon="mdi:whatsapp" className="h-4 w-4" />
                WhatsApp Us
              </Link>
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-24 rounded-md bg-white p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Send an Inquiry
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              How can we help?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-light">
              Share a few details and our team will come back to you during
              showroom hours.
            </p>
            <div className="mt-8">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
