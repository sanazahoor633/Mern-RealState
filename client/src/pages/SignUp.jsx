import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='max-w-lg mx-auto p-3'>
<h2 className='text-center text-3xl font-semibold mt-7'>SignUp</h2>
<form className='flex  flex-col gap-3 mt-8' action="">
<input className='border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none ' id='username' type="text" placeholder='username'/>
<input className='border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none 'id='email' type="email" placeholder='email'/>
<input className='border-1 border-gray-500 bg-white text-xl p-3 rounded-md outline-none ' id='password' type="password" placeholder='password'/>
<button  className='bg-slate-800 text-white font-semibold text-xl p-3 rounded-lg border-none uppercase hover:opacity-90 disabled:opacity-80'>Sign up</button>
</form>
<div className='flex gap-4 mt-5'>
<p>Have an account?</p>
<Link to={"/sign-in"} >
<span className='text-blue-900'>Sign in</span>
</Link>
</div>
    </div>
  )
}

export default SignUp