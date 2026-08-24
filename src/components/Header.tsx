'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/brands', label: 'Brands' },
  { href: '/showroom', label: 'Showroom' },
  { href: '/journal', label: 'Journal' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const overlayOnHero = pathname === '/';

  return (
    <header
      className={
        overlayOnHero
          ? 'absolute inset-x-0 top-0 z-40'
          : 'sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-ink/90'
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="First Step — Premium Building"
            width={160}
            height={64}
            priority
            className="h-30 w-auto"
          />
        </Link>

        <nav className="hidden gap-10 text-sm font-medium tracking-widest sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                overlayOnHero
                  ? 'uppercase text-white transition-colors hover:text-gold-light'
                  : 'uppercase text-ink transition-colors hover:text-gold dark:text-white dark:hover:text-gold-light'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/enquire"
            className="hidden rounded-md bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:inline-flex sm:items-center"
          >
            Enquire Now
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={
              overlayOnHero
                ? 'flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:hidden'
                : 'flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors hover:bg-gold/10 dark:text-white dark:hover:bg-white/10 sm:hidden'
            }
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  src="/logo.webp"
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
                  <X className="h-5 w-5" />
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
                  Enquire Now
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
