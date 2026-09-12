import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { SITE_URL } from '@/lib/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Showroom',
  description:
    'Visit the First Step showroom in Borrowdale, Harare — see finishes, fittings and full room sets in person, with specialist guidance for your project.',
  alternates: { canonical: `${SITE_URL}/showroom` },
};

const BOOK_VISIT_HREF = '/contact?type=showroom-visit';

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Arrive',
    description: 'Share your plans, priorities and project context.',
  },
  {
    number: '02',
    title: 'Explore',
    description: 'Compare working displays, finishes and proportions.',
  },
  {
    number: '03',
    title: 'Select',
    description: 'Leave with a considered shortlist for your space.',
  },
];

const VISIT_PLAN_ROWS = [
  {
    icon: 'solar:calendar-linear',
    title: 'By Appointment',
    description: 'Dedicated time with a showroom specialist.',
  },
  {
    icon: 'solar:buildings-2-linear',
    title: 'Walk-Ins Welcome',
    description: 'Visit during showroom opening hours.',
  },
  {
    icon: 'solar:clipboard-list-linear',
    title: 'What To Bring',
    description: 'Plans, dimensions, moodboards or material samples.',
  },
];

const VISIT_ROWS = [
  {
    icon: 'solar:map-point-linear',
    label: 'First Step Showroom',
    value: '1 Dungarvan W Rd, Borrowdale, Harare, Zimbabwe',
  },
  {
    icon: 'solar:clock-circle-linear',
    label: 'Opening Hours',
    value: 'Monday–Friday  8:00–17:00\nSaturday  9:00–13:00  •  Sunday by appointment',
  },
  {
    icon: 'solar:phone-linear',
    label: 'Call The Showroom',
    value: '+263 78 230 418',
  },
];

const DIRECTIONS_HREF =
  'https://www.google.com/maps/dir/?api=1&destination=1+Dungarvan+W+Rd%2C+Harare%2C+Zimbabwe';

