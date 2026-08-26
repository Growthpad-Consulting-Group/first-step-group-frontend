'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Global brands, local access.',
    description:
      'Authorised stockists of Victoria + Albert, Kohler, Grohe, SMEG & more — right here in Harare.',
  },
  {
    title: 'Modern & Victorian styles.',
    description:
      'Both contemporary and classic finishing collections available in person.',
  },
  {
    title: 'Delivered anywhere in Zimbabwe.',
    description:
      'Harare, Bulawayo, Mutare — we arrange secure delivery to your door.',
  },
];

export default function Difference() {
  return (
    <section className="relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-white lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-1/2"
      >
        <Image
          src="/first-step-difference.webp"
          alt="The First Step showroom"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-start justify-center px-6 py-10 sm:py-14 lg:py-16"
        >
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold-light">
            The First Step Difference
          </h4>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
            The world&apos;s finest brands, at your doorstep.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-slate dark:text-zinc-400">
            We bring globally acclaimed home finishing brands directly to Zimbabwe
            with personal guidance at our Borrowdale showroom and nationwide
            delivery included.
          </p>

          <ul className="mt-6 flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <Icon
                  icon="gg:check-o"
                  className="mt-0.5 h-6 w-6 shrink-0 text-ink"
                />
                <div>
                  <p className="font-bold text-ink dark:text-white">{feature.title}</p>
                  <p className="mt-1 text-sm text-slate dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center rounded-md bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Explore Collection
            </Link>
            <Link
              href="/showroom"
              className="inline-flex items-center rounded-md border border-black/10 bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-zinc-100 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
            >
              Visit Showroom
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
