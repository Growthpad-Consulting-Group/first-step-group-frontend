'use client';

import Link from 'next/link';
import { useCart } from '@/features/cart/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-fluid py-24 text-center">
        <h1 className="font-display text-2xl font-semibold">Nothing to check out</h1>
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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <h1 className="font-display mb-8 text-2xl font-semibold tracking-tight">Shipping details</h1>
        <form className="flex flex-col gap-4">
          <input
            className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
            placeholder="Full name"
            required
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
            placeholder="Address line 1"
            required
          />
          <input
            className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
            placeholder="Address line 2 (optional)"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
              placeholder="City"
              required
            />
            <input
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
              placeholder="State"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
              placeholder="Postal code"
              required
            />
            <input
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-gold dark:border-white/20 dark:bg-transparent dark:focus:border-gold"
              placeholder="Country"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-md bg-gold px-8 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
          >
            Place order
          </button>
          <p className="text-xs text-ink-light">
            Checkout submission wires up to the backend&apos;s /orders endpoint once auth is connected.
          </p>
        </form>
      </div>

      <div>
        <h2 className="font-display mb-6 text-lg font-semibold">Order summary</h2>
        <ul className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
          {items.map((item) => (
            <li key={item.product._id} className="flex items-center justify-between py-4 text-sm">
              <span>
                {item.product.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-6 text-lg font-medium dark:border-white/10">
          <span>Total</span>
          <span className="text-slate dark:text-cream">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
