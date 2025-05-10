import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";
import { z } from "zod";

export interface UpdatedUser{
  name:string,
  Country:string,
  password:string,
  avatar_url?:string
}

interface metadata_User{
  name:string,
  Country:string,
  avatar_url?:string
}

export function useLoggedInUser() {
  const [user, setUser] = useState<User | null>(null);
  const [metaData, setMetaData] = useState<metadata_User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false)

      if (user) {
        const { data, error: metaError } = await supabase
          .from("users")
          .select("name, Country, avatar_url")
          .eq("id", user.id)
          .single();

        if (data) {
          setMetaData(data);
        }

        if (metaError) {
          console.error("Error fetching user metadata:", metaError.message);
        }
      }
    };

    fetchUser();
  }, [setIsLoading, setUser]);

  return {
    user,
    isLoading,
    metaData
  };
}


export async function  UpdateUser (updatedUser : UpdatedUser){

  const UpdatedUserSchema = z.object({
    name:z.string().min(1,'the name should be at least 1 carractere'),
    Country:z.string(),
    avatar_url:z.string()
  })


  const parsed = UpdatedUserSchema.safeParse(updatedUser);
  if(!parsed.success){
    const issues = parsed.error.errors;
    return {data:null , error: issues[0]?.message || "Invalid input"}
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { data: null, error: "User not authenticated" };
  }

  const { error: Perror } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: updatedUser.password, 
  });

  if (Perror) {
    return { data: null, error: "Invalid password" };
  }


  const {data , error } =await supabase.from('users').update({
    name : updatedUser.name,
    Country:updatedUser.Country,
    avatar_url : updatedUser.avatar_url
  }).eq('id',user?.id);

  if(error){
    return {data:null , error:error.message}
  }

  return {data,error:null}
}

/*
export async function DeleteUser(currentUser : UpdatedUser) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || !user.email) {
    return { success: false, error: "User not authenticated" };
  }

  if (currentUser.password) {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentUser.password,
    });

    if (authError) {
      return { success: false, error: "Invalid password" };
    }

  }

  const {error :deleteMetaError} = await supabase.from('users').delete().eq('id' , user.id);

  if (deleteMetaError) {
    return { success: false, error: `Failed to delete user metadata: ${deleteMetaError.message}` };
  }


  const {error :deleteAuthError} = await supabase.auth.admin.deleteUser(user.id);

  if (deleteAuthError) {

    return { data: false, error: `Failed to delete user account: ${deleteAuthError.message}` };
  }
  return { success: true, error: null };

  }

  */


  