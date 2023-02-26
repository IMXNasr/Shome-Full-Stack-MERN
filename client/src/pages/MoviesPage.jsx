import React from 'react';
import { ShowCard } from '../components';

const MoviesPage = ({title}) => {
  document.title = title;
  const show = {
    name: "Predator",
    image: "/predator.jpg",
    rating: 5.5
  }
  return (
    <main className="container py-4 mt-6">
      <h1 className="text-4xl font-semibold">All Movies</h1>
      {/* Grid Shows */}
      <div className="grid grid-cols-4 mt-5 gap-6">
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
        <ShowCard show={show} />
      </div>
    </main>
  )
}

export default MoviesPage;