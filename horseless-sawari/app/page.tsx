import Hero from "@/components/hero/hero";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  if (session) {
    return (
      <div>
        Role: {session.user.role}
        <Hero />
      </div>
    );
  } else {
    return <div>NOt Allowed</div>;
  }
}
