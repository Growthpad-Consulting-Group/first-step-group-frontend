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
import GlassPanel from '@/shared/ui/GlassPanel';
import InquireButton from '@/shared/ui/InquireButton';

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
        <Link href="/" className="flex w-fit items-center">
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
          <InquireButton
            icon="solar:arrow-right-linear"
            iconPosition="right"
            className="hidden px-7 py-3.5 text-sm sm:inline-flex"
          />

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
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-xs sm:hidden"
            >
              <GlassPanel mode="dark" borderRadius={0} className="h-full w-full bg-slate/75">
                <nav className="flex h-full flex-col">
                  <div className="flex items-center justify-end border-b border-white/10 px-6 py-5">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10"
                      aria-label="Close menu"
                    >
                      <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col gap-1 px-6 py-6">
                    {NAV_LINKS.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 * index }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between border-b border-white/5 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:text-gold-light"
                        >
                          {link.label}
                          {link.hasDropdown && (
                            <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
                          )}
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * NAV_LINKS.length + 0.1 }}
                      className="mt-6 flex flex-col gap-3"
                    >
                      <InquireButton
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex px-7 py-3.5 text-sm"
                      />
                      <Link
                        href="https://wa.me/26378230418"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-xs border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                      >
                        <Icon icon="mdi:whatsapp" className="h-4 w-4" />
                        WhatsApp Us
                      </Link>
                    </motion.div>
                  </div>
                </nav>
              </GlassPanel>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
