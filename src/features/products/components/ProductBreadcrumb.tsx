import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function ProductBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="border-b border-cream-dark bg-cream dark:border-white/10 dark:bg-ink">
      <div className="container-fluid flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-widest text-ink-light">
        {crumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-ink-light/50">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-gold-dark">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gold-dark">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
