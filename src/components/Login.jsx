import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
  const[emailId,setEmailId]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const handleTestCredential=()=>{
    setEmailId("ajinkya@gmail.com");
    setPassword("ajinkya741");
  }

  const handleLogin=async()=>{
    try{
      setError("");
      const res=await axios.post(`${BASE_URL}/login`,{email:emailId,password},{withCredentials:true});
    dispatch(addUser(res.data.user));
    localStorage.setItem('token',res.data.token);
    navigate("/");
    }
    catch(error){
     setError(error.response.data);
    }
    
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user])
  return (
    <div className='flex justify-center my-10'>
    <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title">User Login</h2>
    <div>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id:</legend>
  <input type="text" value={emailId} onChange={e=>setEmailId(e.target.value)} className="input" placeholder="Enter your email" /> 
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password:</legend>
  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="Enter your password" /> 
  </fieldset>
    </div>
    <p className='text-red-600'>{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleTestCredential}>Test Credentials</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login