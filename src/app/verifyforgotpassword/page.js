"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState , useEffect } from "react";

export default function VerifyForgotPassword() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const onReset = async () => {
    try {
      if (token != "") {
        const response = await axios.post("/api/verifyforgotpassword", {token, password});
        router.push("/login");
      }
    } catch (error) {
      console.log("Signup failed " + error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h1>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={onReset}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}
