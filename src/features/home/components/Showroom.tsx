'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 – 17:00' },
  { day: 'Saturday', time: '9:00 – 13:00' },
  { day: 'Sunday', time: 'By appointment' },
];

const VISIT_HIGHLIGHTS = [
  { icon: 'solar:layers-linear', label: 'See every finish' },
  { icon: 'solar:tuning-2-linear', label: 'Compare materials' },
  { icon: 'solar:chat-square-linear', label: 'Expert guidance' },
];

function IconBadge({ icon }: { icon: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate text-white">
      <Icon icon={icon} className="h-5 w-5" />
    </span>
  );
}

export default function Showroom() {
  return (
    <section className="bg-cream">
      <div className="container-fluid grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start py-14 sm:py-20"
        >
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            Our Showroom
          </h4>
          <h3 className="font-display mt-3 text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
            Touch it. <br />
            Feel it. Live in it.
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-light">
            Our Borrowdale showroom is more than a product floor—it&apos;s an
            experience. See every finish, compare materials and get expert
            guidance for your project.
          </p>

          <div className="mt-8 w-full rounded-md bg-cream-dark p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <IconBadge icon="solar:map-point-linear" />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                  Visit Us
                </p>
                <p className="mt-1 text-sm font-medium text-ink">
                  Borrowdale, Harare, Zimbabwe
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-light">
                  <Icon icon="solar:phone-linear" className="h-4 w-4" />
                  +263 78 230 418
                </p>
              </div>
            </div>

            <div className="my-6 border-t border-ink/10" />

            <div className="flex items-start gap-4">
              <IconBadge icon="solar:clock-circle-linear" />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                  Opening Hours
                </p>
                <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 text-sm text-ink">
                  {HOURS.map((row) => (
                    <span key={row.day} className="contents">
                      <span>{row.day}</span>
                      <span className="text-ink-light">{row.time}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-ink/10" />

            <div className="flex items-center gap-3 text-sm text-ink-light">
              <Icon
                icon="solar:calendar-linear"
                className="h-5 w-5 shrink-0 text-gold"
              />
              Walk-ins are welcome. Reserve a consultation for dedicated project
              time.
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/enquire"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              <Icon icon="solar:calendar-linear" className="h-4 w-4" />
              Book a Visit
            </Link>
            <Link
              href="https://wa.me/27769730167"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xs bg-slate px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-slate-light"
            >
              <Icon icon="mdi:whatsapp" className="h-4 w-4" />
              WhatsApp Us
            </Link>
            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xs border border-ink px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink/5"
            >
              <Icon
                icon="qlementine-icons:gps-compass-16"
                className="h-4 w-4"
              />
              Get Directions
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col py-14 sm:py-20 lg:h-full"
        >
          <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1">
            <Image
              src="/images/showroom.jpg"
              alt="Inside the First Step showroom"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col gap-6 bg-slate p-8 sm:p-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                Why Visit In Person
              </p>
              <h3 className="font-display mt-3 text-xl font-light uppercase tracking-tight text-cream sm:text-2xl">
                See the details before you decide.
              </h3>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {VISIT_HIGHLIGHTS.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-cream"
                >
                  <Icon icon={item.icon} className="h-4 w-4 text-gold" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
