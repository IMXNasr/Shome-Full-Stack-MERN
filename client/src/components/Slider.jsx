import React, { useState } from 'react';
import { staticURL } from '../utils/constants';
import { BsBookmark, BsChevronLeft, BsPlay } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Arrow = ({onClick, right}) => {
  return (
    <button onClick={onClick} className={`rounded-full aspect-square grid place-items-center bg-gray-500/50 p-1 mx-3 ${right && "rotate-180"}`}>
      <BsChevronLeft size={25} />
    </button>
  )
}

const Slider = ({shows, activeSlider, setActiveSlider, setWatchTrailer}) => {
  if(shows && shows[0])
  return (
    <div
      className="rounded-3xl overflow-hidden h-[600px] bg-cover bg-center bg-opacity-30 flex items-center justify-between"
      style={{backgroundImage: `linear-gradient(to top, #161a1eaa, #161a1eaa), url(${staticURL + '/cover/' + shows[activeSlider].cover})`}}>
      <Arrow onClick={() => setActiveSlider(activeSlider === 0 ? shows.length - 1 : activeSlider - 1)} />
      <div className="flex-1 h-[85%] flex flex-col justify-end">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl">
          <Link to={`/${shows[activeSlider].type}/${shows[activeSlider]._id}`}>{shows[activeSlider].name}</Link>
        </h1>
        <p className="max-w-2xl text-gray-200 my-2">{shows[activeSlider].genres && shows[activeSlider].genres.map((genre, idx, genres) => genre.toUpperCase() + ((genres.length - 1 !== idx) ? ', ' : ''))}</p>
        {/* Buttons */}
        <div className="flex items-center justify-start gap-4">
          <button className="bg-mainColor py-2 px-3 rounded-full flex items-center text-md" onClick={() => setWatchTrailer(true)}>Watch trailer <BsPlay /></button>
          <button className="border p-3 rounded-full flex items-center text-md"><BsBookmark /></button>
        </div>
      </div>
      <Arrow onClick={() => setActiveSlider(activeSlider === shows.length - 1 ? 0 : activeSlider + 1)} right />
    </div>
  )
}

export default Slider;