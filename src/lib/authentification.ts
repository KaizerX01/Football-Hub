import { supabase } from "./supabase";
import { z } from "zod";

export interface User {
    email: string;
    password: string;
}

export interface newUser {
    name:string;
    email: string;
    password: string;
    Country:string
}

export const  login = async (user: User) => {

    const loginSchema = z.object({
        email : z.string().email('Invalid Email!'),
        password : z.string().min(6,'Password must contain more than 6 caracteres')
    })

    const parsed = loginSchema.safeParse(user);

    if (!parsed.success) {

        const issues = parsed.error.errors;
        return { error: issues[0]?.message || "Invalid input", data: null };
      }
    
      const { data, error } = await supabase.auth.signInWithPassword(user);
    
      if (error) {
        return { error: error.message || "Login failed", data: null };
      }
    
      return { data, error: null };

}


export const  SignUp = async (user: newUser) => {

    const signUpSchema = z.object({
        name:z.string().min(1,'name must contain at least 1 caracteres'),
        email : z.string().email('Invalid Email!'),
        password : z.string().min(6,'Password must contain more than 6 caracteres'),
        Country : z.string(),

    })


    const parsed = signUpSchema.safeParse(user);

    if (!parsed.success) {

        const issues = parsed.error.errors;
        return { error: issues[0]?.message || "Invalid input", data: null };
      }

      const {data : existingUser , error : Eerror} = await supabase.from('users').
      select("email").eq("email" ,user.email).single();

      if(existingUser){
        return { error: "Email already in use", data: null };
      }



    
    const { data :authUser , error : signUpError } = await supabase.auth.signUp({
        email : user.email,
        password :user.password,
      });
    
    if (signUpError) {
        return { error: signUpError.message || "Login failed", data: null };
      }

    const { data: newUserData, error: insertError} = await supabase.from('users').insert([
        {
          id : authUser?.user?.id,
          email : user.email ,
          name : user.name,
          Country:user.Country
        }
      ])

      if (insertError) {
        return { error: insertError.message || 'Failed to save user data', data: null };
      }
    
      return { data : newUserData, error: null };

}

export const SignOut = async () =>{
  const {error} = await supabase.auth.signOut();
  return error;

}