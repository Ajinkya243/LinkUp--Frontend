import React from 'react'
import { useSelector } from 'react-redux'

const UserCard = ({user}) => {
    const{firstName,lastName,gender,age,photo}=user
    const userData=useSelector(store=>store.user);
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
        <button className="btn btn-primary">Ingnore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>:null}
  </div>
</div>
  )
}

export default UserCard