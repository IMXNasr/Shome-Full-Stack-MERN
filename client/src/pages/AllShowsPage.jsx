import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCard } from '../components';
import { getAllShows } from '../store/show';
import { shows } from '../utils/data';

const All = ({title}) => {
  document.title = title;
  const dispatch = useDispatch();
  const show = {
    name: "Venom",
    image: "venom.jpg",
    rating: 9.4
  }
  useEffect(() => {
    dispatch(getAllShows());
  }, []);
  return (
    <main className="container py-4 mt-6">
      <h1 className="text-4xl font-semibold">All Shows</h1>
      {/* Grid Shows */}
      <div className="grid grid-cols-4 mt-5 gap-6">
        {shows.map((show, idx) => (
          <ShowCard key={idx} show={show} />
        ))}
      </div>
    </main>
  )
}

export default All;