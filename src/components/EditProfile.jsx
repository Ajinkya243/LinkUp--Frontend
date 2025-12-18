import { useState } from "react";
import React from 'react'
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    const[firstName,setFirstName]=useState(user.firstName);
    const[lastName,setLastName]=useState(user.lastName);
    const[age,setAge]=useState(user.age);
    const[gender,setGender]=useState(user.gender)
    const[photo,setPhoto]=useState(user.photo);
    const[showToast,setShowToast]=useState(false)
    const dispatch=useDispatch();


    const handleSave=async()=>{
      try{
       const res=await axios.patch(`${BASE_URL}/profile/edit`,{firstName,lastName,age:Number(age),gender,photo},{headers:{'Authorization':localStorage.getItem('token')}});
       console.log(res);
       dispatch(addUser(res.data));
       setShowToast(true);
       setTimeout(()=>{
        setShowToast(false);
       },3000)
      }
      catch(error){
        throw new Error(error);
      }
    }
  return (
    <div className="min-h-screen p-20 bg-base-200">
    <div className="flex justify-center gap-2 my-5">
    <div className='flex justify-center'>
    <div className="card card-border bg-base-100 w-96">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>
    <div>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name:</legend>
  <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} className="input" placeholder="Enter your email" /> 
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name:</legend>
  <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} className="input" placeholder="Enter your password" /> 
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Age:</legend>
  <input type="text" value={age} onChange={e=>setAge(e.target.value)} className="input" placeholder="Enter your Age" /> 
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender:</legend>
  <select defaultValue={gender} className="select" onChange={e=>setGender(e.target.value)}>
  <option value='male'>Male</option>
  <option value='female'>Female</option>
</select> 
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo Url:</legend>
  <input type="text" value={photo} onChange={e=>setPhoto(e.target.value)} className="input" placeholder="Enter your Age" /> 
  </fieldset>
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName,age,gender,photo}}/>
    </div>
    {showToast &&<div className="toast toast-top toast-center">
    <div className="alert alert-success">
    <span>Profile save successfully.</span>
    </div>
</div>}
    </div>
  )
}

export default EditProfile