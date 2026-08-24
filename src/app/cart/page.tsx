'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-full bg-black px-8 py-3 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">Your Cart</h1>

      <ul className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.product._id} className="flex items-center gap-6 py-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="mt-1 text-sm text-zinc-500">{formatPrice(item.product.price)}</p>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-black/10 px-3 py-1.5 dark:border-white/20">
              <button
                onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-[1ch] text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <p className="w-24 text-right font-medium">
              {formatPrice(item.product.price * item.quantity)}
            </p>

            <button
              onClick={() => removeItem(item.product._id)}
              className="text-zinc-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-end gap-4 border-t border-black/5 pt-8 dark:border-white/10">
        <div className="flex w-full max-w-xs items-center justify-between text-lg font-medium">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full max-w-xs rounded-full bg-black px-8 py-3 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
