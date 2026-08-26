'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { Brand } from '@/data/brands';

export default function BrandHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative bg-slate">
      <div className="absolute inset-0">
        <Image src={brand.image} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,20,0.88)_0%,rgba(6,20,20,0.58)_42%,rgba(6,20,20,0.22)_72%,rgba(6,20,20,0)_100%)]" />
      </div>

      <div className="container-fluid relative py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Brands / {brand.name}
          </p>
          <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
            {brand.name}
          </h1>
          <p className="mt-2 text-lg font-semibold uppercase tracking-wide text-gold-light">
            {brand.tagline}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
            {brand.description}
          </p>
          <Link
            href="#collection"
            className="mt-8 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore {brand.name}
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