export default function ShowroomPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/images/contact-hero.webp"
            alt="First Step showroom interior"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="container-fluid grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:py-0">
          <div className="flex flex-col lg:py-16 lg:pr-12">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Visit First Step
            </h4>
            <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
              See it, feel it,
              <br />
              then specify.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
              Our Borrowdale showroom brings the collections together in full
              room sets and working displays, with a specialist on hand to guide
              your project from first idea to final selection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={BOOK_VISIT_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Book a Visit
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
              <Link
                href={getWhatsAppUrl('Hi First Step, I would like to plan a showroom visit.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-cream/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                <Icon icon="mdi:whatsapp" className="h-4 w-4" />
                WhatsApp Us
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-auto pt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              PRIVATE CONSULTATIONS  •  WALK-INS WELCOME
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-md lg:hidden">
            <Image
              src="/images/showroom.jpg"
              alt="First Step showroom interior"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-fluid grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Visit First Step
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              Design becomes real
              <br />
              when you can feel it.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-light">
              Our Borrowdale showroom brings complete spaces to life. Compare
              finishes under real light, explore working displays and discover
              combinations that are difficult to understand from a catalogue
              alone.
            </p>
          </div>

          <div className="relative aspect-10/7 overflow-hidden rounded-md">
            <Image
              src="/images/materials-in-real-context.webp"
              alt="Stone, timber and metal finishes displayed in the First Step showroom"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Materials In Real Context
              </p>
              <ul className="mt-4 flex flex-row flex-wrap gap-x-8 gap-y-2">
                {[
                  ['01', 'Stone Surfaces'],
                  ['02', 'Timber Cabinetry'],
                  ['03', 'Metal Detailing'],
                ].map(([number, label]) => (
                  <li key={number} className="flex items-baseline gap-3">
                    <span className="text-xs font-semibold text-gold">{number}</span>
                    <span className="text-sm font-medium uppercase tracking-wide text-cream">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-fluid grid grid-cols-1 gap-6 pb-16 sm:grid-cols-3 lg:pb-20">
          {[
            {
              number: '01',
              icon: 'solar:users-group-rounded-linear',
              title: 'Personal Guidance',
              description:
                'Work one-to-one with specialists who understand products, finishes and practical project requirements.',
            },
            {
              number: '02',
              icon: 'solar:monitor-linear',
              title: 'Working Displays',
              description:
                'Experience proportions, operation and performance through displays designed to be explored.',
            },
            {
              number: '03',
              icon: 'solar:layers-linear',
              title: 'Curated Collections',
              description:
                'Compare complementary brands and materials together, with a considered point of view.',
            },
          ].map((card) => (
            <div
              key={card.number}
              className="group bg-white p-8 transition-colors hover:bg-slate"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark transition-colors group-hover:text-gold">
                  {card.number}
                </span>
                <Icon
                  icon={card.icon}
                  className="h-6 w-6 shrink-0 text-gold-dark transition-colors group-hover:text-gold"
                />
              </div>
              <h3 className="font-display mt-4 text-lg font-light uppercase tracking-tight text-slate transition-colors group-hover:text-cream">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-light transition-colors group-hover:text-cream-dark">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate">
        <div className="container-fluid py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                What You Can Experience
              </p>
              <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-cream sm:text-3xl">
                Explore complete
                <br />
                environments.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-cream-dark lg:justify-self-end lg:text-right">
              Discover products, materials and technologies presented together
              in considered, complete settings.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                number: '01',
                icon: '/icons/bathroom.svg',
                title: ['Bathroom &', 'Wet Rooms'],
                description:
                  'Baths, basins, mixers, showers and finishes presented in complete settings.',
                cta: 'View Bathroom',
                href: '/collections/bathroom',
              },
              {
                number: '02',
                icon: '/icons/kitchen.svg',
                title: ['Kitchens &', 'Surfaces'],
                description:
                  'Working sinks, taps, appliances and work surfaces selected for everyday performance.',
                cta: 'View Kitchen',
                href: '/collections/kitchen',
              },
              {
                number: '03',
                icon: '/icons/home-technology.svg',
                title: ['Home Technology', '& Climate'],
                description:
                  'Climate control and connected systems explored alongside the spaces they support.',
                cta: 'View Home Systems',
                href: '/collections/hvac',
              },
            ].map((card) => (
              <div key={card.number} className="group flex flex-col bg-slate-muted p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {card.number}
                </span>
                <div className="mt-4 flex h-8 w-8 items-center justify-center">
                  <Image
                    src={card.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-auto max-h-8 w-auto max-w-8"
                  />
                </div>
                <h3 className="font-display mt-4 text-lg font-light uppercase leading-tight tracking-tight text-cream">
                  {card.title[0]}
                  <br />
                  {card.title[1]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dark">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors group-hover:text-gold-light"
                >
                  {card.cta}
                  <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col bg-slate p-8 sm:p-10 lg:p-16 lg:pl-[max(4rem,calc((100vw-87.5rem)/2+2rem))]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              A Considered Visit
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-cream sm:text-3xl">
              From first look
              <br />
              to final selection.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dark">
              A guided showroom journey designed to turn inspiration into
              confident decisions.
            </p>

            <ol className="relative mt-10 border-l border-cream/20 pl-10">
              {JOURNEY_STEPS.map((step, index) => (
                <li
                  key={step.number}
                  className={`relative ${
                    index < JOURNEY_STEPS.length - 1 ? 'pb-10' : ''
                  }`}
                >
                  <span className="absolute -left-15 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-semibold text-ink">
                    {step.number}
                  </span>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-cream-dark">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-auto pt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Personal Guidance At Every Step
            </p>
          </div>

          <div className="flex flex-col bg-[#e8e3d7] p-8 sm:p-10 lg:p-16 lg:pr-[max(4rem,calc((100vw-87.5rem)/2+2rem))]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Plan Your Visit
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              Let&apos;s shape your
              <br />
              space together.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-light">
              Bring your plans, measurements or inspiration. Our team will help
              you explore the right products, finishes and combinations for
              your project.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {VISIT_PLAN_ROWS.map((row) => (
                <div key={row.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-gold-dark">
                    <Icon icon={row.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-ink">
                      {row.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-light">
                      {row.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
              <Link
                href={BOOK_VISIT_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Book a Showroom Visit
              </Link>
              <Link
                href={getWhatsAppUrl('Hi First Step, I would like to plan a showroom visit.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-ink/20 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink/5"
              >
                WhatsApp Us
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f4ec]">
        <div className="container-fluid grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Find Us
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              Borrowdale,
              <br />
              Harare.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-light">
              Visit the First Step showroom for personal guidance, working
              displays and a considered selection of global finishing brands.
            </p>

            <ul className="mt-8 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
              {VISIT_ROWS.map((row) => (
                <li key={row.label} className="flex items-start gap-4 py-5">
                  <Icon
                    icon={row.icon}
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark"
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-light">
                      {row.label}
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm text-ink">
                      {row.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-88 overflow-hidden">
            <iframe
              title="First Step showroom location — Borrowdale, Harare"
              src="https://www.google.com/maps?q=1+Dungarvan+W+Rd,+Harare,+Zimbabwe&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
            <Link
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 top-0 bg-ink/85 p-6 transition-colors hover:bg-ink sm:p-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                Visit First Step
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-cream">
                Borrowdale, Harare &nbsp;•&nbsp; Open Live Directions
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
