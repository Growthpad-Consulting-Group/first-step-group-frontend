'use client';

import { motion } from 'framer-motion';
import type { Department } from '@/data/departments';
import DepartmentCard from './DepartmentCard';

interface DepartmentSectionProps {
  id?: string;
  eyebrow: string;
  heading: string[];
  description: string;
  departments: Department[];
  startIndex: number;
  tone: 'light' | 'dark';
  cardVariant: 'overlay' | 'split';
}

export default function DepartmentSection({
  id,
  eyebrow,
  heading,
  description,
  departments,
  startIndex,
  tone,
  cardVariant,
}: DepartmentSectionProps) {
  const isDark = tone === 'dark';

  return (
    <section id={id} className={isDark ? 'bg-slate' : 'bg-cream'}>
      <div className="container-fluid py-20 sm:py-28">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h4
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-gold-light' : 'text-gold-dark'}`}
            >
              {eyebrow}
            </h4>
            <h3
              className={`font-display mt-3 max-w-2xl text-2xl font-light uppercase tracking-tight sm:text-3xl ${isDark ? 'text-cream' : 'text-ink'}`}
            >
              {heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
          </motion.div>
          <p
            className={`max-w-md text-base leading-relaxed ${isDark ? 'text-cream-dark' : 'text-ink-light'}`}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {departments.map((department, i) => (
            <DepartmentCard
              key={department.slug}
              department={department}
              index={startIndex + i}
              variant={cardVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
