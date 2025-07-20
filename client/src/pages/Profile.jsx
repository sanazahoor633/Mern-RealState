import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import app from '../firebase.js'
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailed, deleteUserStart, deleteUserSucess, signOutUserFailed, signOutUserStart, signOutUserSucess, updateUserFailure, updateUserStart, updateUserSucess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const [updateSuccessfull, setupdateSuccessfull] = useState(false)
  const [formData, setformData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef();

  //  if (!currentUser) {
  //   return (
  //     <div className="text-center mt-20">
  //       <p className="text-xl text-gray-600">Please sign in to view your profile.</p>
  //     </div>
  //   );
  // }

  const handleOnchange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  


  const hanndleSubmit = async (e)  => {
    e.preventDefault();


    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      toast.success('user has been updated')
      setupdateSuccessfull(true)
dispatch(updateUserSucess(data))

    }
    catch(error){

dispatch(updateUserFailure(error.message))

    }
  }

  const handleDelete = async () => {

    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });

      let data = await res.json();
      if(data.sucess === false){
        dispatch(deleteUserFailed(data.message));
        return;
      }
    
      toast.success('user has been deleted')
      dispatch(deleteUserSucess(data))
         navigate('/sign-in')
    }
    catch(error){
dispatch(deleteUserFailed(error.message))
    }
  }


  const handleSignOut = async () => {

    try{
      dispatch(signOutUserStart())
const res = await fetch('/api/auth/signout');
let data = await res.json();
if(data.sucess === false) {
  dispatch(signOutUserFailed(data.message))
}
  
 toast.success('user has been deleted')
dispatch(signOutUserSucess(data))
  navigate('/sign-in')
    }
    catch(error){
dispatch(signOutUserFailed(error.message))

    }


  }

  return (
    <div className="max-w-lg m-auto p-3">


{!currentUser ? <p className="flex justify-center h-screen mt-8 text-4xl whitespace-nowrap font-semibold">Access denied. Please log in first.</p>  : <> <h1 className="text-5xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={hanndleSubmit} className="flex flex-col gap-4" action="">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          className="w-25 h-25 mb-3 rounded-full object-center object-cover self-center"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          className="shadow-xl p-3 rounded-md  bg-white outline-gray-300"
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          onChange={handleOnchange}
        />

        <input
          type="email"
          className="shadow-xl p-3 rounded-md bg-white outline-gray-300"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          onChange={handleOnchange}
        />

        <input
          type="password"
          className="shadow-xl p-3 rounded-md bg-white outline-gray-300"
          defaultValue={currentUser.password}
          placeholder="password"
          id="password"
          onChange={handleOnchange}
        />
        <button className="bg-slate-800 text-white p-3 text-2xl rounded-lg hover:opacity-95 active:scale-95 disabled:opacity-80 transition-all duration-300 ">
   {loading ? 'Loading...' : 'Update'  }
        </button>
      </form>
      <div className="mt-4 flex justify-between px-2">
        <span onClick={handleDelete} className="text-red-600 text-xl">Delete</span>
        <span onClick={handleSignOut} className="text-red-600 text-xl">SignOut</span>
      </div>

      <p className="text-red-700 mt-2 font-semibold p-2">
        {error ? error : ''}
      </p>
      <h4 className="text-green-800">
      { updateSuccessfull ? 'User updated Sucessfull' : '' }
      </h4> </>
}




{/* 
      <h1 className="text-5xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={hanndleSubmit} className="flex flex-col gap-4" action="">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          className="w-25 h-25 mb-3 rounded-full object-center object-cover self-center"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          className="shadow-xl p-3 rounded-md  bg-white outline-gray-300"
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          onChange={handleOnchange}
        />

        <input
          type="email"
          className="shadow-xl p-3 rounded-md bg-white outline-gray-300"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          onChange={handleOnchange}
        />

        <input
          type="password"
          className="shadow-xl p-3 rounded-md bg-white outline-gray-300"
          defaultValue={currentUser.password}
          placeholder="password"
          id="password"
          onChange={handleOnchange}
        />
        <button className="bg-slate-800 text-white p-3 text-2xl rounded-lg hover:opacity-95 active:scale-95 disabled:opacity-80 transition-all duration-300 ">
   {loading ? 'Loading...' : 'Update'  }
        </button>
      </form>
      <div className="mt-4 flex justify-between px-2">
        <span onClick={handleDelete} className="text-red-600 text-xl">Delete</span>
        <span className="text-red-600 text-xl">SignOut</span>
      </div>

      <p className="text-red-700 mt-2 font-semibold p-2">
        {error ? error : ''}
      </p>
      <h4 className="text-green-800">
      { updateSuccessfull ? 'User updated Sucessfull' : '' }
      </h4> */}
    </div>
  );
};

export default Profile;
