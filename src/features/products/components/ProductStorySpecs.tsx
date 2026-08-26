import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function ProductStorySpecs({ product }: { product: Product }) {
  const hasStory = Boolean(product.summary);
  const hasSpecs = product.specs.length > 0;

  if (!hasStory && !hasSpecs) return null;

  return (
    <section className="bg-cream-dark/40 dark:bg-white/5">
      <div className="container-fluid py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Product Details
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {hasStory && (
            <div className="rounded-md bg-white p-8 dark:bg-ink-light sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Why It Works
              </p>
              <p className="mt-4 leading-relaxed text-ink-light">{product.summary}</p>
            </div>
          )}

          {hasSpecs && (
            <div className="rounded-md bg-slate p-8 text-cream sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                Technical Specifications
              </p>
              <dl className="mt-6 flex flex-col divide-y divide-white/10">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-cream">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {product.specSheetUrl && (
                  <Link
                    href={product.specSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
                  >
                    Download Spec Sheet
                    <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href={getWhatsAppUrl(
                    `Hi, I have a technical question about ${product.name} (ref. ${product.reference ?? product.id}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:text-gold-light"
                >
                  Ask Technical Advice
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
