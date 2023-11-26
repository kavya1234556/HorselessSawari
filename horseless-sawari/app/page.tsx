import Hero from '@/components/hero/hero';
import { getServerSession } from 'next-auth';
export default async function Home() {
  const session = getServerSession();
  if (session) {
    return (
      <div>
        <Hero />
      </div>
    );
  } else {
    return <div>"NOt Allowed"</div>;
  }
}
