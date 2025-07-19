import React from 'react'
  import { ToastContainer, toast } from 'react-toastify';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const {currentUser} =  useSelector(state => state.user)
  return (
   <header className="bg-slate-200 shadow-md ">
    <ToastContainer/>
      
    <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
 <Link to='/' >
  <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
         <span className='text-slate-500'>Sana's</span>
         <span className='text-slate-800'>Estate</span>
    </h1>

    </Link>
    <form className='bg-slate-100 p-3 flex rounded items-center'>
        <input className='focus:outline-none w-24 sm:w-64' type="text" placeholder='Search ...'/>
        <FaSearch className='text-slate-700'/>

    </form>
    <ul className='flex gap-4 items-center'>
         <Link to='/' >
        <li className='hidden sm:inline hover:underline transition-all duration-200'>Home</li>
        </Link>
         <Link to='about' >
        <li className='hidden sm:inline hover:underline transition-all duration-200' >About</li>
        </Link>
         <Link to='sign-in' >
        <li className=' hover:underline transition-all duration-200' > signin
          {/* <img 
           className="w-10 h-10 rounded-full object-center object-cover"
          src={currentUser.avatar} alt="" /> */}
        </li>
        
        </Link>
    </ul>

    </div>
  
   </header>
  )
}

export default Header