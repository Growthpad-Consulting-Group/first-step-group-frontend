import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'First Step brings together the world’s leading finishing brands for Zimbabwean homes — considered curation, personal guidance and a showroom built to help you decide with confidence.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const BOOK_VISIT_HREF = '/contact?type=showroom-visit';

const VALUES_ROWS = [
  {
    icon: 'solar:layers-linear',
    title: 'CURATED SELECTION',
    description: 'A considered mix of respected global brands, complementary materials and products selected to work across complete interiors.',
  },
  {
    icon: 'solar:users-group-rounded-linear',
    title: 'EXPERT GUIDANCE',
    description: 'Compare finishes, understand technical requirements and make decisions with a team that sees the whole space.',
  },
  {
    icon: 'tabler:truck',
    title: 'LOCAL DELIVERY',
    description: 'Global access supported locally—from product selection and specification to coordinated delivery across Zimbabwe.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/images/difference-lifestyle.jpg"
            alt="First Step curated interior finishes"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="container-fluid grid grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:py-0">
          <div className="flex flex-col lg:py-16 lg:pr-12">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Our Story
            </h4>
            <h1 className="font-display mt-4 text-4xl font-light uppercase leading-tight tracking-tight text-cream sm:text-5xl">
              A MORE CONSIDERED WAY
              <br />
              TO FINISH A HOME.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dark">
              First Step brings together exceptional global brands, 
              local expertise and considered delivery to make premium home finishing simpler across Zimbabwe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={BOOK_VISIT_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Visit The Showroom
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
              <Link
                href='/brands'
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-cream/40 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                EXPLORE OUR BRANDS
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-auto pt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              CURATED  •  GUIDED  •  DELIVERED ACROSS ZIMBABWE
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-md lg:hidden">
            <Image
              src="/images/difference-lifestyle.jpg"
              alt="First Step curated interior finishes"
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
              WHY FIRST STEP
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              THE RIGHT PRODUCT
              <br />
              IS ONLY THE BEGINNING.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-light">
              Choosing finishes for a complete interior means balancing design, performance, 
              compatibility and availability. First Step exists to bring those decisions together.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-light">
              We curate respected brands, help clients compare materials and technical requirements, 
              and coordinate the details from selection through delivery.
            </p>
          </div>

          <div className="relative aspect-10/7 overflow-hidden rounded-md">
            <Image
              src="/images/materials-in-real-context.webp"
              alt="Stone, timber and metal finishes curated by First Step"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-ink/85 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                MATERIALS IN REAL CONTEXT  •  FINISH  •  SCALE  •  DETAIL
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-fluid grid grid-cols-1 gap-6 pb-16 sm:grid-cols-3 lg:pb-20">
          {VALUES_ROWS.map((card) => (
            <div
              key={card.title}
              className="group bg-white p-8 transition-colors hover:bg-slate"
            >
              <div className="flex items-start justify-between gap-4">
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
                OUR APPROACH
              </p>
              <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-cream sm:text-3xl">
                FROM INSPIRATION TO
                <br />
                A FINISHED SPACE.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-cream-dark lg:justify-self-end lg:text-left">
              A clearer path from first idea to confident specification—bringing product,
              finish and practical requirements into one considered journey.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: '/icons/discover.svg',
                title: 'DISCOVER',
                description: 'Start with the room, references, dimensions or a product you already love.',
              },
              {
                 icon: '/icons/compare.svg',
                title: 'COMPARE',
                description: 'See materials, finishes and complementary products together, not in isolation.',
              },
              {
                 icon: '/icons/specify.svg',
                title: 'SPECIFY',
                description: 'Resolve product, finish and technical requirements with specialist guidance.',
              },
               {
                 icon: '/icons/coordinate.svg',
                title: 'COORDINATE',
                description: 'We support sourcing and delivery so the selected solution can move forward with confidence.',
              },
            ].map((card) => (
              <div key={card.title} className="group flex flex-col bg-slate-muted p-8">
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
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dark">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold text-left">
            CURATED GLOBALLY.  GUIDED LOCALLY.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-88 lg:min-h-full">
            <Image
              src="/images/contact-hero.webp"
              alt="First Step showroom interior in Borrowdale, Harare"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col bg-cream p-8 sm:p-10 lg:p-16 lg:pr-[max(4rem,calc((100vw-87.5rem)/2+2rem))]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Our Home In Borrowdale
            </p>
            <h2 className="font-display mt-4 text-2xl font-light uppercase leading-tight tracking-tight text-ink sm:text-3xl">
              Design becomes real
              <br />
              when you can feel it.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-light">
              Our showroom is where the story comes together—working
              displays, real materials and personal guidance in one
              considered environment.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={BOOK_VISIT_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xs bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Visit Showroom
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xs border border-ink/20 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-ink/5"
              >
                Start an Enquiry
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-auto pt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              BORROWDALE, HARARE  •  PRIVATE CONSULTATIONS  •  WALK-INS WELCOME
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
