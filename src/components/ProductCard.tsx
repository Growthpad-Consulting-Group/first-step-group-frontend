'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCart } from '@/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-medium">{product.name}</h3>
          </Link>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-zinc-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="mt-0.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:hover:bg-white dark:hover:text-black"
        >
          {product.stock === 0 ? 'Sold out' : 'Add'}
        </button>
      </div>
    </motion.div>
  );
}
