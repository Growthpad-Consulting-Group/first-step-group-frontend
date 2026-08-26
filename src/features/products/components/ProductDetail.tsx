'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/features/cart/context/cart-context';
import InquireButton from '@/shared/ui/InquireButton';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

/** Approximate swatch colors for the finishes named in spec §7.1; unknown finishes fall back to a neutral dot. */
const FINISH_COLORS: Record<string, string> = {
  chrome: '#c9ccd1',
  'hard graphite': '#3a3a3d',
  'warm sunset': '#b5652f',
  supersteel: '#8a8f94',
};

const ASSURANCE_ITEMS = [
  { label: 'Delivery', copy: 'Nationwide delivery quoted at checkout.' },
  { label: 'Showroom Collection', copy: 'Collect from Borrowdale, Harare.' },
  { label: 'Returns & Warranty', copy: 'Terms confirmed before payment.' },
];

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [finish, setFinish] = useState(product.finishes[0]);
  const [installation, setInstallation] = useState(false);
  const isPoa = product.purchaseMode === 'poa';

  const enquiryMessage = `Hi, I'm interested in ${product.name}${
    product.reference ? ` (ref. ${product.reference})` : ''
  } — could you share more details?`;

  return (
    <div className="flex flex-col">
      <div className="container-fluid grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-cream-dark dark:bg-slate-dark">
            {product.images[activeImage] ? (
              <Image
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt ?? product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-ink-light">
                No image
              </div>
            )}
            {isPoa && (
              <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cream">
                Showroom product
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image.url}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 ${
                    index === activeImage ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <Image src={image.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col rounded-2xl bg-white p-8 dark:bg-ink-light sm:p-10"
        >
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
              {product.brand}
            </p>
          )}
          <h1 className="font-display mt-2 text-3xl font-light tracking-tight">{product.name}</h1>
          {(product.reference || finish) && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-light">
              {[product.reference && `Product No. ${product.reference}`, finish]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}

          <div className="my-6 border-t border-black/10 dark:border-white/10" />

          {isPoa ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-light">
              Showroom product — price on application
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-ink dark:text-cream">
                {formatPrice(product.price ?? 0)}
              </span>
              {product.compareAtPrice && (
                <span className="text-ink-light line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          )}

          {!isPoa && (
            <p className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
              <span
                className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-green-600' : 'bg-red-500'}`}
              />
              <span className={product.stock > 0 ? 'text-green-700' : 'text-red-600'}>
                {product.stock > 0 ? 'In stock / ready to order' : 'Currently unavailable'}
              </span>
            </p>
          )}

          {product.description && (
            <p className="mt-6 leading-relaxed text-ink-light">{product.description}</p>
          )}

          {product.finishes.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest">Select Finish</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.finishes.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFinish(option)}
                    className={`flex items-center gap-2 rounded-md border-2 px-3.5 py-3 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                      finish === option
                        ? 'border-gold'
                        : 'border-cream-dark dark:border-white/20'
                    }`}
                  >
                    <span
                      className="h-6 w-6 shrink-0 rounded-full border border-black/10"
                      style={{
                        backgroundColor: FINISH_COLORS[option.toLowerCase()] ?? '#c7952b',
                      }}
                    />
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isPoa && product.installationAvailable && (
            <label className="mt-6 flex items-start gap-3 rounded-md border border-cream-dark p-4 dark:border-white/20">
              <input
                type="checkbox"
                checked={installation}
                onChange={(e) => setInstallation(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-gold"
              />
              <span className="flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wide">
                  Add professional installation
                </span>
                <span className="mt-1 block text-xs text-ink-light">
                  Installation price confirmed after site details.
                </span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-dark">
                + Quote
              </span>
            </label>
          )}

          {isPoa ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <InquireButton className="flex flex-1 px-8 py-3 text-sm" />
              <Link
                href={getWhatsAppUrl(enquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xs border border-slate px-8 py-3 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:bg-slate/5 dark:border-cream dark:text-cream dark:hover:bg-white/10"
              >
                <Icon icon="mdi:whatsapp" className="h-4 w-4" />
                Request Price
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-4 rounded-md border border-black/10 px-4 py-2 dark:border-white/20">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[1ch] text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addItem(product, quantity, installation)}
                  disabled={product.stock === 0}
                  className="flex-1 rounded-md bg-gold px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {product.stock === 0 ? 'Sold out' : 'Add to cart'}
                </button>
              </div>

              <button
                onClick={() => {
                  addItem(product, quantity, installation);
                  router.push('/checkout');
                }}
                disabled={product.stock === 0}
                className="mt-3 rounded-md border border-slate px-8 py-3 text-sm font-medium text-slate transition-colors hover:bg-slate/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-cream dark:text-cream dark:hover:bg-white/10"
              >
                Buy now
              </button>
            </>
          )}

          <Link
            href={getWhatsAppUrl(`Need help choosing? I have a question about ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:text-gold-dark dark:text-cream"
          >
            Need help? WhatsApp a specialist
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="container-fluid grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        {ASSURANCE_ITEMS.map((item) => (
          <div key={item.label} className="rounded-md bg-cream-dark/60 p-4 dark:bg-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
              {item.label}
            </p>
            <p className="mt-1 text-xs text-ink-light">{item.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
