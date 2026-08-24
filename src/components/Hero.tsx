'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <Image
        src="/hero-bg.webp"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/60" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-20 sm:pb-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          Luxury starts with the right first step.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-lg text-zinc-200"
        >
          Premium bathroom, kitchen, HVAC and home tech fixtures sourced from the
          world&apos;s finest brands and delivered anywhere in Zimbabwe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/collections"
            className="inline-flex items-center rounded-md bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore Collections
          </Link>
          <Link
            href="/showroom"
            className="inline-flex items-center rounded-md bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-zinc-100"
          >
            Visit Showroom
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
