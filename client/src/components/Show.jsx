import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { staticURL, URL } from '../utils/constants';

const Show = ({id}) => {
  const [show, setShow] = useState({});
  const getShow = async () => {
    const {data} = await axios.get(`${URL}/show/${id}`);
    if(data.success){
      setShow(data.show);
    }
  }
  useEffect(() => {
    getShow();
  }, [id]);
  return (
    <div className="flex flex-col items-center justify-between gap-2 w-36">
      <Link to={`/${show.type}/${show._id}`}>
        <img className="rounded-lg" src={staticURL + '/show/' + show.image} alt={show.name} />
      </Link>
      <Link to={`/${show.type}/${show._id}`} className="hover:text-mainColor transition-colors">
        <h5 className="text-md font-light">{show.name}</h5>
      </Link>
    </div>
  )
}

export default Show;