import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({title}) => {
  document.title = title;
  const navigate = useNavigate();
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    if(!userInfo){
      navigate('/login', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }
  }, [userInfo]);
  return (
    <div className="container text-center my-32">
      <h1 className="text-9xl"> All Databases goes here</h1>
    </div>
  )
}

export default AdminPage;