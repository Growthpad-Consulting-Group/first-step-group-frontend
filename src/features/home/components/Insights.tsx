'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Article {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
}

const ARTICLES: Article[] = [
  {
    image: '/images/journal-timeless-bathroom.jpg',
    category: 'Design Trends',
    title: 'How to Build a Timeless Bathroom',
    excerpt:
      'A considered approach to materials, proportions and finishes that will age beautifully.',
    href: '/journal/timeless-bathroom',
  },
  {
    image: '/images/journal-design-process.jpg',
    category: 'Podcast',
    title: 'Inside the Design Process',
    excerpt:
      'Conversations with designers and makers shaping refined spaces across the region.',
    href: '/journal/inside-the-design-process',
  },
  {
    image: '/images/journal-borrowdale-home.jpg',
    category: 'Project Spotlight',
    title: 'A Borrowdale Home in Quiet Balance',
    excerpt:
      'A closer look at the details behind a calm, tactile and carefully resolved interior.',
    href: '/journal/borrowdale-home-quiet-balance',
  },
];

export default function Insights() {
  return (
    <section className="bg-slate py-20 sm:py-28">
      <div className="container-fluid">
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              Journal
            </h4>
            <h3 className="font-display mt-4 text-3xl font-light uppercase tracking-tight text-white lg:text-[40px]">
              Design Thinking
              <br />
              From Borrowdale
            </h3>
          </div>

          <div className="flex flex-col items-start gap-6 lg:ml-auto">
            <p className="max-w-md text-lg leading-normal text-white">
              Stories, ideas and expert perspectives for considered homes.
            </p>
            <Link
              href="/journal"
              className="inline-flex shrink-0 items-center gap-2 rounded-xs bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              View All Journal
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="h-full"
            >
              <Link
                href={article.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-[#1b3c3c]"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {article.category}
                  </span>
                  <h3 className="font-display mt-3 text-2xl font-normal uppercase tracking-tight text-white">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-white">
                    {article.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-widest text-gold">
                    Read Article
                    <Icon icon="solar:arrow-right-linear" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
