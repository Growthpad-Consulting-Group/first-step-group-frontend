'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/features/cart/context/cart-context';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    hasInstallation,
  } = useCart();
  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/56"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl dark:bg-ink"
          >
            <div className="h-1 w-full bg-gold" />

            <div className="flex items-center justify-between border-b border-black/10 px-6 py-6 dark:border-white/10">
              <div>
                <h2 className="font-display text-2xl font-light text-slate dark:text-cream">
                  Your Cart
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="flex h-11 w-11 items-center justify-center rounded-full text-2xl text-slate transition-colors hover:bg-black/5 dark:text-cream dark:hover:bg-white/10"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {isEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-8 py-10 text-center">
                <Icon icon="solar:cart-large-minimalistic-linear" className="h-20 w-20 text-ink-light" />
                <div>
                  <h3 className="font-display text-xl font-light text-slate dark:text-cream">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 text-sm text-ink-light">
                    Browse the collections or return to the product page when you are ready.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
                  >
                    Explore Collections
                    <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                  </Link>
                </div>
                <div className="w-full rounded-md border border-cream-dark bg-white p-4 text-left dark:border-white/20 dark:bg-ink-light">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                    Need help choosing?
                  </p>
                  <p className="mt-2 text-sm text-ink-light">
                    A First Step specialist can help compare products, finishes and installation
                    needs.
                  </p>
                  <Link
                    href={getWhatsAppUrl('Hi, I need help choosing a product.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate dark:text-cream"
                  >
                    WhatsApp a Specialist
                    <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <li
                        key={`${item.product.id}-${item.installation}`}
                        className="rounded-md bg-white p-5 dark:bg-ink-light"
                      >
                        <div className="flex gap-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-cream-dark dark:bg-slate-dark">
                            {item.product.images[0] && (
                              <Image
                                src={item.product.images[0].url}
                                alt={item.product.images[0].alt ?? item.product.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            {item.product.brand && (
                              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                                {item.product.brand}
                              </p>
                            )}
                            <p className="text-sm font-medium leading-snug">{item.product.name}</p>
                            <p className="text-xs text-ink-light">
                              {formatPrice(item.product.price ?? 0)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="h-fit shrink-0 text-[10px] font-semibold uppercase tracking-widest text-ink-light hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-md border border-cream-dark px-2 py-1 dark:border-white/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                            }
                            aria-label="Decrease quantity"
                          >
                            <Icon icon="solar:minus-circle-linear" className="h-4 w-4" />
                          </button>
                          <span className="min-w-[1ch] text-center text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {hasInstallation && (
                    <div className="mt-4 flex items-start gap-3 rounded-md border border-cream-dark bg-white p-4 dark:border-white/20 dark:bg-ink-light">
                      <Icon icon="solar:check-circle-bold" className="h-5 w-5 shrink-0 text-gold" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide">
                          Professional Installation Review
                        </p>
                        <p className="mt-1 text-xs text-ink-light">
                          Quoted separately after site details are confirmed.
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        Quote
                      </span>
                    </div>
                  )}

                  <div className="mt-4 rounded-md bg-cream-dark/60 p-4 dark:bg-white/5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                      Delivery
                    </p>
                    <p className="mt-1 text-xs text-ink-light">
                      Nationwide delivery is calculated at checkout. Showroom collection is also
                      available.
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/10 px-6 py-6 dark:border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate dark:text-cream">
                    Order Summary
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-ink-light">Subtotal ({totalItems} item{totalItems === 1 ? '' : 's'})</span>
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

                  <div className="my-4 border-t border-black/10 dark:border-white/10" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-2xl font-semibold text-ink dark:text-cream">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
                    >
                      Proceed to Checkout
                      <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="inline-flex items-center justify-center gap-2 rounded-xs border border-slate px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:bg-slate/5 dark:border-cream dark:text-cream dark:hover:bg-white/10"
                    >
                      View Full Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
