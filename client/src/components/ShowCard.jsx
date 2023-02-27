import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ShowCard = ({show}) => {
  return (
    <div className="rounded-xl bg-[#22252f] overflow-hidden p-2">
      {/* Image Container */}
      <Link to={`/movies/${show.id}`} className="overflow-hidden">
        <img className="rounded-xl" src={show.image} alt={show.name} />
      </Link>
      {/* Rating */}
      <div className="my-2 p-1 flex items-center gap-1 bg-yellow-300 bg-opacity-50 border border-yellow-300 w-fit text-yellow-400 rounded-lg">
        <FaStar />
        <h3 className="text-white">{show.rating}</h3>
      </div>
      <h1 className="text-3xl font-medium mb-4 w-fit">
        <Link to="/movies/MovieID" className="w-fit">
          {show.name}
        </Link>
      </h1>
    </div>
  )
}

export default ShowCard;