'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: '1 Dungarvan West Road, Harare',
    description: 'Borrowdale, Zimbabwe — easy access with parking on site.',
  },
  {
    title: 'Live podcast studio',
    description: 'We host design and lifestyle conversations right from our showroom floor.',
  },
  {
    title: 'Modern & Victorian styles',
    description: 'See both contemporary and classic finishing collections in person.',
  },
];

const DETAILS = [
  { label: 'Address', value: '1 Dungarvan West Rd, Borrowdale, Harare' },
  { label: 'Hours', value: 'Mon – Fri 08:00 – 17:00' },
  { label: 'Phone', value: '1 Dungarvan West Rd Borrowdale, Harare' },
  { label: 'WhatsApp', value: '+27 769 730 167' },
];

export default function Showroom() {
  return (
    <section className="bg-cream">
      <div className="container-fluid grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start pt-14 sm:pt-20 lg:py-28"
        >
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark">
            Our Showroom
          </h4>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Touch it, feel it, live in it.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Our Borrowdale showroom is more than a product floor — it&apos;s an
            experience. See every finish, compare materials, and get expert
            guidance before you decide.
          </p>

          <ul className="mt-6 flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <Icon
                  icon="gg:check-o"
                  className="mt-0.5 h-6 w-6 shrink-0 text-ink"
                />
                <div>
                  <p className="font-bold text-ink">{feature.title}</p>
                  <p className="mt-1 text-sm text-slate">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/enquire"
              className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Book a Visit
            </Link>
            <Link
              href="https://wa.me/27769730167"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-cream-dark"
            >
              WhatsApp Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col pb-14 sm:pb-20 lg:h-full lg:pb-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1">
            <Image
              src="/showroom.webp"
              alt="Inside the First Step showroom"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 bg-ink p-8 sm:grid-cols-2">
            {DETAILS.map((detail) => (
              <div key={detail.label}>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm text-white">{detail.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
