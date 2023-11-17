"use client";
import Logo from "@/assests/logo";
import SignUpModal from "@/components/modal/signUp-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
interface IloginType {
  username: string;
  password: string;
}
const loginSchema = yup.object().shape({
  username: yup.string().required("username is required").min(2),
  password: yup.string().required("Password is required").min(8),
});

const LoginPage: React.FC<IloginType> = () => {
  // const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  const submit = async (values: IloginType) => {
    console.log("🚀 ~ file: page.tsx:43 ~ submit ~ values:", values);
    try {
      const loginData = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      console.log("🚀 ~ file: page.tsx:45 ~ submit ~ loginData:", loginData);

      if (loginData.error) {
        console.log(loginData.error);
      } else {
        console.log("Success");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  // const [value, setValue ] = useState("");

  return (
    <div>
      <div className="flex sm:my-9 sm:max-w-[1000px] m-auto sm:flex-row flex-col">
        <div className="text-white flex flex-col sm:w-1/2 bg-purple px-[40px]">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className=" mt-[40px] whitespace-nowrap text-[32px] font-bold">
            Welcome Back!
          </h1>
          <h2 className="whitespace-nowrap font-medium text-[14px] mt-[9px] ">
            Please Log in to your Account.
          </h2>
          <div className="mt-[30px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submit)}
                className="flex flex-col gap-[8px]"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" flex justify-end mt-2">
                  <Link href="/" className="text-[10px] text-red-700 underline">
                    Forget password?
                  </Link>
                </div>
                <div className="flex justify-center ">
                  <Button
                    variant="secondary"
                    className=" bg-purple border-2 sm:mt-[0px] mt-[10px]"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border-purple border-2 max-w-[176px] sm:my-[15px] my-[20px] center"
              onClick={() => setOpen(true)}
            >
              CREATE MY ACCOUNT
            </Button>
          </div>
          <SignUpModal open={open} handleToggleModal={toggleModal} />
        </div>
        <div className="relative h-[580px] w-1/2 sm:block hidden">
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
