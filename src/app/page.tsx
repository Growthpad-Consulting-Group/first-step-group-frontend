import Hero from '@/features/home/components/Hero';
import Collections from '@/features/home/components/Collections';
import Difference from '@/features/home/components/Difference';
import Brands from '@/features/home/components/Brands';
import Showroom from '@/features/home/components/Showroom';
import Insights from '@/features/home/components/Insights';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Collections />
      <Difference />
      <Brands />
      <Showroom />
      <Insights />
    </div>
  );
}
