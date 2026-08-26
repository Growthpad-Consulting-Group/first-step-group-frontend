'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { NAV_LINKS } from '@/data/nav';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 96);
  });

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-40 bg-slate"
    >
      <div className="container-fluid grid grid-cols-2 items-center py-3 sm:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="First Step — Premium Building"
            width={160}
            height={64}
            priority
            className="h-20 w-auto"
          />
        </Link>

        <nav className="col-start-2 hidden items-center gap-8 text-sm font-medium tracking-widest sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 uppercase text-white transition-colors hover:text-gold-light"
            >
              {link.label}
              {link.hasDropdown && (
                <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/enquire"
            className="hidden items-center gap-2 rounded-xs bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:inline-flex"
          >
            Inquire Now
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <Icon icon="solar:close-circle-linear" className="h-6 w-6" />
            ) : (
              <Icon icon="solar:hamburger-menu-linear" className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 sm:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-white shadow-xl sm:hidden dark:bg-ink"
            >
              <div className="flex items-center justify-between border-b border-black/5 px-6 py-5 dark:border-white/10">
                <Image
                  src="/logo.svg"
                  alt="First Step — Premium Building"
                  width={160}
                  height={64}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 px-6 py-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm font-medium uppercase tracking-widest text-ink dark:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/enquire"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex items-center justify-center rounded-md bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
