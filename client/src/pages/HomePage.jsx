import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCard } from '../components';
import { getTypedShows } from '../store/show';

const HomePage = ({title}) => {
  document.title = title;
  const dispatch = useDispatch();
  const {loading, error, shows} = useSelector(state => state.shows);
  useEffect(() => {
    dispatch(getTypedShows('featured'));
  }, []);
  return (
    <main className="container py-4">
      <h1 className="text-4xl font-semibold">Popular on Shome</h1>
      {/* Grid Shows */}
      <div className="grid grid-cols-4 mt-5 gap-6">
        {shows && shows.map((show, idx) => (
          <ShowCard key={idx} show={show} />
        ))}
      </div>
    </main>
  )
}

export default HomePage;