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
      className="font-bold"
      isOpen={open}
      onClose={handleToggleModal}
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
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
            <Button type="submit">SignIn</Button>
            <Link href={"./login"}>
              <Button type="button" onClick={handleToggleModal}>
                Cancel
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
