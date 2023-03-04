import React, { useState } from 'react';
import { RiMovie2Fill } from 'react-icons/ri';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { appName } from '../utils/constants';

const Navbar = () => {
  const {userInfo} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(location.search.split('search=')[1] || '');
  const searchFn = (e) => {
    e.preventDefault();
    navigate('/all/?search=' + search);
  }
  return (
    <nav>
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl flex items-center text-mainColor">
          <RiMovie2Fill />
          <h1 className="pointer-events-none selection:bg-transparent selection:text-mainColor">{appName}</h1>
        </Link>
        {/* Links */}
        <ul className="flex items-center">
          <NavLink className="mx-2 hover:text-mainColor transition-colors" to="/all">All</NavLink>
          <NavLink className="mx-2 hover:text-mainColor transition-colors" to="/movie">Movies</NavLink>
          <NavLink className="mx-2 hover:text-mainColor transition-colors" to="/tv">TV Series</NavLink>
          <NavLink className="mx-2 hover:text-mainColor transition-colors" to="/cartoon">Cartoons</NavLink>
        </ul>
        {/* Search */}
        <form onSubmit={searchFn} className="flex items-center border rounded-xl p-2" method="POST">
          <input className="bg-transparent focus:outline-none" type="text" name="search" id="search" placeholder="What do you want to watch?" value={search} onChange={e => setSearch(e.target.value)} />
          <button type="submit"><FaSearch className="text-gray-200" /></button>
        </form>
        {/* Buttons */}
        <div className="flex items-center">
          {!userInfo ? (
            <>
            <Link to="/register"><button className="py-2 px-4 bg-mainColor rounded-xl">Register</button></Link>
            <Link to="/login"><button className="py-2 px-4 rounded-xl ml-2 border">Login</button></Link>
            </>
          ) : (
            <Link to="/profile"><button className="py-2 px-4 rounded-xl ml-2 border flex items-center gap-2">{userInfo.username} <FaUser size={14} /></button></Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;