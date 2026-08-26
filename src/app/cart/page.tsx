'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useCart } from '@/features/cart/context/cart-context';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, hasInstallation } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="container-fluid flex flex-col items-center py-24 text-center">
        <Icon icon="solar:cart-large-minimalistic-linear" className="h-20 w-20 text-ink-light" />
        <h1 className="font-display mt-6 text-3xl font-light">Your cart is empty</h1>
        <p className="mt-2 max-w-md text-sm text-ink-light">
          Browse the collections or return to the product page when you are ready.
        </p>
        <Link
          href="/collections"
          className="mt-8 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
        >
          Explore Collections
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="container-fluid py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Your Order
        </p>
        <h1 className="font-display mt-3 text-4xl font-light tracking-tight text-ink sm:text-5xl">
          Your Cart
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-light">
          Review your selections, confirm installation support and continue when everything is
          ready.
        </p>

        <div className="mt-10 border-t border-cream-dark" />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate"
              >
                <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            <ul className="mt-4 flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.installation}`}
                  className="rounded-md bg-white p-6 dark:bg-ink-light"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md bg-cream-dark dark:bg-slate-dark sm:h-36 sm:w-36">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt ?? item.product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {item.product.brand && (
                            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                              {item.product.brand}
                            </p>
                          )}
                          <p className="font-display mt-1 text-xl font-light">
                            {item.product.name}
                          </p>
                          {item.product.reference && (
                            <p className="mt-1 text-xs text-ink-light">
                              Product No. {item.product.reference}
                            </p>
                          )}
                          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-green-700">
                            <span className="h-2 w-2 rounded-full bg-green-600" />
                            {item.product.stock > 0 ? 'In stock / ready to order' : 'Currently unavailable'}
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-right text-xl font-semibold">
                          {formatPrice(item.product.price ?? 0)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between gap-4">
                        <div className="flex items-center gap-3 rounded-md border border-cream-dark px-3 py-2 dark:border-white/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                            }
                            aria-label="Decrease quantity"
                          >
                            <Icon icon="solar:minus-circle-linear" className="h-4 w-4" />
                          </button>
                          <span className="min-w-[1ch] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs font-semibold uppercase tracking-widest text-ink-light hover:text-red-500"
                          >
                            Remove
                          </button>
                          <p className="text-lg font-semibold">
                            {formatPrice((item.product.price ?? 0) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {hasInstallation && (
              <div className="mt-4 flex items-start gap-4 rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light">
                <Icon icon="solar:check-circle-bold" className="h-6 w-6 shrink-0 text-gold" />
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wide">
                    Professional Installation Review
                  </p>
                  <p className="mt-1 text-sm text-ink-light">
                    Installation is quoted separately after site details and product
                    compatibility are confirmed.
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  Quote Separately
                </span>
              </div>
            )}

            <div className="mt-4 rounded-md bg-white p-6 dark:bg-ink-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Delivery & Collection
              </p>
              <p className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-light">
                <span>
                  Nationwide delivery is calculated at checkout. Showroom collection from
                  Borrowdale is also available.
                </span>
                <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-slate">
                  Calculated at checkout
                </span>
              </p>
              <Link
                href={getWhatsAppUrl('Hi, I have a question about my cart.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate dark:text-cream"
              >
                Need help? WhatsApp a specialist
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-md bg-white p-8 dark:bg-ink-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Order Summary
              </p>
              <h2 className="font-display mt-2 text-3xl font-light">Total</h2>

              <div className="my-6 border-t border-black/10 dark:border-white/10" />

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-ink-light">
                    Subtotal ({totalItems} item{totalItems === 1 ? '' : 's'})
                  </span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                {hasInstallation && (
                  <div className="flex items-center justify-between">
                    <span className="text-ink-light">Installation review</span>
                    <span className="font-medium text-gold-dark">Quoted separately</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-ink-light">Delivery</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
              </div>

              <div className="my-6 border-t border-black/10 dark:border-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-3xl font-semibold text-ink dark:text-cream">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="mt-3 text-xs text-ink-light">
                Sample product price—confirm before checkout.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
                >
                  Proceed to Checkout
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xs border border-slate px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:bg-slate/5 dark:border-cream dark:text-cream dark:hover:bg-white/10"
                >
                  Continue Shopping
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-ink-light">
                Secure Checkout · Support Available
              </p>
            </div>

            <div className="rounded-md bg-slate p-5 text-center text-[11px] font-semibold uppercase tracking-widest text-cream">
              Pricing, delivery and installation are confirmed before payment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
