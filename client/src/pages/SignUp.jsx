import { ToastContainer, toast } from 'react-toastify';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Components/Oauth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const handleOnchange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setloading(false);
           toast.error(data.message || 'Something went wrong.');
        seterror(data.message);
       

        return;
      }
      setloading(false);
      seterror(null); /////adding
      // //  console.log(data);
       toast.success('Signup successful!');
      navigate('/sign-in')
    } catch (error) {
      setloading(false);
      seterror(error.message);
    }
  };

  // console.log(formData);

  return (
    <div className="max-w-lg mx-auto p-3">
      <h2 className="text-center text-3xl font-semibold mt-7">SignUp</h2>
      <form
        onSubmit={handleSubmit}
        className="flex  flex-col gap-3 mt-8"
        action=""
      >
        <input
          className="border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none "
          id="username"
          type="text"
          placeholder="username"
          onChange={handleOnchange}
          required
        />
        <input
          className="border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none"
          id="email"
          type="email"
          placeholder="email"
          onChange={handleOnchange}
          required
        />
        <input
          className="border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none "
          id="password"
          type="password"
          placeholder="password"
          onChange={handleOnchange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white font-semibold text-xl p-3 rounded-lg border-none uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-900">Sign in</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-8">{error}</p>}
    </div>
  );
};

export default SignUp;
