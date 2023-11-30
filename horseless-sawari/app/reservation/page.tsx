"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

export interface IRegistrationType {
  pickUp: string;
  dropOff: string;
}

const RegisterSchema = yup.object().shape({
  pickUp: yup.string().required("username is required").min(2),
  dropOff: yup.string().required("Password is required").min(8),
});

const ReservationPage = () => {
  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  return (
    <div className=" m-[30px]">
      <div className="max-w-[1440px] m-auto text-white sm:text-[23px] text-[20px]  p-[27px] font-bold text-center">
        Unlock freedom, Get on the Road-Share the Adventure.
        <div className="sm:text-[15px] text-[20px]">
          Budget Nepal Car Rental
        </div>
      </div>
      <button className="bg-purple p-[10px]">MAKE A RESERVATION </button>
      <div className="max-w-[1440px] m-auto bg-purple ">
        <Form {...form}>
          <form className="grid grid-cols-3">
            <div className="grid grid-rows-2 gap-[20px] p-[20px]">
              <FormField
                control={form.control}
                name="pickUp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Pick Up location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropOff"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Drop Off Location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReservationPage;
