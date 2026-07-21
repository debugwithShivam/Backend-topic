import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Email() {
  const navigate = useNavigate();
  const [OTP, SetOtp] = useState(["", "", "", "", "", ""]);
  const [otp, GetOtp] = useState("");

  const email = JSON.parse(localStorage.getItem("verifyEmail"));
  const verify = async () => {
    const finalOtp = OTP.join("");
   let response =  await axios.post("http://localhost:5000/verify-otp", {
      email,
      otp: finalOtp,
    });
    console.log(response.data)
  };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">📧</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">
            Verify Email
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-blue-600 font-medium mt-1">{email || "example@gmail.com"}</p>
        </div>
        <div className="flex justify-center gap-3 mt-8">
          {OTP.map((digit, i) => (
            <input
            key={i}
              maxLength={1}
              value={digit}
              inputMode="numeric"
              onChange={(e) => {
                const newOtp = [...OTP];
                newOtp[i] = e.target.value;
                SetOtp(newOtp);
              }}
              type="text"
              className="w-12 h-14 text-center text-xl font-semibold border rounded-lg outline-none focus:border-blue-500"
            />
          ))}
        </div>

        <div className="flex justify-center h-20 items-center">
          <button
            className=" bg-blue-600 hover:bg-blue-700 text-white p-2 w-50 h-10  rounded-lg font-semibold transition"
            onClick={() => {
              navigate("/");
              verify();
            }}
          >
            Verify OTP
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">Didn't receive the code?</p>

          <button className="text-blue-600 font-semibold mt-1 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
