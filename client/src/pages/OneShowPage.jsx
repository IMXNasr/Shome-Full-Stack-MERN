import React, { useEffect, useRef, useState } from 'react';
import { BsPlay, BsBookmark } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';
import { Actor, Spinner, WatchTrailer } from '../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneShow } from '../store/show';
import { appName, staticURL, URL } from '../utils/constants';
import { getActingForShow } from '../store/act';

const OneShowPage = () => {
  const {id, type} = useParams();
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [headerStyle, setHeaderStyle] = useState({});
  const dispatch = useDispatch();
  const {loading, error, show} = useSelector(state => state.shows);
  const {acts} = useSelector(state => state.act);
  const section = useRef();
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let value = window.scrollY;
      if(section){
        section.current.style.top = '-' + (value * 0.5 + 300) + 'px';
      }
    });
    dispatch(getOneShow({id, type}));
    dispatch(getActingForShow(id));
  }, [dispatch, id, type]);
  useEffect(() => {
    if(show && show.cover){
      document.title = show.name + ' - ' + appName;
      setHeaderStyle({
        backgroundImage: `linear-gradient(to bottom, #161a1e, #161a1ecc, #161a1e), url(${staticURL + "/cover/" + show.cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center" // Vertical Horizontal
      });
    }
  }, [show]);
  // if(show)
  return (
    loading ? <Spinner /> : show ? (
    <>
      <header style={headerStyle} className="h-[600px] pointer-events-none"></header>
      {/* Bottom Section */}
      <div ref={section} className="container relative flex -top-[300px] gap-8">
        {/* Image Container */}
        <div><div className="overflow-hidden rounded-2xl w-72 shadow-xl"><img className="pointer-events-none" src={staticURL + "/show/" + show.image} alt={show.name} /></div></div>
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-6xl font-semibold mb-5">{show.name}</h1>
          {/* Buttons */}
          <div className="flex items-center justify-start gap-4">
            <button className="bg-mainColor py-2 px-4 rounded-full flex items-center text-lg" onClick={() => setWatchTrailer(true)}>Watch trailer <BsPlay /></button>
            <button className="border p-4 rounded-full flex items-center text-lg"><BsBookmark /></button>
            <button className="border p-4 rounded-full flex items-center text-lg"><HiOutlineShare /></button>
          </div>
          <h1 className="text-4xl font-semibold mt-6">Overview</h1>
          <p className="text-gray-200 mt-4">{show.description}</p>
          <h1 className="text-4xl font-semibold mt-6">Details</h1>
          {/* Detail Section */}
          <div className="flex items-center border-b border-gray-400 py-3 mb-5">
            <h3 className="mr-5 font-semibold text-xl">Genres:</h3>
            <div className="flex items-center gap-2">
              {show.genres && show.genres.map((genre, idx) => (
                <div className="rounded-full bg-gray-600 py-1 px-3" key={idx}>{genre}</div>
              ))}
            </div>
          </div>
          {/* Detail Section */}
          <div className="flex items-center border-b border-gray-400 py-3 mb-5">
            <h3 className="mr-5 font-semibold text-xl">Country of origin:</h3>
            <div className="flex items-center gap-2">{show.country}</div>
          </div>
          {/* Detail Section */}
          {show.runtime ? (
            <div className="flex items-center border-b border-gray-400 py-3 mb-5">
              <h3 className="mr-5 font-semibold text-xl">Runtime:</h3>
              <div className="flex items-center gap-2">{Math.floor(show.runtime / 60) + "h " + (show.runtime % 60) + "m"}</div>
            </div>
          ) : show.num_episodes ? (
            <div className="flex items-center border-b border-gray-400 py-3 mb-5">
              <h3 className="mr-5 font-semibold text-xl">Num of Episodes:</h3>
              <div className="flex items-center gap-2">{show.num_episodes}</div>
            </div>
          ) : null}
        </div>

        {/* Crew Section */}
        <div className="w-80">
          <h1 className="text-4xl font-semibold mb-5">Cast & Crew</h1>
          {/* Actors */}
          <div>
            {/* FIXME Actors below */}
            {acts && acts.map((act, idx) => (
              <Actor key={idx} id={act.actor} as={act.act_as} />
            ))}
          </div>
        </div>
      </div>
      {/* YouTube */}
      {watchTrailer && (
        <WatchTrailer url={show.trailer_link} setWatchTrailer={setWatchTrailer} />
      )}
    </>
    ) : null
  )
}

export default OneShowPage;