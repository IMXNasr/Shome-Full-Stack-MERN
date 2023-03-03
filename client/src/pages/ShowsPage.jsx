import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowCard } from '../components';
import { getShows } from '../store/show';
import { appName } from '../utils/constants';

const ShowsPage = ({title}) => {
  const {type} = useParams();
  if(type === 'all'){
    document.title = `All Shows - ${appName}`;
  }
  const dispatch = useDispatch();
  const {loading, error, shows} = useSelector(state => state.shows);
  useEffect(() => {
    dispatch(getShows(type));
  }, [type]);
  return (
    <main className="container py-4 mt-6">
      <h1 className="text-4xl font-semibold">All {type === 'all' ? 'Shows' : type === 'tv' ? 'TV Series' : type[0].toUpperCase() + type.substring(1) + 's'}</h1>
      {/* Grid Shows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6">
        {shows && shows.map((show, idx) => (
          <ShowCard key={idx} show={show} />
        ))}
      </div>
    </main>
  )
}

export default ShowsPage;