import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCard, Slider, Spinner, WatchTrailer } from '../components';
import { getFeaturedShows } from '../store/show';
import { appName } from '../utils/constants';

const HomePage = ({title}) => {
  document.title = title;
  const dispatch = useDispatch();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [activeSlider, setActiveSlider] = useState(0);
  const {loading, error, shows} = useSelector(state => state.shows);
  useEffect(() => {
    dispatch(getFeaturedShows());
  }, []);
  return (
    <main className="container py-4 mt-6">
      {loading ? <Spinner /> : shows && <Slider shows={shows} activeSlider={activeSlider} setActiveSlider={setActiveSlider} setWatchTrailer={setWatchTrailer} />}
      <h1 className="text-4xl font-semibold mt-6">Popular on {appName}</h1>
      {/* Grid Shows */}
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">
          {shows && shows.map((show, idx) => <ShowCard key={idx} show={show} />)}
        </div>
      )}
      {watchTrailer && (
        <WatchTrailer url={shows[activeSlider].trailer_link} setWatchTrailer={setWatchTrailer} />
      )}
    </main>
  )
}

export default HomePage;