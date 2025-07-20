import React, { useState } from "react";
import photo1 from '../images/photo1.png'
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearError,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import Oauth from "../Components/Oauth";

const SignIn = () => {
  const [formData, setformData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // console.log('data is', data);

      if (data.success === false) {
        toast.error(data.message || "Something went wrong.");
        dispatch(signInFailure(data.message) || "Login failed");
        return;
      }


      dispatch(signInSuccess(data));

      toast.success("Login successful!");
      navigate("/");
       
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
      dispatch(clearError())
    
      // seterror("This is a test error message.");

      if (error.name === "AbortError") {
        dispatch(signInFailure("Request timed out. Please try again."));
      } else {
        // toast.error(error.message || 'Something went wrong.');
        dispatch(signInFailure(error.message || "Something went wrong."));
      }
    }
  };
  // console.log(formData);
const handleSignUp = ()=> {
 dispatch(clearError()) 
}


  return (

<div className=" w-full sm:flex sm:items-center h-full">

   <div className="image-container w-full h-[600px] sm:w-[40%] overflow-hidden absolute sm:relative">
        <img className="h-[100%] w-[100%] " src={photo1} alt="" />
      </div> 


    <div className="max-w-lg sm:max-w-[40%] mx-auto  sm:mx-0 sm:w-[40%] p-3 opacity-80 sm:opacity-100 text-black">

      <h2 className="text-center text-3xl font-semibold mt-7">Sign In</h2>
      <form
        onSubmit={handleSubmit}
        className="flex  flex-col gap-3 mt-8"
        action=""
      >
        <input
          className="border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none "
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
          className="bg-green-800 text-white font-semibold text-xl p-3 rounded-lg border-none uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-up"}>
          <span onClick={handleSignUp} className="text-blue-900">Sign up</span>
        </Link>
      </div>

      {error && <p className="text-red-500 mt-8">{error}</p>}
    </div>



    </div>

  );
};

export default SignIn;
