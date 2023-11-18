import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import DashboardPage from "./dashboard/page";

export default async function Home() {
  const session = await getServerSession(options);
  console.log("🚀 ~ file: page.tsx:7 ~ Home ~ session:", session);

  return <>{session ? <h1> hi</h1> : <h1> NOt Allowed</h1>}</>;
}
