import React, { Profiler } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)

  //  if (!currentUser) {
  //   return (
  //     <div className="text-center mt-20">
  //       <p className="text-xl text-gray-600">Please sign in to view your profile.</p>
  //     </div>
  //   );
  // }
  return (
    <div  className='max-w-lg m-auto p-3'>
      <h1 className='text-5xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' action="">
<img className='w-25 h-25 mb-3 rounded-full object-center object-cover self-center' src={currentUser.avatar} alt="profile" />
<input type="text" className="shadow-xl p-3 rounded-md  bg-white" placeholder='username' id='username' />

<input type="email" className="shadow-xl p-3 rounded-md  bg-white" placeholder='email' id='email' />

<input type="password" className="shadow-xl p-3 rounded-md  bg-white" placeholder='password' id='password' />
<button className='bg-slate-800 text-white p-3 text-2xl rounded-lg hover:opacity-95 active:scale-95 disabled:opacity-80 transition-all duration-300 '>Update</button>
      </form>
      <div className="mt-4 flex justify-between px-4">
        <span className='text-red-600 text-xl'>Delete</span>
        <span className='text-red-600 text-xl'>SignOut</span>
      </div>
    </div>
  )
}

export default Profile