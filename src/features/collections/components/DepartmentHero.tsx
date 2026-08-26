'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { Department } from '@/data/departments';

export default function DepartmentHero({ department }: { department: Department }) {
  return (
    <section className="bg-slate">
      <div className="container-fluid grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Collections / {department.title}
          </p>
          <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
            {department.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
            {department.heroDescription}
          </p>
          <Link
            href="#catalogue"
            className="mt-8 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore Collection
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative aspect-4/3 overflow-hidden rounded-md"
        >
          <Image
            src={department.image}
            alt={department.title}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
