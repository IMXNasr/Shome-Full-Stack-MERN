import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({title}) => {
  document.title = title;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {userInfo, error} = useSelector(state => state.auth);
  useEffect(() => {
    if(userInfo){
      navigate('/', 'replace');
    }
  }, [userInfo]);
  const submitFn = (e) => {
    e.preventDefault();
    dispatch(login({email, password}));
  }
  return (
    <div className="container mx-auto h-full p-10 md:p-20 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn}>
        {error && (<div className="bg-transparent w-full p-3 text-red-600 border-red-600 border-2 rounded">{error}</div>)}
        <h1 className="text-4xl font-semibold text-center">Login</h1>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-mainColor underline">Register</Link></p>
        <input className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginPage;