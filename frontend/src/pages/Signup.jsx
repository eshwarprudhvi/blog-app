import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-app-0j5v.onrender.com/api/users",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(loginSuccess(res.data.user));
      toast.success("registration successfull");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-3 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 shadow-2xl p-4 rounded-md w-[25rem] min-h-[20rem] h-[fit-content]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-md">
            Enter your username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="enter username "
            className=":h-[3rem] bg-gray-200 p-2 rounded-md text-md md:text-xl outline-none"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-md">
            Enter your email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="enter email"
            className=":h-[3rem] bg-gray-200 p-2 rounded-md text-md md:text-xl outline-none"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-md">
            Enter your password:
          </label>
          <input
            name="password"
            type="password"
            placeholder="enter password"
            className=":h-[3rem] bg-gray-200 p-2 rounded-md text-md md:text-xl outline-none"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Link to={"/signin"} className="hover:underline hover:text-blue-400">
            Already have an account? Signin
          </Link>
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-300 w-fit rounded-sm hover:bg-blue-500    text-white font-semibold cursor-pointer "
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
