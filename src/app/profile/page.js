'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    useEffect(()=>{
      const onProfile = async () => {
        try {
          const response = await axios.post("/api/me");
          setUsername(response.data.user.user_name)
          setEmail(response.data.user.email)
        } catch (error) {
          console.log("Profile failed " + error.message);
        }
      };
      onProfile()
    },[])

    const onLogout = async () =>{
      try {
        const response = await axios("/api/logout")
        if(response)
        {
          router.push("/login")
        }
      } catch (error) {
        console.log("Logout failed " + error.message);
      }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
        <p className="text-gray-600">{email}</p>

        <button onClick={onLogout} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}
