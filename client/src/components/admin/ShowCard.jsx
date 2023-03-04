import React from 'react';
import { Link } from 'react-router-dom';

const AdminShowCard = ({icon, name, link}) => {
  console.log(icon);
  return (
    <Link to={link} className="rounded-lg py-3 px-4 border flex items-center gap-2 hover:border-mainColor hover:bg-mainColor transition-colors">
      {icon}
      <h1 className="text-2xl">{name}</h1>
    </Link>
  )
}

export default AdminShowCard;