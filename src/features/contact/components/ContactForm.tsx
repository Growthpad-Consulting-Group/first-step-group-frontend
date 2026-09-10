'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getWhatsAppUrl } from '@/lib/whatsapp';

/**
 * Inquiry form per spec §7.5.10 (Contact & Inquiry, frame 19). One form serves
 * every enquiry CTA; the `type` query param pre-selects the matching option.
 *
 * TODO: wire submissions to the team destination (email / CRM / WhatsApp API).
 * Until then we surface a WhatsApp hand-off with the message prefilled.
 */

const INQUIRY_TYPES = [
  { value: 'product-pricing', label: 'Product & Pricing' },
  { value: 'request-quote', label: 'Request a Quote' },
  { value: 'showroom-visit', label: 'Showroom Visit' },
  { value: 'general', label: 'General Inquiry' },
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number]['value'];

const inputClass =
  'w-full rounded-md border border-cream-dark bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-gold';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-ink-light">
      {children}
    </span>
  );
}

function normaliseType(value: string | null): InquiryType {
  return INQUIRY_TYPES.some((t) => t.value === value)
    ? (value as InquiryType)
    : 'general';
}

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>(
    normaliseType(searchParams.get('type')),
  );
  const [message, setMessage] = useState('');
  const productContext = searchParams.get('product');
  const [submitted, setSubmitted] = useState(false);

  const typeLabel =
    INQUIRY_TYPES.find((t) => t.value === inquiryType)?.label ?? 'General';

  const whatsappMessage = [
    `Hi First Step, I have a ${typeLabel.toLowerCase()} enquiry.`,
    productContext ? `Product: ${productContext}` : null,
    firstName || lastName ? `Name: ${`${firstName} ${lastName}`.trim()}` : null,
    email ? `Email: ${email}` : null,
    message ? `\n${message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend destination yet — record intent locally and show the hand-off.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-6 text-center">
        <Icon
          icon="solar:check-circle-linear"
          className="mx-auto h-12 w-12 text-gold-dark"
        />
        <h3 className="font-display mt-4 text-xl font-light uppercase tracking-tight text-ink">
          Thank you — we&apos;ll be in touch
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-light">
          Our showroom team typically responds within one business day. For an
          immediate reply, continue the conversation on WhatsApp.
        </p>
        <Link
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xs bg-slate px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-slate-light"
        >
          <Icon icon="mdi:whatsapp" className="h-4 w-4" />
          Continue on WhatsApp
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>First name</FieldLabel>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <FieldLabel>Last name</FieldLabel>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <FieldLabel>Email address</FieldLabel>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block">
          <FieldLabel>Phone number</FieldLabel>
          <input
            type="tel"
            placeholder="+263"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-5 block">
        <FieldLabel>What can we help with?</FieldLabel>
        <select
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value as InquiryType)}
          className={inputClass}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      {productContext && (
        <p className="mt-3 flex items-center gap-2 text-xs text-ink-light">
          <Icon icon="solar:tag-linear" className="h-4 w-4 text-gold-dark" />
          Regarding: {productContext}
        </p>
      )}

      <label className="mt-5 block">
        <FieldLabel>Message / project details</FieldLabel>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>

      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
        >
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
