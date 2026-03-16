import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(loginSuccess(res.data.user));
      toast.success("login successfull");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white shadow-2xl p-4 rounded-md w-[25rem] min-h-[20rem] h-[fit-content]"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-md">
            Enter your Email:
          </label>
          <input
            type="email"
            placeholder="enter email"
            className=":h-[3rem] bg-gray-200 p-2 rounded-md text-md md:text-xl outline-none"
            value={email}
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
          <Link to={"/signup"} className="hover:underline hover:text-blue-500">
            Don't have an account? Signup
          </Link>
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-300 w-fit rounded-sm   hover:bg-blue-500   text-white font-semibold cursor-pointer "
        >
          Login Account
        </button>
      </form>
    </div>
  );
};

export default Signin;
