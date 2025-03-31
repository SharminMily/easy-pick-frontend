"use server"

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"


interface ReCaptchaResponse {
   success: boolean;
   challenge_ts?: string;
   hostname?: string;
   "error-codes"?: string[];
 }

export const registerUser = async (userData: FieldValues) => {
   try {
    const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_API}/user`,{
        method: "POST",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
   })
   const result = await res.json();
   if(result.success){
   ( await cookies()).set("accessToken", result.data.accessToken);
 }

return result;

   } catch (error: any) {
    return Error(error)
   }
}


export const loginUser = async (userData: FieldValues) => {
   try {
    const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
        method: "POST",
        headers: {
           "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
   })
   const result = await res.json();
     if(result.success){
     ( await cookies()).set("accessToken", result.data.accessToken);
   }

  return result;
  
   } catch (error: any) {
    return Error(error)
   }
}

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if(accessToken){
   decodedData =  (await jwtDecode(accessToken))
   return decodedData;
  } else {
   return null
  }
}


export const reCaptchaTokenVerificatiom = async(token: string): Promise<ReCaptchaResponse> => {
   try {
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify",{
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
         body: new URLSearchParams({
            secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
            response: token,
         },)
      })
      return await res.json();
   }
    catch (error : any) {
      console.error("ReCaptcha verification error:", error);
      return { success: false }; // Return default response
   }
}

export const logout = async () => {
   (await cookies()).delete("accessToken");
}