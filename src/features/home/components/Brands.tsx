'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Brand {
  name: string;
  src: string;
}

const BRANDS: Brand[] = [
  { name: 'Victoria + Albert', src: '/brands/victoria-albert.webp' },
  { name: 'Kohler', src: '/brands/kohler.webp' },
  { name: 'Grohe', src: '/brands/GROHE.webp' },
  { name: 'Hansgrohe', src: '/brands/hansgrohe.webp' },
  { name: 'SMEG', src: '/brands/smeg.webp' },
  { name: 'Franke', src: '/brands/franke.webp' },
  { name: 'Cosentino', src: '/brands/cosentino.webp' },
];

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="flex aspect-3/2 w-full items-center justify-center rounded-sm bg-white p-6 transition-transform hover:-translate-y-1"
    >
      <div className="relative h-full w-full">
        <Image
          src={brand.src}
          alt={brand.name}
          fill
          className="object-contain"
          sizes="200px"
        />
      </div>
    </motion.div>
  );
}

export default function Brands() {
  return (
    <section className="bg-slate-muted py-14 sm:py-20">
      <div className="container-fluid">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Brands We Carry
            </h4>
            <h3 className="font-display mt-3 text-xl font-light uppercase tracking-tight text-white sm:text-3xl">
              World-class brands, <br /> delivered to your door.
            </h3>
          </div>
          <Link
            href="/brands"
            className="inline-flex shrink-0 items-center gap-2 rounded-xs bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            View All Brands
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {BRANDS.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
