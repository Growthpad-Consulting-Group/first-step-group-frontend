'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CATEGORIES = ['Bathroom', 'Kitchen', 'HVAC', 'Home Tech'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[calc(100vh-6.5rem)] items-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 top-[-12%] h-[124%]">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/50" />

      <div className="container-fluid relative flex flex-col items-start">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        >
          Premium Home Finishing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          Luxury starts with the right first step.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-lg text-cream"
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
            className="inline-flex items-center gap-2 rounded-md bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Explore Collections
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
          <Link
            href="/showroom"
            className="inline-flex items-center gap-2 rounded-md border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
          >
            <Icon icon="solar:map-point-linear" className="h-4 w-4" />
            Visit Showroom
          </Link>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container-fluid absolute bottom-8 left-0 right-0 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
      >
        {CATEGORIES.join(' • ')}
      </motion.p>
    </section>
  );
}
