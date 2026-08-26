import { wooFetch } from './client';

export type FulfilmentMethod = 'delivery' | 'showroom';
export type PaymentMethod = 'bank-transfer' | 'pay-by-quote';

export interface OrderContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  province: string;
  notes?: string;
}

export interface CreateOrderInput {
  contact: OrderContact;
  fulfilment: FulfilmentMethod;
  address?: OrderAddress;
  paymentMethod: PaymentMethod;
  lineItems: { productId: string; quantity: number }[];
  customerNote?: string;
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  'bank-transfer': 'Bank Transfer',
  'pay-by-quote': 'Pay by Approved Quote',
};

export interface WooOrder {
  id: number;
  number: string;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  billing: { first_name: string; last_name: string; email: string; phone: string };
  line_items: {
    id: number;
    name: string;
    quantity: number;
    total: string;
    image?: { src: string };
  }[];
  customer_note: string;
}

/**
 * Creates a real WooCommerce order. Card payment isn't wired here — that needs the
 * Stanbic gateway integration (spec §9), not yet scoped. Bank Transfer / Pay by Quote
 * are manual-settlement paths, so we can safely create the order now and let Woo's
 * "on-hold" status represent "payment review" (spec §7.5.5) without touching a payment
 * gateway. Woo computes line totals itself from product_id + quantity — we never send
 * a client-submitted price/total (spec §3: never trust client-submitted totals).
 */
export async function createOrder(input: CreateOrderInput): Promise<WooOrder> {
  const notesParts = [
    `Payment method: ${PAYMENT_LABELS[input.paymentMethod]}`,
    `Fulfilment: ${input.fulfilment === 'delivery' ? 'Deliver to address' : 'Collect from showroom'}`,
  ];
  if (input.fulfilment === 'delivery' && input.address?.notes) {
    notesParts.push(`Access notes: ${input.address.notes}`);
  }
  if (input.customerNote) notesParts.push(input.customerNote);

  const payload = {
    status: 'on-hold',
    payment_method: input.paymentMethod,
    payment_method_title: PAYMENT_LABELS[input.paymentMethod],
    set_paid: false,
    billing: {
      first_name: input.contact.firstName,
      last_name: input.contact.lastName,
      email: input.contact.email,
      phone: input.contact.phone,
      address_1: input.address?.street ?? '',
      city: input.address?.city ?? '',
      state: input.address?.province ?? '',
      country: 'ZW',
    },
    shipping:
      input.fulfilment === 'delivery' && input.address
        ? {
            first_name: input.contact.firstName,
            last_name: input.contact.lastName,
            address_1: input.address.street,
            city: input.address.city,
            state: input.address.province,
            country: 'ZW',
          }
        : undefined,
    line_items: input.lineItems.map((item) => ({
      product_id: Number(item.productId),
      quantity: item.quantity,
    })),
    customer_note: notesParts.join(' | '),
  };

  return wooFetch<WooOrder>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function getOrder(id: string): Promise<WooOrder> {
  return wooFetch<WooOrder>(`/orders/${id}`);
}
