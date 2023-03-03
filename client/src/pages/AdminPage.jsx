import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({title}) => {
  document.title = title;
  const navigate = useNavigate();
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    if(!userInfo){
      navigate('/login?redirect=admin', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }
  }, [userInfo]);
  return (
    <div className="container text-center my-32">
      <h1 className="text-9xl font-bold"> All Databases goes here</h1>
      <select name="" id="" multiple className="bg-transparent">
        <option value="">Play 1</option>
        <option value="">Play 2</option>
        <option value="">Play 3</option>
      </select>
    </div>
  )
}

export default AdminPage;