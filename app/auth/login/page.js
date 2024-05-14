"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { actionType } from "@/app/store/reducer";
import { useStateValue } from "@/app/store/StateProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();
  const emptyFields = () => toast.error("All the fields are required");
  const wronUser = () => toast.error("Wrong user email or password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 && password.trim().length === 0) {
      emptyFields();
    } else {
      await axios
        .post(`/api/auth/login`, {
          userEmail: email,
          userPassword: password,
        })
        .then((logins) => {
          localStorage.setItem("user", JSON.stringify(logins.data));
          dispatch({
            type: actionType.SET_USER,
            user: logins.data,
          });
          router.push("/");
        })
        .catch((error) => {
          wronUser();
        });
    }
  };

  const hundleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div className="paddings ">
      <div className="login">
        {/* <Image src={logo} alt="Logo" className="login-logo" /> */}
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="userEmail"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <div className="submit-register">
            <button
              type="submit"
              className="login-form-button "
              onClick={handleSubmit}
            >
              Login
            </button>
            <Link href={"/auth/signup"} className="login-form-button padf">
              Register
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
