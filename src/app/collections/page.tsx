import type { Metadata } from 'next';
import { DEPARTMENTS } from '@/data/departments';
import { SITE_URL } from '@/lib/site';
import CollectionsHero from '@/features/collections/components/CollectionsHero';
import DepartmentSection from '@/features/collections/components/DepartmentSection';
import GuidedSelection from '@/features/collections/components/GuidedSelection';

export const metadata: Metadata = {
  title: 'All Collections',
  description:
    'Explore considered bathroom, kitchen, climate-control and home-technology collections selected for lasting performance, quiet refinement and complete living.',
  alternates: { canonical: `${SITE_URL}/collections` },
};

export default function CollectionsPage() {
  const [bathroom, kitchen, climate, homeTech] = DEPARTMENTS;

  return (
    <div className="flex flex-col">
      <CollectionsHero />

      <DepartmentSection
        id="core-collections"
        eyebrow="The Core Collections"
        heading={['Designed around the rooms', 'that define daily life.']}
        description="Begin with the spaces you use most. Each collection combines considered design, trusted international brands and practical guidance for complete specification."
        departments={[bathroom, kitchen]}
        startIndex={0}
        tone="light"
        cardVariant="overlay"
      />

      <DepartmentSection
        eyebrow="Systems & Technology"
        heading={['Comfort and control,', 'considered together.']}
        description="Extend the same level of consideration beyond visible finishes — with systems that support comfort, efficiency and intuitive everyday living."
        departments={[climate, homeTech]}
        startIndex={2}
        tone="dark"
        cardVariant="split"
      />

      <GuidedSelection />
    </div>
  );
}
