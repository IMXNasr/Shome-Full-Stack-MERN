import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../store/auth';

const registerPage = ({title}) => {
  document.title = title;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo, error, loading} = useSelector(state => state.auth);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitFn = (e) => {
    e.preventDefault();
    dispatch(register({name, username, email, password}));
  }
  useEffect(() => {
    if(userInfo){
      navigate('/', 'replace');
    }
  }, [userInfo]);
  return (
    <div className="container mx-auto h-full p-10 md:p-20 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn}>
        {error && (
          <div className="w-full p-3 text-red-600 border-red-600 border-2 rounded">{error}</div>
        )}
        <h1 className="text-4xl font-semibold text-center">Register</h1>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <p className="text-gray-500">Have an account? <Link to="/login" className="text-mainColor underline">Login</Link></p>
        <input className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit" value="Register" />
      </form>
    </div>
  )
}

export default registerPage;