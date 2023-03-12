import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShowCard } from '../../components/admin';
import { IoTv } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { GiSwordman } from 'react-icons/gi';
import { MdAddReaction } from 'react-icons/md';

const AdminPage = ({title}) => {
  document.title = title;
  const iconSize = 25;
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
    <main className="container mt-6">
      <h1 className="text-3xl font-bold">All Databases:</h1>
      {/* Grid */}
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        <ShowCard icon={<FaUser size={iconSize} />} name="Users" link="/admin/users" />
        <ShowCard icon={<IoTv size={iconSize} />} name="Shows" link="/admin/shows" />
        <ShowCard icon={<GiSwordman size={iconSize} />} name="Actors" link="/admin/actors" />
        <ShowCard icon={<MdAddReaction size={iconSize} />} name="Acting" link="/admin/acting" />
      </div>
    </main>
  )
}

export default AdminPage;