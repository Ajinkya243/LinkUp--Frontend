import React from 'react'

const UserCard = ({user}) => {
    const{firstName,lastName,gender,age,photo}=user
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
    <div className="card-actions justify-center">
        <button className="btn btn-primary">Ingnore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard