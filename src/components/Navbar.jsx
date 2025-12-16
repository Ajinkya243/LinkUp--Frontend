import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const Navbar=()=>{
  const user=useSelector(state=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    dispatch(removeUser());
    dispatch(removeFeed());
    navigate("/login");
  }
return <div className="navbar bg-base-300 shadow-2xl">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">LinkUp</Link>
  </div>
  {user&&<div className="flex gap-2 mx-4">
    <div className="dropdown dropdown-end">
      <div className="flex gap-1 items-center">
      <p>Welcome, {user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photo} />
        </div>
      </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
}
export default Navbar;