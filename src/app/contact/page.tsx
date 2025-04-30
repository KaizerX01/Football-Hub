"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name) newErrors.name = "Name is required";
    if (!formState.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email))
      newErrors.email = "Email is invalid";
    if (!formState.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        const result = await useContact(formState);

        if (result.success) {
          setIsSubmitted(true);
          setFormState({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          toast.success("Message sent successfully");
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          throw new Error(result.error || "Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#2E0249] to-[#1d0767] text-white">
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-80 w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/mnt/data/d30674c5-1b06-4b0c-8516-a8b3b383e574.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 bg-[#2E0249] p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-4 text-purple-400 flex-shrink-0" />
                <p>123 Stadium Way, Football City, FC12 3ST</p>
              </div>
              <div className="flex items-start">
                <Phone className="mr-4 text-purple-400 flex-shrink-0" />
                <p>+44 123 456 7890</p>
              </div>
              <div className="flex items-start">
                <Mail className="mr-4 text-purple-400 flex-shrink-0" />
                <p>info@fcunited.com</p>
              </div>
            </div>
            <div className="mt-10">
              <h4 className="font-bold mb-2">Opening Hours</h4>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday (Match Days): 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="mt-10">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Football stadium"
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
          {/* Form */}
          <div className="md:col-span-2 bg-[#f9f9fc] text-gray-800 p-6 rounded-lg shadow-lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16">
                <CheckCircle size={64} className="text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Thank You!
                </h3>
                <p className="text-center text-gray-600">
                  Your message has been sent successfully. We'll get back to you
                  soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-6">
                  Send Us a Message
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Ticket inquiry, feedback, etc."
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.message ? "border-red-500" : "border-gray-300"}`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors flex items-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={16} className="ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
