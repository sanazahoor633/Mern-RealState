import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header className="bg-slate-200 shadow-md ">
   
    <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
 <Link to='/' >
  <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
         <span className='text-slate-500'>Sahand</span>
         <span className='text-slate-800'>Estate</span>
    </h1>

    </Link>
    <form className='bg-slate-100 p-3 flex rounded items-center'>
        <input className='focus:outline-none w-24 sm:w-64' type="text" placeholder='Search ...'/>
        <FaSearch className='text-slate-700'/>

    </form>
    <ul className='flex gap-4'>
         <Link to='/' >
        <li className='hidden sm:inline hover:underline transition-all duration-200'>Home</li>
        </Link>
         <Link to='about' >
        <li className='hidden sm:inline hover:underline transition-all duration-200' >About</li>
        </Link>
         <Link to='sign-in' >
        <li className=' hover:underline transition-all duration-200' >SignIn</li>
        </Link>
    </ul>

    </div>
  
   </header>
  )
}

export default Header