'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CollectionCard {
  image: string;
  aspect: string;
  category: string;
  title: string;
  brands?: string;
  cta: string;
  ctaVariant: 'gold' | 'white';
  href: string;
}

const CARDS: CollectionCard[] = [
  {
    image: '/bathroom.webp',
    aspect: '750/832',
    category: 'Bathroom',
    title: 'Bathroom & Wet Rooms',
    brands: 'Victoria + Albert · Grohe · Kohler · Hansgrohe',
    cta: 'Enquire for Price',
    ctaVariant: 'gold',
    href: '/collections/bathroom',
  },
  {
    image: '/kitchen.webp',
    aspect: '750/401',
    category: 'Kitchen',
    title: 'Kitchen & Surfaces',
    cta: 'Enquire for Prices',
    ctaVariant: 'white',
    href: '/collections/kitchen',
  },
  {
    image: '/kitchen.webp',
    aspect: '750/401',
    category: 'HVAC',
    title: 'Climate Control',
    cta: 'Enquire for Price',
    ctaVariant: 'gold',
    href: '/collections/hvac',
  },
];

function CollectionCta({ label, variant }: { label: string; variant: 'gold' | 'white' }) {
  const base =
    'inline-flex w-fit items-center rounded-md px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors';
  return (
    <span
      className={
        variant === 'gold'
          ? `${base} bg-gold text-ink hover:bg-gold-light`
          : `${base} bg-white text-ink hover:bg-cream-dark`
      }
    >
      {label}
    </span>
  );
}

export default function Collections() {
  const [featured, ...rest] = CARDS;

  return (
    <section className="bg-cream py-20 dark:bg-ink sm:py-28">
      <div className="container-fluid">
        <div className="mb-14 text-left">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold-light">
            Our Collections
          </h4>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
            Crafted for the discerning home
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={featured.href}
              style={{ aspectRatio: featured.aspect }}
              className="group relative flex w-full flex-col justify-end overflow-hidden rounded-md"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-ink/55 transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

              <div className="relative flex flex-col items-start gap-3 p-8 sm:p-10">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-light">
                  {featured.category}
                </span>
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {featured.title}
                </h3>
                {featured.brands && (
                  <p className="text-sm text-cream">{featured.brands}</p>
                )}
                <div className="mt-2">
                  <CollectionCta label={featured.cta} variant={featured.ctaVariant} />
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {rest.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Link
                  href={card.href}
                  style={{ aspectRatio: card.aspect }}
                  className="group relative flex w-full flex-col justify-end overflow-hidden rounded-md"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-ink/55 transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

                  <div className="relative flex flex-col items-start gap-2 p-6 sm:p-8">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-light">
                      {card.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                      {card.title}
                    </h3>
                    <div className="mt-1">
                      <CollectionCta label={card.cta} variant={card.ctaVariant} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
