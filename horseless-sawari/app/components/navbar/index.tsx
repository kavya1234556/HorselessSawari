import Logo from "@/app/assests/logo";
import Button from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between bg-gray px-6 py-4">
      <Link href="/">
        <Logo />
      </Link>
      <Link href="/login">
        <Button title="Sign-In" containerStyles="rounded-full bg-white" />
      </Link>
    </div>
  );
};

export default Navbar;
