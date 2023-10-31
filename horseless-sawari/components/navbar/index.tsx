import Logo from "@/assests/logo";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between shadow-lg px-6 py-4">
      <Link href="/">
        <Logo />
      </Link>
      <Link href="/login">
        <Button variant="outline" className="border-purple border-2">
          Sign in
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
