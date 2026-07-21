import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [authToken, setAuthToken] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handler = (e) => {
    const { name, value } = e.target;
    setData((res) => ({
      ...res,
      [name]: value,
    }));
  };

  let querClint = useQueryClient();
  const createAccount = useMutation({
    mutationFn: async (data) => {
      return axios.post("http://localhost:5000/account", data);
    },
    onSuccess: () => {
      querClint.invalidateQueries({
        queryKey: ["Account"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const googleAuth = useMutation({
    mutationFn: async (data) => {
      return axios.post("http://localhost:5000/googleAuth", data, {
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
      querClint.invalidateQueries({
        queryKey: ["AuthToken"],
      });
      console.log(res.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const summitData = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
    createAccount.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>SocialHub</h1>
        <p>Connect with your friends.</p>

        <form>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => {
              handler(e);
            }}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => {
              handler(e);
            }}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              handler(e);
            }}
            placeholder="Password"
            required
          />

          <button
            type="button"
            onClick={() => {
              summitData();
              console.log(data.email);
              localStorage.setItem("verifyEmail", JSON.stringify(data.email));
              localStorage.setItem("token", JSON.stringify(true));
              navigate("/email");
            }}
          >
            Login
          </button>
          <div className="">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                googleAuth.mutate({
                  token: credentialResponse.credential,
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            ></GoogleLogin>
          </div>
        </form>

        <p className="signup">
          Don't have an account? <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
}
