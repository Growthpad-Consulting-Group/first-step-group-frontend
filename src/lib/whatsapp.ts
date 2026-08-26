const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '26378230418';

/**
 * Click-to-chat WhatsApp link per spec §7.5.6: https://wa.me/<number>?text=<encoded>.
 * NEXT_PUBLIC_ here (rather than the spec's bare WHATSAPP_NUMBER) because the number
 * is rendered into client-side links — it's not a secret, just a public contact number.
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
