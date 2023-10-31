import Logo from "@/assests/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = async () => {
  // const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex my-9 sm:max-w-[1000px]  m-auto sm:flex-row flex-col">
        <div className="text-white flex flex-col sm:w-1/2 bg-purple px-[40px]">
          <Logo />
          <h1 className=" mt-[40px] whitespace-nowrap text-[32px] font-bold">
            Welcome Back!
          </h1>
          <h2 className="whitespace-nowrap font-medium text-[14px] mt-[9px] ">
            Please Log in to your Account.
          </h2>

          <div className="mt-[30px] flex flex-col gap-1">
            <label className="capitalize font-normal text-[12px]">
              Email address
            </label>
            <Input />
            {/* <Input value={value} onChange={(e) => setValue(e.target.value)} /> */}
          </div>
          <div className="mt-[14px] flex flex-col gap-1 ">
            <label className="capitalize font-normal text-[12px]">
              Password
            </label>
            <Input type="password" />
          </div>
          <div className=" flex justify-end mt-2">
            <Link href="/" className="text-[10px] text-red-700">
              Forget password?
            </Link>
          </div>
          <div>
            <Button variant="secondary" className="bg-purple border-2">
              Sign in
            </Button>
            <Button variant="outline" className="border-purple border-2">
              Sign in
            </Button>
          </div>
        </div>
        <div className="relative h-[580px] w-1/2">
          <Image
            src="/images/loginImage.png"
            alt="hero"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
