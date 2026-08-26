import { NextResponse } from 'next/server';
import { createOrder, type PaymentMethod, type FulfilmentMethod } from '@/lib/woo/orders';
import { getProductsByIds } from '@/lib/woo/products';

interface CheckoutRequestBody {
  contact: { firstName: string; lastName: string; email: string; phone: string };
  fulfilment: FulfilmentMethod;
  address?: { street: string; city: string; province: string; notes?: string };
  paymentMethod: PaymentMethod;
  lineItems: { productId: string; quantity: number }[];
  acceptedTerms: boolean;
}

const VALID_PAYMENT_METHODS: PaymentMethod[] = ['bank-transfer', 'pay-by-quote'];

export async function POST(request: Request) {
  let body: CheckoutRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { contact, fulfilment, address, paymentMethod, lineItems, acceptedTerms } = body;

  if (!contact?.firstName || !contact?.lastName || !contact?.email || !contact?.phone) {
    return NextResponse.json({ error: 'Missing contact details' }, { status: 400 });
  }
  if (fulfilment === 'delivery' && (!address?.street || !address?.city || !address?.province)) {
    return NextResponse.json({ error: 'Missing delivery address' }, { status: 400 });
  }
  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    return NextResponse.json({ error: 'Invalid or unavailable payment method' }, { status: 400 });
  }
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }
  if (!acceptedTerms) {
    return NextResponse.json({ error: 'Order details must be confirmed' }, { status: 400 });
  }

  // Never trust the client: re-verify every line is a real, currently-buyable product.
  const products = await getProductsByIds(lineItems.map((item) => item.productId));
  for (const item of lineItems) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || product.purchaseMode !== 'buy') {
      return NextResponse.json(
        { error: 'One or more items in your cart are no longer available to purchase' },
        { status: 409 },
      );
    }
  }

  try {
    const order = await createOrder({
      contact,
      fulfilment,
      address,
      paymentMethod,
      lineItems,
    });
    return NextResponse.json({ orderId: order.id, orderNumber: order.number });
  } catch (error) {
    console.error('Order creation failed', error);
    return NextResponse.json({ error: 'Could not create order' }, { status: 502 });
  }
}
