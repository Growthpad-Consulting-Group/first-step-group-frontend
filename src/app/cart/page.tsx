'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useCart } from '@/features/cart/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-fluid py-24 text-center">
        <h1 className="font-display text-2xl font-light">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-md bg-gold px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display mb-10 text-3xl font-light tracking-tight">Your Cart</h1>

      <ul className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.product.id} className="flex items-center gap-6 py-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-dark dark:bg-slate-dark">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.images[0].alt ?? item.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="mt-1 text-sm text-slate dark:text-cream-dark">
                {formatPrice(item.product.price ?? 0)}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-1.5 dark:border-white/20">
              <button
                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Icon icon="solar:minus-circle-linear" className="h-3 w-3" />
              </button>
              <span className="min-w-[1ch] text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Icon icon="solar:add-circle-linear" className="h-3 w-3" />
              </button>
            </div>

            <p className="w-24 text-right font-medium">
              {formatPrice((item.product.price ?? 0) * item.quantity)}
            </p>

            <button
              onClick={() => removeItem(item.product.id)}
              className="text-ink-light hover:text-red-500"
              aria-label="Remove item"
            >
              <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-end gap-4 border-t border-black/5 pt-8 dark:border-white/10">
        <div className="flex w-full max-w-xs items-center justify-between text-lg font-medium">
          <span>Subtotal</span>
          <span className="text-slate dark:text-cream">{formatPrice(totalPrice)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full max-w-xs rounded-md bg-gold px-8 py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-gold-light"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
