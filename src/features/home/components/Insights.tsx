'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Article {
  image: string;
  caption: string;
  excerpt: string;
  tag: string;
  href: string;
}

const ARTICLES: Article[] = [
  {
    image: '/images/bathroom.webp',
    caption: 'Design Trends',
    excerpt:
      'Five bathroom finishes every luxury home in Zimbabwe should consider this year',
    tag: 'Bathroom & Wet Rooms',
    href: '/journal/bathroom-finishes',
  },
  {
    image: '/images/showroom.webp',
    caption: 'Podcast',
    excerpt: 'Luxury living in Zimbabwe — what it means, and where it’s going',
    tag: 'Episode 1',
    href: '/journal/luxury-living-zimbabwe',
  },
  {
    image: '/images/kitchen.webp',
    caption: 'Project Spotlight',
    excerpt: 'Inside a Borrowdale kitchen transformation using Franke & Dado Quartz',
    tag: 'Kitchen & Surfaces',
    href: '/journal/borrowdale-kitchen',
  },
];

export default function Insights() {
  return (
    <section className="bg-slate py-20 sm:py-28">
      <div className="container-fluid">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div className="text-left">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Insights
            </h4>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Design thinking<br/> from Borrowdale
            </h3>
          </div>

          <Link
            href="/journal"
            className="hidden shrink-0 items-center rounded-md bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:inline-flex"
          >
            All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Link href={article.href} className="group block overflow-hidden bg-white">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.excerpt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <span className="absolute bottom-4 left-4 rounded-md bg-ink/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                    {article.caption}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-base font-normal leading-snug text-ink">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-xs font-medium uppercase tracking-widest text-slate">
                    {article.tag}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/journal"
          className="mt-10 inline-flex w-full items-center justify-center rounded-md bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:hidden"
        >
          All Articles
        </Link>
      </div>
    </section>
  );
}
