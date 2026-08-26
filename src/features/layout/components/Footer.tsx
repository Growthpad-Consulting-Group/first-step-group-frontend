import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import InquireButton from '@/shared/ui/InquireButton';

const COLLECTIONS_LINKS = [
  { label: 'Bathroom & Wet Rooms', href: '/collections/bathroom' },
  { label: 'Kitchen & Surfaces', href: '/collections/kitchen' },
  { label: 'Climate Control', href: '/collections/hvac' },
  { label: 'Home Tech', href: '/collections/home-tech' },
];

const COMPANY_LINKS = [
  { label: 'Our Brands', href: '/brands' },
  { label: 'Our Showroom', href: '/showroom' },
  { label: 'Journal', href: '/journal' },
  { label: 'Our Story', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="container-fluid">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-left">
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              Get in Touch
            </h4>
            <h3 className="font-display mt-3 text-2xl font-normal uppercase tracking-tight text-white lg:text-[40px]">
              Luxury Starts With
              <br />
              The Right First Step.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <InquireButton className="inline-flex px-8 py-4 text-xs" />
            <Link
              href="https://wa.me/26378230418"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xs bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-cream-dark"
            >
              <Icon icon="mdi:whatsapp" className="h-4 w-4" />
              WhatsApp Us
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.svg"
              alt="First Step — Premium Building"
              width={160}
              height={64}
              className="h-28 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-cream">
              Premium home finishing—sourced globally, delivered across
              Zimbabwe.
            </p>
          </div>

          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              Collections
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              {COLLECTIONS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              Company
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-cream">
                <Icon
                  icon="solar:phone-linear"
                  className="h-4.5 w-4.5 shrink-0 text-gold"
                />
                +263 78 230 418
              </li>
              <li className="flex items-center gap-3 text-sm text-cream">
                <Icon
                  icon="solar:map-point-linear"
                  className="h-4.5 w-4.5 shrink-0 text-gold"
                />
                Borrowdale, Harare
              </li>
              <li className="flex items-start gap-3 text-sm text-cream">
                <Icon
                  icon="solar:clock-circle-linear"
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold"
                />
                <span>
                  Monday–Friday 8:00–17:00
                  <br />
                  Saturday 9:00–13:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-8 text-xs text-[#adadad] sm:flex-row sm:items-center sm:gap-8">
          <p>© First Step {new Date().getFullYear()}</p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
