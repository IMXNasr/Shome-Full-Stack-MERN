import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCard, Spinner } from '../components';
import { getFeaturedShows } from '../store/show';

const HomePage = ({title}) => {
  document.title = title;
  const dispatch = useDispatch();
  const {loading, error, shows} = useSelector(state => state.shows);
  useEffect(() => {
    dispatch(getFeaturedShows());
  }, []);
  return (
    <main className="container py-4 mt-6">
      <header className="text-center font-bold text-9xl">Header Slider goes here</header>
      <h1 className="text-4xl font-semibold">Popular on Shome</h1>
      {/* Grid Shows */}
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">
          {shows && shows.map((show, idx) => (
            <ShowCard key={idx} show={show} />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage;