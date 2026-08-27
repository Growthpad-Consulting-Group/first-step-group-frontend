import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { Product } from '@/lib/types';

/**
 * The "Selected for First Step" collection-gallery card (Figma frame 04/05) —
 * editorial discovery, not a transactional grid: no price, no cart/inquire
 * action. Clicking through leads to the real PDP where buy/POA actions live.
 */
export default function BrandProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-6/5 w-full overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt ?? product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-light">
            No image
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-2">
        {product.category && (
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            {product.category}
          </span>
        )}
        <h3 className="font-display text-xl font-light uppercase tracking-tight text-ink">
          {product.name}
        </h3>
        {product.summary && (
          <p className="text-sm leading-relaxed text-ink-light">{product.summary}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate">
          View Product
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
