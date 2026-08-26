'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/features/cart/context/cart-context';
import InquireButton from '@/shared/ui/InquireButton';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isPoa = product.purchaseMode === 'poa';

  return (
    <div className="container-fluid grid grid-cols-1 gap-12 py-16 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream-dark dark:bg-slate-dark">
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
        className="flex flex-col"
      >
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-widest text-gold">
            {product.brand}
          </p>
        )}
        <h1 className="font-display mt-1 text-3xl font-light tracking-tight">{product.name}</h1>

        {isPoa ? (
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-ink-light">
            Showroom product — price on application
          </p>
        ) : (
          <div className="mt-4 flex items-center gap-3 text-xl">
            <span className="font-medium text-slate dark:text-cream">
              {formatPrice(product.price ?? 0)}
            </span>
            {product.compareAtPrice && (
              <span className="text-ink-light line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        )}

        {product.description && (
          <p className="mt-6 leading-relaxed text-ink-light dark:text-cream-dark">
            {product.description}
          </p>
        )}

        {isPoa ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InquireButton className="flex flex-1 px-8 py-3 text-sm" />
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
                onClick={() => addItem(product, quantity)}
                disabled={product.stock === 0}
                className="flex-1 rounded-md bg-gold px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                {product.stock === 0 ? 'Sold out' : 'Add to cart'}
              </button>
            </div>

            <p className="mt-4 text-xs text-ink-light">
              {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
