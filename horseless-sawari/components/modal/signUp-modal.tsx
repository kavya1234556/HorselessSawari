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
import { Button } from "../ui/button";
import Link from "next/link";
import InputPassword from "../ui/inputPassword";
import useSignupForm from "@/app/login/hooks/useSignupForm";

type SignUpModalProps = {
  handleToggleModal: () => void;
  open: boolean;
  active?: string | null;
  data?: any;
};

const SignUpModal: React.FC<SignUpModalProps> = ({
  handleToggleModal,
  open,
}) => {
  const { form, submit } = useSignupForm();
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
                    <InputPassword field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
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
                Sign Up
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
