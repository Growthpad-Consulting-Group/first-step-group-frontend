'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

type OverlayTone = 'ink' | 'cream' | 'slate';

interface CollectionCard {
  image: string;
  label: string;
  title: string;
  description: string;
  brands: string;
  href: string;
  overlay: OverlayTone;
}

const CARDS: CollectionCard[] = [
  {
    image: '/images/bathroom.jpg',
    label: 'Bathroom & Wet Rooms',
    title: 'Bathroom',
    description:
      'Sculptural baths, intelligent brassware and refined fittings for exceptional daily rituals.',
    brands: 'Victoria + Albert · Grohe · Kohler · Hansgrohe',
    href: '/collections/bathroom',
    overlay: 'ink',
  },
  {
    image: '/images/kitchen.jpg',
    label: 'Kitchen & Surfaces',
    title: 'Kitchen',
    description:
      'Statement kitchens, sinks, taps, surfaces and appliances chosen for enduring performance.',
    brands: 'Smeg · Franke · Cosentino',
    href: '/collections/kitchen',
    overlay: 'cream',
  },
  {
    image: '/images/hvac.jpg',
    label: 'Climate Control',
    title: 'HVAC',
    description:
      'Quiet, efficient systems designed around comfort, clean air and discreet integration.',
    brands: 'Tailored Systems · Expert Support',
    href: '/collections/hvac',
    overlay: 'slate',
  },
];

const OVERLAY_GRADIENTS: Record<OverlayTone, string> = {
  ink: 'bg-[linear-gradient(166deg,rgba(17,17,17,0.72)_0%,rgba(9,9,9,0.9)_100%)]',
  cream: 'bg-[linear-gradient(166deg,rgba(84,69,46,0.72)_0%,rgba(46,38,25,0.9)_100%)]',
  slate: 'bg-[linear-gradient(166deg,rgba(26,53,53,0.72)_0%,rgba(13,27,27,0.9)_100%)]',
};

function CollectionCard({
  card,
  featured = false,
}: {
  card: CollectionCard;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={featured ? "h-full" : ""}
    >
      <div className="group relative flex h-full min-h-70 w-full flex-col justify-end overflow-hidden rounded-md">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div
          className={`absolute inset-0 ${OVERLAY_GRADIENTS[card.overlay]}`}
        />

        <div className="relative flex flex-col items-start gap-3 p-8 sm:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            {card.label}
          </span>
          <h3 className="font-display text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
            {card.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-cream sm:text-base">
            {card.description}
          </p>
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            {card.brands}
          </span>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={card.href}
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Browse Collection
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
            <Link
              href="/enquire"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            >
              <Icon icon="bi:chat-left-text" className="h-4 w-4" />
              Inquire for Price
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collections() {
  const [featured, ...rest] = CARDS;

  return (
    <section className="bg-cream py-20 dark:bg-ink sm:py-28">
      <div className="container-fluid">
        <div className="mb-14">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold-light">
            Our Collections
          </h4>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
            Crafted for the discerning home
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CollectionCard card={featured} featured />

          <div className="grid grid-cols-1 gap-6">
            {rest.map((card) => (
              <CollectionCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
