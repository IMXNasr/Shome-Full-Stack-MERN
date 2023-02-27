import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addShow } from '../store/show';

const AddShowPage = ({title}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
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
  const [countries, setCountries] = useState([]);
  document.title = title;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  const getCountries = async () => {
    const {data} = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(data);
    console.log(data);
  }
  useEffect(() => {
    if(!userInfo){
      navigate('/login', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }else{
      getCountries();
    }
  }, [userInfo]);
  const submitFn = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', 'Movie Name')
    formData.append('image', image);
    // const formData = {name: 'Movie Name'};
    // dispatch(addShow(formData));
    console.log(featured);
  }
  return (
    <div className="container mx-auto h-full m-14 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
        {/* <div className="bg-transparent w-full p-3 text-red-600 border-red-600 border-2 rounded"></div> */}
        <h1 className="text-4xl font-semibold">Add New Show</h1>
        <label className="text-xl -mb-3">Name:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
        <label className="text-xl -mb-3">Type:</label>
        {/* <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="type" placeholder="Type" onChange={e => setType(e.target.value)} /> */}
        <select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="type" id="type">
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="cartoon">Cartoon</option>
        </select>
        <label className="text-xl -mb-3">Description:</label>
        <textarea className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required name="description" placeholder="Description" onChange={e => setDescription(e.target.value)}></textarea>
        <label className="text-xl -mb-3">Released Date:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="date" name="released_date" placeholder="Released Date" onChange={e => setReleasedDate(e.target.value)} />
        <label className="text-xl -mb-3">Rating:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="rating" placeholder="Rating" min={0} max={10} step={0.1} onChange={e => setRating(e.target.value)} />
        <label className="text-xl -mb-3">Num Episodes:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="num_episodes" placeholder="Num Episodes" min={0} step={1} onChange={e => setNumEpisodes(e.target.value)} />
        <label className="text-xl -mb-3">Runtime (min):</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="number" name="runtime" placeholder="Runtime" min={0} step={1} onChange={e => setRuntime(e.target.value)} />
        <label className="text-xl -mb-3">Trailer Link:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="trailer_link" placeholder="Trailer Link" onChange={e => setTrailerLink(e.target.value)} />
        <label className="text-xl -mb-3">Country:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="country" placeholder="Country" list="country" onChange={e => setCountry(e.target.value)} />
        <datalist name="country" id="country">
          {countries && countries.map((country, idx) => (<option key={idx} value={country.name.common}>{country.name.common}</option>))}
        </datalist>
        <label className="text-xl -mb-3">Image:</label>
        <input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" required type="file" name="image" placeholder="Image" onChange={e => setImage(e.target.files[0])} />
        <label className="text-xl -mb-3">Cover:</label>
        <input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" required type="file" name="cover" placeholder="Cover" onChange={e => setCover(e.target.files[0])} />
        <div className="flex items-center gap-4">
          <input id="featured" className="border-[1px] focus:outline-none focus:border-mainColor rounded-xl accent-mainColor" type="checkbox" name="featured" placeholder="Featured" checked={featured} onChange={e => setFeatured(!featured)} />
          <label htmlFor="featured" className="text-xl">Featured</label>
        </div>
        <input className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddShowPage;