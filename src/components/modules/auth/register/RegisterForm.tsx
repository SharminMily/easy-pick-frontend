"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
    <div className="flex items-center space-x-4 ">
      {/* <Logo /> */}
      <div>
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="font-extralight text-sm text-gray-600">
          Join us today and start your journey!
        </p>
      </div>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
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
              <FormLabel className="mt-2">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} value={field.value || ""} />
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
              <FormLabel className="mt-2">Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-2">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} value={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button onSubmit={onSubmit}
        className="bg-fuchsia-600 text-white hover:bg-fuchsia-800 w-full mt-3"
        >Register</Button>  
      </form>
    </Form>
    <p className="text-sm text-gray-600 text-center my-3">
      Already have an account ?
      <Link href="/login" className="text-fuchsia-700 font-semibold">
        Login
      </Link>
    </p>
  </div>
);
}