"use client";
import { UpdateUser, useLoggedInUser } from "@/lib/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const ProfileForm = () => {
  const { metaData, isLoading, user } = useLoggedInUser();
  const [formData, setFormData] = useState({
    name: "",
    Country: "",
    password: "",
    avatar_url: "",
  });
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (metaData) {
      setFormData({
        name: metaData.name || "",
        Country: metaData.Country || "",
        password: "",
        avatar_url: metaData.avatar_url || "",
      });
      if (metaData.avatar_url) {
        setProfileImage(metaData.avatar_url);
      }
    }
  }, [metaData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Create a unique file path using timestamp to avoid conflicts
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;

      // Make sure you're uploading to the correct bucket with proper permissions
      const { error: uploadError, data } = await supabase.storage
        .from("profileimages") // Verify this bucket name exists and has proper RLS
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        toast.error(`Failed to upload image: ${uploadError.message}`);
        return;
      }

      // Get the public URL from the correct bucket
      const { data: publicUrlData } = supabase.storage
        .from("profileimages") // Use the same bucket name
        .getPublicUrl(fileName);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        toast.error("Failed to get image URL");
        return;
      }

      const publicUrl = publicUrlData.publicUrl;

      // Update state
      setProfileImage(publicUrl);
      setFormData((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await UpdateUser(formData);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Profile updated successfully!");
      router.push("/");
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50";
  const labelClasses = "block text-sm font-medium text-white/90 mb-1";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
          <div className="h-6 w-32 bg-white/10 animate-pulse rounded"></div>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-4 w-20 bg-white/10 animate-pulse rounded"></div>
            <div className="h-12 bg-white/10 animate-pulse rounded-md"></div>
          </div>
        ))}
        <div className="flex justify-center pt-6">
          <div className="h-12 w-32 bg-white/10 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-white/20"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <label className="px-4 py-2 bg-white/20 text-white rounded-md cursor-pointer hover:bg-white/30 transition-colors">
          Change Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="Country" className={labelClasses}>
          Country
        </label>
        <input
          type="text"
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Your country"
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Leave blank to keep current password"
        />
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className={`px-6 py-3 bg-white text-purple-900 font-semibold rounded-md hover:bg-white/90 transition-colors cursor-pointer ${
            isSubmitting || isUploading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
