import { z } from "zod"
import { supabase } from "./supabase";


export const RegisterEmail = async (email: string) => {
    const validator = z.object({
      email: z.string().email(),
    });
  
    const parsed = validator.safeParse({ email });
    if (!parsed.success) {
      return { error: "Invalid email format", data: null };
    }
  
    const { data: existingUser } = await supabase
      .from('contactEmails')
      .select("email")
      .eq("email", email)
      .single();
  
    if (existingUser) {
      return { error: "Email already in use", data: null };
    }
  
    const { error } = await supabase
  .from('contactEmails')
  .insert([{ email }]);

if (error) {
  console.log(error);
  return { data: null, error: error.message || "Error, Try again later!" };
}

return { data: "Inserted successfully", error: null };

  
  };
  