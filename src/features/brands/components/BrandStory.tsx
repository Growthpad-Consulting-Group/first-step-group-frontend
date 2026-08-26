import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Brand } from '@/data/brands';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function BrandStory({ brand }: { brand: Brand }) {
  return (
    <section className="bg-cream">
      <div className="container-fluid grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-2">
        <div className="relative aspect-4/5 overflow-hidden rounded-md lg:aspect-auto">
          <Image src={brand.image} alt={brand.name} fill className="object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            The Brand
          </p>
          <h2 className="font-display mt-3 text-3xl font-light uppercase tracking-tight text-ink sm:text-4xl">
            {brand.tagline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">{brand.description}</p>

          <Link
            href={getWhatsAppUrl(`Hi, I'd like to know more about ${brand.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
          >
            Inquire About {brand.name}
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
