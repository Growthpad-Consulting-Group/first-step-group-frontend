import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getOrder } from '@/lib/woo/orders';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: 'Order Confirmation',
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    number: '01',
    status: 'Complete',
    title: 'Order Received',
    copy: 'Your product, finish and installation request have been recorded.',
  },
  {
    number: '02',
    status: 'In Progress',
    title: 'Payment Review',
    copy: 'We confirm the payment method and final product pricing.',
  },
  {
    number: '03',
    status: 'Next',
    title: 'Delivery Confirmation',
    copy: 'A specialist confirms delivery, collection and installation timing.',
  },
];

const formatPrice = (value: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrder(orderId).catch(() => null);

  if (!order) notFound();

  const isOnHold = order.status === 'on-hold' || order.status === 'pending';
  const fulfilmentLine = order.customer_note?.split('|').find((s) => s.includes('Fulfilment:'));
  const fulfilmentLabel = fulfilmentLine
    ? fulfilmentLine.split(':')[1]?.trim()
    : 'Confirmed at checkout';

  return (
    <div className="bg-cream">
      <div className="container-fluid grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_620px]">
        <div>
          <div className="flex h-26 w-26 items-center justify-center rounded-full bg-slate text-5xl font-semibold text-gold">
            ✓
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            Order Received
          </p>
          <h1 className="font-display mt-3 text-4xl font-light leading-tight tracking-tight text-ink sm:text-5xl">
            Thank you.
            <br />
            Your order is received.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-light">
            We have received your order details. A First Step specialist will confirm payment,
            delivery and any installation requirements before fulfilment.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-cream-dark bg-white p-5 dark:border-white/20 dark:bg-ink-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Order Number
              </p>
              <p className="mt-2 text-xl font-semibold">{order.number}</p>
            </div>
            <div className="rounded-md border border-cream-dark bg-white p-5 dark:border-white/20 dark:bg-ink-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Payment Status
              </p>
              <p className="mt-2 flex items-center gap-2 text-base font-semibold text-slate dark:text-cream">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {isOnHold ? 'Pending Verification' : order.status}
              </p>
            </div>
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            What Happens Next
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-md border border-cream-dark bg-white p-5 dark:border-white/20 dark:bg-ink-light"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-light text-gold-dark">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-light">
                    {step.status}
                  </span>
                </div>
                <div className="my-3 border-t border-cream-dark dark:border-white/10" />
                <p className="text-sm font-semibold uppercase tracking-wide">{step.title}</p>
                <p className="mt-2 text-sm text-ink-light">{step.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Continue Shopping
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
            <Link
              href={getWhatsAppUrl(`Hi, I'd like an update on order ${order.number}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xs border border-slate px-8 py-4 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:bg-slate/5 dark:border-cream dark:text-cream dark:hover:bg-white/10"
            >
              WhatsApp Support
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-light">
            A confirmation email will be sent to {order.billing.email}.
          </p>
        </div>

        <div className="h-fit rounded-md border border-cream-dark bg-white p-6 dark:border-white/20 dark:bg-ink-light sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
            Order Summary
          </p>
          <h2 className="font-display mt-2 text-3xl font-light">Your Order</h2>

          <ul className="mt-6 flex flex-col gap-3">
            {order.line_items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-md border border-cream-dark p-4 dark:border-white/20"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-cream-dark dark:bg-slate-dark">
                  {item.image?.src && (
                    <Image src={item.image.src} alt={item.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm font-medium leading-snug">{item.name}</p>
                  <p className="mt-1 text-xs text-ink-light">Qty {item.quantity}</p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold">
                  {formatPrice(item.total)}
                </p>
              </li>
            ))}
          </ul>

          <div className="my-6 border-t border-black/10 dark:border-white/10" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-3xl font-semibold text-ink dark:text-cream">
              {formatPrice(order.total)}
            </span>
          </div>
          <p className="mt-3 text-xs text-ink-light">
            Sample product price—final pricing is confirmed before payment.
          </p>

          <div className="mt-6 rounded-md bg-cream-dark/40 p-5 dark:bg-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
              Confirmation Details
            </p>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-ink-light">Email</span>
                <span className="font-medium">{order.billing.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-light">Fulfilment</span>
                <span className="font-medium capitalize">{fulfilmentLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-light">Payment</span>
                <span className="font-medium">Pending verification</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-ink-light">
            Receipt availability follows payment verification.
          </p>
        </div>
      </div>
    </div>
  );
}
