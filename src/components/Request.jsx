import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import { useState } from 'react'

const Request = () => {
    const[status,setStatus]=useState('')
    const dispatch=useDispatch();
    const request=useSelector(store=>store.requests);

    const filterRequest=(id)=>{
        const filterData=request.filter(el=>el._id!==id);
        dispatch(removeRequest(filterData));
    }
    const reviewRequest=async(status,requestId)=>{
        try{
            console.log(requestId);
            const res=await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{},{headers:{'Authorization':localStorage.getItem('token')}})
            console.log(res);
            filterRequest(requestId);
            setStatus(status);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const fetchRequest=async()=>{
            try{
                const res=await axios.get(`${BASE_URL}/user/requests/received`,{headers:{'Authorization':localStorage.getItem('token')}});
                console.log(res);
                dispatch(addRequest(res.data.connectionRequest));
            }
            catch(err){
                console.log(err)
            }
            
        }
        fetchRequest();
    },[])
  if(!request) return ;

  if(!request.length) return <h1 className='flex justify-center my-10'>No request found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='text-bold text-3xl'>Connections</h1>
      {request.map(el=>{
        const{firstName,lastName,age,photo,gender,_id}=el.fromUserId;
        return <div key={_id} className='m-4 p-4 bg-base-300 rounded-lg flex gap-15 items-center w-1/2 mx-auto'>
          <img className='w-30 h-30 rounded-full' src={photo} />
          <div>
          <h2 className='text-2xl'>{`${firstName} ${lastName}`}</h2>
          <p>{`${age}, ${gender}`}</p>
          </div>
        <div className='ml-30 flex gap-5'>
        <button className="btn btn-primary" onClick={()=>reviewRequest('accepted',el._id)}>Accept</button>
        <button className="btn btn-secondary" onClick={()=>reviewRequest('rejected',el._id)}>Reject</button>
        </div>
        </div>
})}
<div className="toast toast-top toast-center">
{status==='rejected'&&<div className="alert alert-info">
    <span>You reject the request.</span>
  </div>}
  {status==='accepted'&&<div className="alert alert-success">
    <span>You accept the request.</span>
  </div>}
</div>
    </div>
  )
}

export default Request