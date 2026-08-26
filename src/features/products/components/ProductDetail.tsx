'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          {product.images[activeImage] ? (
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              No image
            </div>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setActiveImage(index)}
                className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 ${
                  index === activeImage ? 'border-gold' : 'border-transparent'
                }`}
              >
                <Image src={image} alt="" fill className="object-cover" />
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
        <h1 className="font-display text-3xl font-semibold tracking-tight">{product.name}</h1>

        <div className="mt-4 flex items-center gap-3 text-xl">
          <span className="font-medium text-slate dark:text-zinc-300">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-zinc-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {product.description && (
          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
        )}

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

        <p className="mt-4 text-xs text-zinc-500">
          {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
        </p>
      </motion.div>
    </div>
  );
}
