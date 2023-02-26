import React, { useEffect, useRef, useState } from 'react';
import { BsPlay, BsBookmark } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';
import { Actor } from '../components';
import { useParams } from 'react-router-dom';
import { shows } from '../utils/data';
import ReactPlayer from 'react-player/youtube';

const MoviePage = () => {
  const {id} = useParams();
  const [show, setShow] = useState({});
  const [watchTrailer, setWatchTrailer] = useState(false);
  const section = useRef();
  const headerStyle = {
    backgroundImage: `linear-gradient(to bottom, #161a1e, #161a1ecc, #161a1e), url(/${show.cover})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center" // Vertical Horizontal
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let value = window.scrollY;
      section.current.style.top = '-' + (value * 0.5 + 300) + 'px';
    });
    setShow(shows.find(show => show.id === +id));
  }, []);
  console.log(show);
  if(show)
  return (
    <>
      <header style={headerStyle} className="h-[600px] pointer-events-none"></header>
      {/* Bottom Section */}
      <div ref={section} className="container relative flex -top-[300px] gap-8">
        {/* Image Container */}
        <div><div className="overflow-hidden rounded-2xl w-72 shadow-xl"><img className="pointer-events-none" src={`/${show.image}`} alt={show.name} /></div></div>
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
              {show.categories && show.categories.map((category, idx) => (
                <div className="rounded-full bg-gray-600 py-1 px-3" key={idx}>{category}</div>
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
              <div className="flex items-center gap-2">{show.runtime + "m"}</div>
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
            {show.actors && show.actors.map((actor, idx) => (
              <Actor key={idx} img={actor.photo} name={actor.name} as={actor.as} />
            ))}
          </div>
        </div>
      </div>
      {/* YouTube */}
      {watchTrailer && (
        <div className="fixed w-full h-full bg-bgDark/90 top-0 left-0 grid place-items-center" onClick={() => setWatchTrailer(false)}>
          <ReactPlayer url={show.trailer_link} controls />
        </div>
      )}
    </>
  )
}

export default MoviePage;