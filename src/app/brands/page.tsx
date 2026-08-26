import type { Metadata } from 'next';
import { BRANDS } from '@/data/brands';
import { SITE_URL } from '@/lib/site';
import BrandsHero from '@/features/brands/components/BrandsHero';
import SignatureBrandHouses from '@/features/brands/components/SignatureBrandHouses';
import BrandPortfolioGrid from '@/features/brands/components/BrandPortfolioGrid';
import GuidedSelectionSection from '@/shared/ui/GuidedSelectionSection';

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
      <GuidedSelectionSection
        eyebrow="Guided By First Step"
        heading="Choose the right brand for the way you live."
        description="Our showroom team helps you compare design language, finishes, technical requirements and complementary products across the complete brand portfolio."
        steps={[
          {
            number: '01',
            title: 'Start with the room',
            description: 'Define the space, priorities and practical requirements.',
          },
          {
            number: '02',
            title: 'Compare design language',
            description: 'Review forms, finishes and complementary collections together.',
          },
          {
            number: '03',
            title: 'Specify performance',
            description: 'Match technical performance to the needs of your project.',
          },
        ]}
        image="/images/showroom.jpg"
        imageAlt="First Step showroom material library"
        primaryLabel="Visit Showroom"
        primaryHref="/showroom"
      />
    </div>
  );
}
