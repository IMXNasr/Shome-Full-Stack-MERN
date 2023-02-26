import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addShow } from '../store/show';

const AddShowPage = ({title}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [cover, setCover] = useState();
  const [releasedDate, setReleasedDate] = useState();
  const [rating, setRating] = useState(0);
  const [numEpisodes, setNumEpisodes] = useState(0);
  const [runtime, setRuntime] = useState(0);
  const [trailerLink, setTrailerLink] = useState("");
  const [country, setCountry] = useState("");
  const [featured, setFeatured] = useState(false);
  document.title = title;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  useEffect(() => {
    if(!userInfo){
      navigate('/login', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }
  }, [userInfo]);
  const submitFn = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', 'Movie Name')
    formData.append('image', image);
    // const formData = {name: 'Movie Name'};
    dispatch(addShow(formData));
  }
  return (
    <div className="container mx-auto h-full p-10 md:p-20 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
        {/* <div className="bg-transparent w-full p-3 text-red-600 border-red-600 border-2 rounded"></div> */}
        <h1 className="text-4xl font-semibold">Add New Show</h1>
        {/* <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
        <textarea className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required name="description" placeholder="Description" onChange={e => setDescription(e.target.value)}></textarea> */}
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="file" name="image" placeholder="Image" onChange={e => setImage(e.target.files[0])} />
        {/* <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="file" name="cover" placeholder="Cover" onChange={e => setCover(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="date" name="released_date" placeholder="Released Date" onChange={e => setReleasedDate(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="rating" placeholder="Rating" min={0} max={10} step={0.1} onChange={e => setRating(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="num_episodes" placeholder="Num Episodes" min={0} step={1} onChange={e => setNumEpisodes(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="runtime" placeholder="Runtime" min={0} step={1} onChange={e => setRuntime(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="trailer_link" placeholder="Trailer Link" onChange={e => setTrailerLink(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="country" placeholder="Country" onChange={e => setCountry(e.target.value)} />
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl accent-mainColor" required type="checkbox" name="featured" placeholder="Featured" onChange={e => setFeatured(e.target.value)} /> */}
        <input className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddShowPage;