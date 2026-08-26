'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    number: '01',
    title: 'Globally Sourced',
    description:
      'Access renowned international bathroom, kitchen and home brands through one trusted local partner.',
  },
  {
    number: '02',
    title: 'Expert Guidance',
    description:
      'Compare materials, finishes and technical requirements with a team that understands complete spaces.',
  },
  {
    number: '03',
    title: 'Delivered Across Zimbabwe',
    description:
      'From selection to delivery, we coordinate the details so your project moves forward with confidence.',
  },
];

export default function Difference() {
  return (
    <section className="bg-cream-dark dark:bg-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto"
        >
          <Image
            src="/images/difference-lifestyle.jpg"
            alt="The First Step showroom"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex max-w-2xl flex-col justify-center px-6 py-14 sm:py-20 lg:px-16"
        >
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold-light">
            The First Step Difference
          </h4>
          <h3 className="font-display mt-3 text-2xl font-light uppercase tracking-tight text-ink dark:text-white sm:text-3xl">
            The world&apos;s finest <br/> brands, at your doorstep.
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-light dark:text-cream-dark">
            We make considered home finishing simpler—from international
            sourcing to confident specification and delivery across Zimbabwe.
          </p>

          <ul className="mt-8 flex flex-col divide-y divide-ink/10 border-b border-ink/10 dark:divide-white/10 dark:border-white/10">
            {FEATURES.map((feature) => (
              <li
                key={feature.number}
                className="group flex gap-14 py-6 transition-transform duration-300 first:pt-0 hover:translate-x-1"
              >
                <span className="text-sm font-semibold text-gold-dark transition-colors dark:text-gold-light">
                  {feature.number}
                </span>
                <div>
                  <p className="font-display text-lg font-light uppercase tracking-tight text-ink/60 transition-colors duration-300 group-hover:text-gold-dark dark:text-white dark:group-hover:text-gold-light">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-light dark:text-cream-dark">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Discover Our Story
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
