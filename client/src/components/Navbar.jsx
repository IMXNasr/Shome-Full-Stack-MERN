import React, { useState } from 'react';
import { RiMovie2Fill } from 'react-icons/ri';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { appName } from '../utils/constants';

const LinkList = ({mobile, onClick}) => {
  return (
    <ul className={`${!mobile ? "hidden" : ""} xl:flex ${mobile ? "flex flex-col" : "flex-row"} ${!mobile && "items-center"} gap-4`}> {/* flex */}
      <NavLink onClick={onClick} className="mx-2 hover:text-mainColor transition-colors" to="/all">All</NavLink>
      <NavLink onClick={onClick} className="mx-2 hover:text-mainColor transition-colors" to="/movie">Movies</NavLink>
      <NavLink onClick={onClick} className="mx-2 hover:text-mainColor transition-colors" to="/tv">TV Series</NavLink>
      <NavLink onClick={onClick} className="mx-2 hover:text-mainColor transition-colors" to="/cartoon">Cartoons</NavLink>
    </ul>
  )
}

const Search = ({mobile, setShowMobileNav}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(location.search.split('search=')[1] || '');
  const searchFn = (e) => {
    e.preventDefault();
    if(mobile) {
      setShowMobileNav(false);
    }
    navigate('/all/?search=' + search);
  }
  return (
    <form onSubmit={searchFn} className={`${!mobile ? "hidden" : ""} ${mobile ? "flex" : ""} xl:flex items-center border rounded-xl p-2`} method="POST">
      <button className="text-gray-200 mx-2" type="submit"><FaSearch /></button>
      <input className="bg-transparent flex-1 focus:outline-none" type="text" name="search" id="search" placeholder="What do you want to watch?" value={search} onChange={e => setSearch(e.target.value)} />
    </form>
  )
}

const NavButtons = ({userInfo, mobile, onClick}) => {
  return (
    <div className={`${!mobile ? "hidden" : ""} ${mobile ? "flex" : ""} xl:flex`}>
      {!userInfo ? (
        <>
        <Link onClick={onClick} to="/register"><button className="pointer-events-none py-2 px-4 bg-mainColor rounded-xl">Register</button></Link>
        <Link onClick={onClick} to="/login"><button className="pointer-events-none py-2 px-4 rounded-xl ml-2 border">Login</button></Link>
        </>
      ) : (
        <Link onClick={onClick} to="/profile"><button className="pointer-events-none py-2 px-4 rounded-xl ml-2 border flex items-center gap-2"><FaUser size={14} /> {userInfo.username}</button></Link>
      )}
    </div>
  )
}

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  return (
    <nav>
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl flex items-center text-mainColor">
          <RiMovie2Fill />
          <h1 className="pointer-events-none selection:bg-transparent selection:text-mainColor">{appName}</h1>
        </Link>
        {/* Links */}
        <LinkList />
        {/* Search */}
        <Search />
        {/* Buttons */}
        <NavButtons userInfo={userInfo} />
        {/* Bars */}
        <button className="text-mainColor text-2xl xl:hidden" onClick={() => {}}><FaBars onClick={() => setShowMobileNav(true)} /></button>
        {/* Mobile View */}
        {showMobileNav && (
          //! Maybe the next line cause ERRORS 
          <div className="fixed xl:hidden w-full h-full top-0 left-0 bg-bgDark/50 z-10" onClick={(e) => {console.log(e.target);setShowMobileNav(e.target.classList.contains('fixed') || e.target.localName === 'a' ? false : true)}}>
            <div className="container pointer-events-none">
              <div className="flex flex-col bg-bgDark relative rounded-2xl top-20 py-4 px-2 border gap-4 pointer-events-auto">
                <LinkList mobile onClick={() => setShowMobileNav(false)} />
                <Search mobile setShowMobileNav={setShowMobileNav} />
                <NavButtons userInfo={userInfo} mobile onClick={() => setShowMobileNav(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;