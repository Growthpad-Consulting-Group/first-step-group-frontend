'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'cookie-consent';

type Consent = 'accepted' | 'declined';

function hasStoredConsent(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !hasStoredConsent());

  const setConsent = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore write failures (e.g. private browsing)
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-300">
              We use cookies to improve your experience and understand how you use
              our site. Read our{' '}
              <Link href="/privacy" className="text-gold-light underline underline-offset-2">
                Privacy Policy
              </Link>{' '}
              to learn more.
            </p>

            <div className="flex w-full shrink-0 gap-3 sm:w-auto">
              <button
                onClick={() => setConsent('declined')}
                className="flex-1 rounded-md border border-white/20 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10 sm:flex-none"
              >
                Decline
              </button>
              <button
                onClick={() => setConsent('accepted')}
                className="flex-1 rounded-md bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
