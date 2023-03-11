import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';
import { addActor } from '../../store/actor';

const AddActorPage = ({title}) => {
  document.title = title;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [biography, setBiography] = useState("");
  const [birthday, setBirthday] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  const {loading, success} = useSelector(state => state.actors);
  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const {data} = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(data);
  }
  useEffect(() => {
    if(!userInfo){
      navigate('/login?redirect=admin/actors/add', 'replace');
    }else if (!userInfo.admin){
      navigate('/', 'replace');
    }else{
      getCountries();
    }
  }, [userInfo]);
  const submitFn = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('biography', biography);
    formData.append('birthday', birthday);
    formData.append('place_of_birth', placeOfBirth);
    formData.append('photo', photo);
    dispatch(addActor(formData));
  }
  return (
    <div className="container mx-auto m-14 grid place-items-center">
      <form method="POST" className="w-full md:w-3/4 xl:w-1/2 flex flex-col gap-6" onSubmit={submitFn} encType="multipart/form-data">
        {success && <div className="bg-transparent w-full p-3 text-green-600 border-green-600 border-2 rounded">{success}</div>}
        <h1 className="text-4xl font-semibold">Add New Actor</h1>
        <label className="text-xl -mb-3">Name:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} />
        <label className="text-xl -mb-3">Gender:</label>
        <select className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" name="gender" onChange={e => setGender(e.target.value)} >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label className="text-xl -mb-3">Biography:</label>
        <textarea className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl h-32" name="bio" placeholder="Biography" onChange={e => setBiography(e.target.value)}></textarea>
        <label className="text-xl -mb-3">Birthday:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" type="date" name="birthday" placeholder="Birthday" onChange={e => setBirthday(e.target.value)} />
        <label className="text-xl -mb-3">Place of Birth:</label>
        <input className="bg-transparent w-full p-3 border-[1px] focus:outline-none focus:border-mainColor rounded-xl" required type="text" name="place_of_birth" placeholder="Place of Birth" list="place_of_birth" onChange={e => setPlaceOfBirth(e.target.value)} />
        <datalist name="place_of_birth" id="place_of_birth">
          {countries && countries.map((country, idx) => (<option key={idx} value={country.name.common}>{country.name.common}</option>))}
        </datalist>
        <label className="text-xl -mb-3">Photo:</label>
        <input className="file:bg-mainColor file:border-none file:text-white file:rounded-full file:py-2 file:px-4 cursor-pointer focus:outline-none" required type="file" name="photo" onChange={e => setPhoto(e.target.files[0])} />
        <button className="bg-mainColor w-full text-white py-3 cursor-pointer rounded-xl" type="submit" name="submit">{loading ? (<Spinner size={24} />) : 'Add'}</button>
      </form>
    </div>
  )
}

export default AddActorPage;