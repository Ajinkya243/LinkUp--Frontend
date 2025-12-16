import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const res=await axios.get(`${BASE_URL}/profile/view`,{headers:{
          'Authorization':localStorage.getItem('token')
        }});
        
        dispatch(addUser(res.data));
      }
      catch(error){
        console.error(error)
        navigate("/login");
      }
    }
    if(!user) fetchUser();
  },[])
  return (
    <div className='bg-base-300'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body