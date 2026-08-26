'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useCart } from '@/features/cart/context/cart-context';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { FulfilmentMethod, PaymentMethod } from '@/lib/woo/orders';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const STEPS = [
  { number: '01', label: 'Cart', status: 'complete' as const },
  { number: '02', label: 'Details', status: 'active' as const },
  { number: '03', label: 'Payment', status: 'next' as const },
  { number: '04', label: 'Review', status: 'next' as const },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-ink-light">
      {children}
    </span>
  );
}

const inputClass =
  'w-full rounded-md border border-cream-dark bg-white px-3.5 py-3 text-sm text-ink outline-none focus:border-gold dark:border-white/20 dark:bg-ink dark:text-cream';

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, hasInstallation, clearCart } = useCart();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfilment, setFulfilment] = useState<FulfilmentMethod>('delivery');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank-transfer');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="container-fluid flex flex-col items-center py-24 text-center">
        <h1 className="font-display text-2xl font-light">Nothing to check out</h1>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  async function handlePlaceOrder() {
    setError(null);

    if (!firstName || !lastName || !email || !phone) {
      setError('Please complete your contact details.');
      return;
    }
    if (fulfilment === 'delivery' && (!street || !city || !province)) {
      setError('Please complete your delivery address.');
      return;
    }
    if (!acceptedTerms) {
      setError('Please confirm your order details to continue.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { firstName, lastName, email, phone },
          fulfilment,
          address: fulfilment === 'delivery' ? { street, city, province, notes } : undefined,
          paymentMethod,
          lineItems: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          acceptedTerms,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong placing your order.');
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/checkout/confirmation/${data.orderId}`);
    } catch {
      setError('Something went wrong placing your order. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-cream">
      <div className="container-fluid py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Secure Checkout
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
            Checkout
          </h1>
          <p className="max-w-md text-lg text-ink-light">
            Complete your details, choose how you receive the order and select a payment method.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-md border border-cream-dark bg-white px-6 py-4 dark:border-white/20 dark:bg-ink-light">
          {STEPS.map((step) => (
            <div key={step.number} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gold-dark">{step.number}</span>
              <span
                className={`text-xs font-semibold uppercase tracking-widest ${
                  step.status === 'active' ? 'text-slate dark:text-cream' : 'text-ink-light'
                }`}
              >
                {step.label}
              </span>
              <span
                className={`ml-1 text-[10px] font-semibold uppercase tracking-wide ${
                  step.status === 'active' ? 'text-gold-dark' : 'text-ink-light'
                }`}
              >
                {step.status === 'complete' ? '· Complete' : step.status === 'active' ? '· Active' : ''}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_450px]">
          <div className="flex flex-col gap-6">
            <section className="rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-light text-gold-dark">01</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide">
                    Contact Details
                  </h2>
                </div>
                <p className="hidden text-right text-xs text-ink-light sm:block">
                  Used for order updates and delivery coordination.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <FieldLabel>First Name</FieldLabel>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className={inputClass}
                  />
                </label>
                <label>
                  <FieldLabel>Last Name</FieldLabel>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className={inputClass}
                  />
                </label>
                <label>
                  <FieldLabel>Email Address</FieldLabel>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={inputClass}
                  />
                </label>
                <label>
                  <FieldLabel>Phone Number</FieldLabel>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+263"
                    className={inputClass}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-light text-gold-dark">02</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide">
                    Delivery &amp; Collection
                  </h2>
                </div>
                <p className="hidden text-right text-xs text-ink-light sm:block">
                  Choose one option. Delivery is priced from the destination.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setFulfilment('delivery')}
                  className={`rounded-md border-2 p-4 text-left transition-colors ${
                    fulfilment === 'delivery'
                      ? 'border-gold'
                      : 'border-cream-dark dark:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Deliver to Address
                    </span>
                    {fulfilment === 'delivery' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-light">
                    Nationwide delivery calculated after address review.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfilment('showroom')}
                  className={`rounded-md border-2 p-4 text-left transition-colors ${
                    fulfilment === 'showroom'
                      ? 'border-gold'
                      : 'border-cream-dark dark:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Collect from Showroom
                    </span>
                    {fulfilment === 'showroom' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-light">Collect from Borrowdale, Harare.</p>
                </button>
              </div>

              {fulfilment === 'delivery' && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <label>
                    <FieldLabel>Street Address</FieldLabel>
                    <input
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="House number and street"
                      className={inputClass}
                    />
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label>
                      <FieldLabel>City / Town</FieldLabel>
                      <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city or town"
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <FieldLabel>Province</FieldLabel>
                      <input
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        placeholder="Select province"
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <FieldLabel>Access Notes</FieldLabel>
                      <input
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Gate, floor or site notes"
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-light text-gold-dark">03</span>
                  <h2 className="text-sm font-semibold uppercase tracking-wide">
                    Payment Method
                  </h2>
                </div>
                <p className="hidden text-right text-xs text-ink-light sm:block">
                  Select a payment method. Final availability will be confirmed.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="cursor-not-allowed rounded-md border-2 border-cream-dark p-4 opacity-50 dark:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Card Payment
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-light">
                      Coming Soon
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-light">
                    Secure card payment via Stanbic — integration pending.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank-transfer')}
                  className={`rounded-md border-2 p-4 text-left transition-colors ${
                    paymentMethod === 'bank-transfer'
                      ? 'border-gold'
                      : 'border-cream-dark dark:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Bank Transfer
                    </span>
                    {paymentMethod === 'bank-transfer' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-light">
                    Order is confirmed after payment verification.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay-by-quote')}
                  className={`rounded-md border-2 p-4 text-left transition-colors ${
                    paymentMethod === 'pay-by-quote'
                      ? 'border-gold'
                      : 'border-cream-dark dark:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Pay by Approved Quote
                    </span>
                    {paymentMethod === 'pay-by-quote' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-light">
                    For trade, project or installation-led orders.
                  </p>
                </button>
              </div>
            </section>
          </div>

          <div className="rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
              Order Summary
            </p>
            <h2 className="font-display mt-2 text-3xl font-light">Your Order</h2>

            <ul className="mt-6 flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.installation}`}
                  className="flex gap-4 rounded-md border border-cream-dark p-4 dark:border-white/20"
                >
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
                  <div className="flex flex-1 flex-col justify-center">
                    {item.product.brand && (
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
                        {item.product.brand}
                      </p>
                    )}
                    <p className="text-sm font-medium leading-snug">{item.product.name}</p>
                    <p className="mt-1 text-xs text-ink-light">Qty {item.quantity}</p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-semibold">
                    {formatPrice((item.product.price ?? 0) * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="my-6 border-t border-black/10 dark:border-white/10" />

            <div className="flex flex-col gap-2 text-sm">
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
                <span className="font-medium">Calculated after address</span>
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
              Sample product price—confirm before order placement.
            </p>

            <label className="mt-6 flex items-start gap-3 rounded-md border border-cream-dark p-4 dark:border-white/20">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-gold"
              />
              <span className="text-xs text-ink-light">
                I confirm the selected finish, delivery method and order details.
              </span>
            </label>

            {error && <p className="mt-4 text-xs font-medium text-red-600">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Placing Order…' : 'Place Order'}
              {!submitting && <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />}
            </button>
            <Link
              href="/cart"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xs border border-slate px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:bg-slate/5 dark:border-cream dark:text-cream dark:hover:bg-white/10"
            >
              Back to Cart
            </Link>
            <Link
              href={getWhatsAppUrl('Hi, I need help with my checkout.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-widest text-ink-light"
            >
              Need help? WhatsApp a specialist
            </Link>
            <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-widest text-ink-light">
              Secure Checkout · Pricing Confirmed Before Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
