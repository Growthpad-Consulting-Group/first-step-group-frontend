'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import type { Department } from '@/data/departments';

interface DepartmentCardProps {
  department: Department;
  index: number;
  /** overlay: full-bleed image, dark gradient, text on image (Core Collections). split: image top, solid content block below (Systems & Technology). */
  variant: 'overlay' | 'split';
}

export default function DepartmentCard({ department, index, variant }: DepartmentCardProps) {
  const number = String(index + 1).padStart(2, '0');

  if (variant === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="group relative flex h-full min-h-150 w-full flex-col justify-end overflow-hidden rounded-md">
          <Image
            src={department.image}
            alt={department.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(166deg,rgba(34,34,34,0.72)_0%,rgba(17,17,17,0.9)_100%)]" />
          <span className="absolute left-8 top-8 text-xs font-semibold uppercase tracking-widest text-gold-light sm:left-10 sm:top-10">
            {number}
          </span>

          <div className="relative flex flex-col items-start gap-3 p-8 sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-light">
              {department.name}
            </span>
            <h3 className="font-display text-3xl font-light uppercase tracking-tight text-white sm:text-4xl">
              {department.title}
            </h3>
            <p className="max-w-md text-base leading-relaxed text-cream">
              {department.description}
            </p>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-light">
              {department.brands}
            </span>

            <Link
              href={`/collections/${department.slug}`}
              className="mt-2 inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Explore {department.title}
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col overflow-hidden rounded-md bg-cream"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={department.image}
          alt={department.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
        <span className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-widest text-gold-light">
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-start gap-3 p-8 sm:p-10">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">
          {department.name}
        </span>
        <h3 className="font-display text-3xl font-light uppercase tracking-tight text-ink sm:text-4xl">
          {department.title}
        </h3>
        <p className="max-w-md text-base leading-relaxed text-ink-light">
          {department.description}
        </p>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-light">
          {department.brands}
        </span>

        <Link
          href={`/collections/${department.slug}`}
          className="mt-2 inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
        >
          Explore {department.title}
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
