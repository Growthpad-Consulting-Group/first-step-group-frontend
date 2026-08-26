'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Brand {
  name: string;
  src: string;
}

const ROW_ONE: Brand[] = [
  { name: 'Victoria + Albert', src: '/victoria-albert.webp' },
  { name: 'Grohe', src: '/GROHE.webp' },
  { name: 'Kohler', src: '/kohler.webp' },
  { name: 'Hansgrohe', src: '/hansgrohe.webp' },
  { name: 'SMEG', src: '/smeg.webp' },
];

const ROW_TWO: Brand[] = [
  { name: 'Cosentino', src: '/cosentino.webp' },
  { name: 'Dado Quartz', src: '/dadoquartz.webp' },
  { name: 'Franke', src: '/franke.webp' },
  { name: 'Meir', src: '/meir.webp' },
];

const ALL_BRANDS = [...ROW_ONE, ...ROW_TWO];

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="flex aspect-[3/2] w-full items-center justify-center rounded-md bg-white p-4 transition-transform hover:-translate-y-1 sm:w-44 sm:p-6"
    >
      <div className="relative h-full w-full">
        <Image
          src={brand.src}
          alt={brand.name}
          fill
          className="object-contain"
          sizes="176px"
        />
      </div>
    </motion.div>
  );
}

export default function Brands() {
  return (
    <section className="bg-slate py-14 sm:py-28">
      <div className="container-fluid">
        <div className="mb-10 text-left sm:mb-14">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
            Our Brands
          </h4>
          <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-white sm:text-3xl">
            World-class brands, delivered to your door
          </h3>
        </div>

        {/* Mobile: simple 2-column grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {ALL_BRANDS.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>

        {/* Desktop: 5-then-4 centered rows */}
        <div className="hidden flex-col items-center gap-4 sm:flex">
          <div className="flex flex-wrap justify-center gap-4">
            {ROW_ONE.map((brand, index) => (
              <BrandCard key={brand.name} brand={brand} index={index} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {ROW_TWO.map((brand, index) => (
              <BrandCard key={brand.name} brand={brand} index={ROW_ONE.length + index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
