'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { DEPARTMENTS } from '@/data/departments';

export default function CollectionsHero() {
  const [primary, ...rest] = DEPARTMENTS;

  return (
    <section className="bg-slate">
      <div className="container-fluid grid grid-cols-1 gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block h-[3px] w-13 bg-gold" />
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            All Collections
          </h4>
          <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
            Every space starts with the right foundations.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
            Explore considered bathroom, kitchen, climate-control and
            home-technology collections selected for lasting performance,
            quiet refinement and complete living.
          </p>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
            Bathroom · Kitchen · Climate Control · Home Technology
          </p>
          <Link
            href="#core-collections"
            className="mt-8 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore Collections
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
              src={primary.image}
              alt={primary.title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          {rest.slice(0, 2).map((department) => (
            <div
              key={department.slug}
              className="relative aspect-4/3 overflow-hidden rounded-md"
            >
              <Image
                src={department.image}
                alt={department.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
