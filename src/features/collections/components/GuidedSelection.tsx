'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Explore in person',
    description: 'See proportions, operation and finishes in real conditions.',
  },
  {
    number: '02',
    title: 'Compare materials',
    description: 'Review complementary surfaces, colours and details together.',
  },
  {
    number: '03',
    title: 'Specify with guidance',
    description: 'Build a considered selection around your project requirements.',
  },
];

export default function GuidedSelection() {
  return (
    <section className="bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[600px]">
          <Image
            src="/images/difference-lifestyle.jpg"
            alt="First Step showroom material library"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center gap-8 px-6 py-16 sm:px-12 sm:py-20 lg:px-16"
        >
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Guided From The First Step
            </h4>
            <h3 className="font-display mt-3 text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
              Bring every collection together with confidence.
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-light">
              Our showroom team helps you compare finishes, understand
              technical requirements and assemble complementary products
              across brands and rooms.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-6 py-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {step.number}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/showroom"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Visit Showroom
            </Link>
            <Link
              href="https://wa.me/26378230418"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-slate px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-slate-light"
            >
              <Icon icon="mdi:whatsapp" className="h-4 w-4" />
              WhatsApp Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
