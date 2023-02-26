import React from 'react';
import { ShowCard } from '../components';

const HomePage = ({title}) => {
  document.title = title;
  const show = {
    name: "Venom",
    image: "venom.jpg",
    rating: 9.4
  }
  return (
    <main className="container py-4">
      <h1 className="text-4xl font-semibold">Popular on Shome</h1>
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

export default HomePage;