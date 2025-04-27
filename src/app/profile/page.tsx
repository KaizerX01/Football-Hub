"use client";

import ProfileForm from "@/Components/User/ProfileForm";

export default function UserPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-12 lg:px-16 xl:px-24 py-16 text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="max-w-3xl mx-auto space-y-8 bg-black/60 p-8 rounded-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <ProfileForm />
      </div>
    </main>
  );
}
