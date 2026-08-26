'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/features/cart/context/cart-context';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl dark:bg-ink"
          >
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-5 dark:border-white/10">
              <h2 className="font-display text-lg font-semibold">Your Cart</h2>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close cart"
              >
                <Icon icon="solar:close-circle-linear" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink-light">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item) => (
                    <li key={item.product._id} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-dark dark:bg-slate-dark">
                        {item.product.images[0] && (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-ink-light hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate dark:text-cream-dark">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="mt-1 flex w-fit items-center gap-3 rounded-md border border-black/10 px-2 py-1 dark:border-white/20">
                          <button
                            onClick={() =>
                              updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                            }
                            aria-label="Decrease quantity"
                          >
                            <Icon icon="solar:minus-circle-linear" className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1ch] text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Icon icon="solar:add-circle-linear" className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/5 px-6 py-5 dark:border-white/10">
                <div className="mb-4 flex items-center justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate dark:text-cream">{formatPrice(totalPrice)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-light"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
