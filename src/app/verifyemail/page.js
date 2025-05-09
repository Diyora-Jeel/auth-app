'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
    
    const router = useRouter();
    const [token, setToken] = useState("")

    const verifyUserEmail = async () => {
        try {
            if(token != "")
            {
                const response = await axios.post("/api/verifyemail",{token})
                if(response.data.success)
                {
                    router.push("/login")
                }
            }
        } catch (error) {
            setError(error.response.data)
            console.log(error.message)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        console.log(urlToken)
        setToken(urlToken || "")
    },[])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Verify Your Email</h1>
          <p className="text-gray-600">
            Please click the button below to receive a verification link.
          </p>
  
          <button
            onClick={verifyUserEmail}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Send Verification Email
          </button>
  
          <p className="text-sm text-gray-500">
            Didn’t receive it? Check your spam folder or click again.
          </p>
        </div>
      </div>
    )
}
