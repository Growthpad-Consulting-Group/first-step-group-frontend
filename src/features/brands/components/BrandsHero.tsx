'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function BrandsHero() {
  return (
    <section className="bg-slate">
      <div className="container-fluid grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block h-[3px] w-13 bg-gold" />
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            All Brands
          </h4>
          <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
            The world&apos;s most respected names, brought closer.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
            Explore globally recognised bathroom, kitchen, surface and home-technology
            brands—curated through one trusted local destination.
          </p>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
            Bathroom · Kitchen · Surfaces · Home Technology
          </p>
          <Link
            href="#signature-houses"
            className="mt-8 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore Brands
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative col-span-2 aspect-16/10 overflow-hidden rounded-md">
            <Image
              src="/images/showroom.jpg"
              alt="First Step showroom"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-md">
            <Image
              src="/images/kitchen.jpg"
              alt="Kitchen detail"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-md">
            <Image
              src="/images/difference-lifestyle.jpg"
              alt="Material detail"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
