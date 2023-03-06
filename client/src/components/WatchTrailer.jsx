import React from 'react';
import YouTubePlayer from 'react-player/youtube';

const WatchTrailer = ({setWatchTrailer, url}) => {
  return (
    <div className="fixed w-full h-full bg-bgDark/90 top-0 left-0 flex flex-col justify-center" onClick={() => setWatchTrailer(false)}>
      <div className="max-w-6xl aspect-video relative left-1/2 -translate-x-1/2">
        <YouTubePlayer width="100%" height="100%" url={url} controls />
      </div>
    </div>
  )
}

export default WatchTrailer;