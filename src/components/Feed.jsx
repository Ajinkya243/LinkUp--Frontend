import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import {useDispatch,useSelector} from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed=useSelector(state=>state.feed);
  const dispatch=useDispatch();
  const[error,setError]=useState('');
  useEffect(()=>{
    async function getFeed(){
      if(feed) return
      const token=localStorage.getItem('token');
      try{
        const res=await axios.get(`${BASE_URL}/feed`,{headers:{
        'Authorization':token
      }})
      dispatch(addFeed(res.data));
      }
      catch(err){
        setError(err)
      }
    }
    getFeed();
  },[dispatch]);
  return (
    <div className='flex justify-center min-h-screen py-20'>
      {error && <p>{error}</p>}
      {feed&&<UserCard className="" user={feed[0]}/>}
    </div>
  )
}

export default Feed