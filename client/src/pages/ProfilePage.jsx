import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/auth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    if(!userInfo){
      navigate('/login', 'replace');
    }else{
      document.title = userInfo.username + " - Shome";
    }
  }, [userInfo]);
  if(userInfo)
  return (
    <div className="container flex gap-4">
      {userInfo.admin && (
        <Link to="/admin">
          <button className="border p-6 rounded-xl">Admin</button>
        </Link>
      )}
      <button className="border p-6 rounded-xl" onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default ProfilePage;