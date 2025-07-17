import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSucess } from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setformData] = useState({});
const {loading, error} = useSelector((state) => state.user)
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

try{
dispatch(signInStart())
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(formData),
})


const data = await response.json();

if(data.success === false){
 dispatch(signInFailure(data.message))
  return;
}
dispatch(signInSucess(data))
navigate('/')
console.log(data);
} 

catch(error){
dispatch(signInFailure(error.message))
// seterror("This is a test error message."); 
 
}

  }
  // console.log(formData);

  return (
    <div className="max-w-lg mx-auto p-3">
      <h2 className="text-center text-3xl font-semibold mt-7">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-3 mt-8" action="">
       
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
        <button disabled={loading} className="bg-slate-800 text-white font-semibold text-xl p-3 rounded-lg border-none uppercase hover:opacity-90 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-900">Sign up</span>
        </Link>
      </div>

    {error && <p className="text-red-500 mt-8">{error}</p>}
    
    </div>
  );
};

export default SignIn;
