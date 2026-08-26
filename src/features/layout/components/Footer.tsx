import Link from 'next/link';
import Image from 'next/image';

const COLLECTIONS_LINKS = [
  { label: 'Bathroom', href: '/collections/bathroom' },
  { label: 'Kitchen', href: '/collections/kitchen' },
  { label: 'HVAC', href: '/collections/hvac' },
  { label: 'Home Tech', href: '/collections/home-tech' },
];

const COMPANY_LINKS = [
  { label: 'Our Brands', href: '/brands' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Journal', href: '/journal' },
  { label: 'Our Story', href: '/about' },
];

const CONTACT_DETAILS = [
  '+263 781 230 418',
  '+27 769 730 167',
  'luxury@firststep-group.com',
  'Borrowdale, Harare',
];

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-left">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Get in Touch
            </h4>
            <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Luxury starts with <br/> the first step.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/enquire"
              className="inline-flex items-center rounded-md bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              Enquire Now
            </Link>
            <Link
              href="https://wa.me/27769730167"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-white px-8 py-4 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-zinc-100"
            >
              WhatsApp Us
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo.webp"
              alt="First Step — Premium Building"
              width={160}
              height={64}
              className="h-28 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              Premium home finishing — sourced globally, delivered across Zimbabwe.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Collections
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              {COLLECTIONS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Company
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-light">
              Contact
            </h5>
            <ul className="mt-4 flex flex-col gap-3">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail} className="text-sm text-zinc-400">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} First Step Group — Harare, Zimbabwe.
          </p>
        </div>
      </div>
    </footer>
  );
}
