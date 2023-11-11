import React from "react";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import Link from "next/link";

export interface IloginType {
  email: string;
  password: string;
  username: string;
}

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  username: yup.string().required("username is required"),
});

const SignUpModal: React.FC<IloginType> = ({ handleToggleModal, open }) => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const submit = () => {
    console.log("hii");
  };
  return (
    <Modal
      title="Sign Up"
      className="font-bold max-w-[750px] sm:h-[] h-[652px] "
      isOpen={open}
      onClose={handleToggleModal}
    >
      <div className="mt-[30px] max-w-[650px] m-auto sm:p-[0] px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col gap-6"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
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
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6 justify-end">
              <Button
                type="submit"
                className="border border-purple "
                variant="outline"
              >
                SignIn
              </Button>
              <Link href={"./login"}>
                <Button
                  type="button"
                  className="bg-purple"
                  onClick={handleToggleModal}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
