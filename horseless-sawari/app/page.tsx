import Hero from '@/components/hero/hero';
import { getServerSession } from 'next-auth';
export default async function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
