'use client'

import axios from "axios";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgotPasswordEmailPage() {

  // const router = useRouter();
  const [email, setEmail] = useState("");

  const onEmailVerify = async () => {
    try {
      if (email != "") {
          const response = await axios.post("/api/forgotpassword", { email });
          // router.push("/verifyforgotpassword");
      }
    } catch (error) {
       console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Enter your email and we'll send you a password reset link.
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={onEmailVerify}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}
