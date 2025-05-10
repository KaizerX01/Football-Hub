import { z } from "zod";
import { supabase } from "./supabase";

export const RegisterEmail = async (email: string) => {
  const validator = z.object({
    email: z.string().email(),
  });

  const parsed = validator.safeParse({ email });
  if (!parsed.success) {
    return { error: "Invalid email format", data: null };
  }

  // Insert the email into the database
  const { data, error } = await supabase
    .from('subscribed_emails')
    .insert([{ email }]);

  if (error) {
    // Log the full error object for more details
    console.error("Supabase Insert Error:", error);

    // Check for unique constraint violation error (duplicate email)
    if (error.code === '23505') {
      return { error: "Email already in use", data: null };
    }

    // Return the full error message
    return { error: error.message || "Error, try again later!", data: null };
  }

  return { data: "Inserted successfully", error: null };
};
