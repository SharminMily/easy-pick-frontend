"use client"
import ReCAPTCHA from "react-google-recaptcha";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerificatiom } from "@/services/AuthServices";
import { toast } from "sonner";
import { loginSchema } from "./loginValidations";
import { useState } from "react";

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false)

  const {formState: {isSubmitted}, } = form
   // console.log(password,passwordConfirm )

   const handleReCaptcha = async(value: string | null) => {
    console.log(value)
    try {
      const res = await reCaptchaTokenVerificatiom(value!);
          if(res?.success){
            setReCaptchaStatus(true)
          }

    } catch (error: any) {
      console.log(error)
    }
   }

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    try {
      const res = await loginUser(data)
      console.log(res, "server action user")
  
    if(res?.success){
      toast.success(res?.message)
    }
    else{
      toast.error(res?.message)
    }    
    } catch (error: any) {
      console.log(error)
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
    <div className="flex items-center space-x-4 ">
      {/* <Logo /> */}
      <div>
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="font-extralight text-sm text-gray-600">
          Wellcome back!
        </p>
      </div>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-2">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage className="text-red-500" />
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
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      
      <div className="flex mt-3  w-full">
      <ReCAPTCHA
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
    onChange={handleReCaptcha}
    className="mx-auto"
  />
      </div>

        <Button 
        disabled={reCaptchaStatus? false : true}
        type="submit" 
        className="bg-fuchsia-600 text-white hover:bg-fuchsia-800 w-full mt-3"
        >
          {isSubmitted? "logging....": "login"}
        </Button>  

      </form>
    </Form>
    <p className="text-sm text-gray-600 text-center my-3">
      Do not have any account ?
      <Link href="/register" className="text-fuchsia-700 font-semibold">
       Register
      </Link>
    </p>
  </div>
);
}