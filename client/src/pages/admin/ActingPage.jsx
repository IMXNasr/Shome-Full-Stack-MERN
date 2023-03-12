import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';
import { addActing } from '../../store/act';
import { getActors } from '../../store/actor';
import { getShows } from '../../store/show';

const ActingPage = ({title}) => {
  document.title = title;
  const [actor, setActor] = useState();
  const [show, setShow] = useState();
  const [as, setAs] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  const {actors} = useSelector(state => state.actors);
  const {shows} = useSelector(state => state.shows);
  const {loading, error, success} = useSelector(state => state.act);
  useEffect(() => {
    if(!userInfo){
      navigate('/login?redirect=admin/acting', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }else{
      dispatch(getActors());
      dispatch(getShows({type: 'all'}))
    }
  }, [userInfo]);
  const submitFn = (e) => {
    e.preventDefault();
    if(actor && show && as){
      dispatch(addActing({actor, show, as}));
    }
  }
  if(actors && shows)
  return (
    <div className="container mx-auto m-14 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
        {success && <div className="bg-transparent w-full p-3 text-green-600 border-green-600 border-2 rounded">{success}</div>}
        <h1 className="text-4xl font-semibold">Add Acting</h1>
        <label className="text-xl -mb-3">Actor:</label>
        <select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="gender" onChange={e => setActor(e.target.value)} >
          <option disabled selected value >-- Select an Actor --</option>
          {actors.map((actor, idx) => (
            <option key={idx} value={actor._id}>{actor.name}</option>
          ))}
        </select>
        <label className="text-xl -mb-3">Show:</label>
        <select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="gender" onChange={e => setShow(e.target.value)} >
          <option disabled selected value >-- Select a Show --</option>
          {shows.map((show, idx) => (
            <option key={idx} value={show._id}>{show.name}</option>
            ))}
        </select>
        <label className="text-xl -mb-3">As:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="as" placeholder="As" onChange={e => setAs(e.target.value)} />
        <button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit">{loading ? (<Spinner size={24} />) : 'Add'}</button>
      </form>
    </div>
  )
}

export default ActingPage;