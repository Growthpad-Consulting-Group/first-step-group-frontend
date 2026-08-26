import type { Metadata } from 'next';
import { BRANDS } from '@/data/brands';
import { SITE_URL } from '@/lib/site';
import BrandsHero from '@/features/brands/components/BrandsHero';
import SignatureBrandHouses from '@/features/brands/components/SignatureBrandHouses';
import BrandPortfolioGrid from '@/features/brands/components/BrandPortfolioGrid';

export const metadata: Metadata = {
  title: 'All Brands',
  description:
    "Explore globally recognised bathroom, kitchen, surface and home-technology brands—curated through one trusted local destination.",
  alternates: { canonical: `${SITE_URL}/brands` },
};

export default function BrandsPage() {
  const signatureBrands = BRANDS.filter((b) => b.signature);
  const portfolioBrands = BRANDS.filter((b) => !b.signature);

  return (
    <div className="flex flex-col">
      <BrandsHero />
      <SignatureBrandHouses brands={signatureBrands} />
      <BrandPortfolioGrid brands={portfolioBrands} />
    </div>
  );
}
