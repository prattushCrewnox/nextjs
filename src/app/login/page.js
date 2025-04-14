"use client"; // to make it client side component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      // Replace with your actual API endpoint
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("login complete");
      router.push("/profile");
    } catch (error) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setButtonDisable(false);
    else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 text-white"
        onSubmit={handleSubmit}
      >
      <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full border-0 py-1.5 px-3 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
         <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 px-3 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded-md "
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4 ">
        Don't have an account?{" "}
        <Link href="/signup" className="font-bold text-md text-blue-500">
          Signup
        </Link>
      </p>
    </div>
  );
}
