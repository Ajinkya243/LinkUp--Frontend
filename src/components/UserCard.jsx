import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const[message,setMessage]=useState('')
    const{firstName,lastName,gender,age,photo,_id}=user
    const userData=useSelector(store=>store.user);
    const dispatch=useDispatch();

    const handleSendRequest=async(status,toUserId)=>{
      try{
        const res=await axios.post(`${BASE_URL}/request/send/${status}/${toUserId}`,{},{headers:{'Authorization':localStorage.getItem('token')}});
        console.log(res);
        dispatch(removeUserFromFeed(toUserId));
        setMessage(status);
        setTimeout(()=>{
          setMessage("");
        },3000)
      }
      catch(err){
        console.log(err);
      }
    }

    if(!userData) return;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photo}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    <p>{`${age} ${gender}`}</p>
    {userData.firstName!==firstName?<div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ingnore</button>
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>:null}
  </div>
  {message&&<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>{message==='ignored'?'Yoy ignore the profile':'Request send successfully'}</span>
  </div>
</div>}
</div>
  )
}

export default UserCard