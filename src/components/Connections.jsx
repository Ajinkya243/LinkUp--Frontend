import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch=useDispatch();
  const connections=useSelector(state=>state.connections);
  useEffect(()=>{
    const fetchConnections=async()=>{
      try{
        const res=await axios.get(`${BASE_URL}/user/connections`,{headers:{'Authorization':localStorage.getItem('token')}})
        dispatch(addConnections((res.data.data)));
      }
      catch(error){
        console.log(error);
      }
    }
    fetchConnections();
  },[])

  if(!connections) return ;

  if(!connections.length) return <h1>No connections found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-3xl'>Connections</h1>
      {connections.map(el=>{
        const{firstName,lastName,age,photo,gender}=el;
        return <div className='m-4 p-4 bg-base-300 rounded-lg flex gap-15 items-center w-1/2 mx-auto'>
          <img className='w-30 h-30 rounded-full' src={photo} />
          <div>
          <h2 className='text-2xl'>{`${firstName} ${lastName}`}</h2>
          <p>{`${age}, ${gender}`}</p>
          </div>
        </div>
})}
    </div>
  )
}

export default Connections