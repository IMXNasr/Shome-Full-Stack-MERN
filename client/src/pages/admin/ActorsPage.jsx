import React from 'react';

const ActorsPage = ({title}) => {
  document.title = title;
  return (
    <main className="container">
      <h1 className="text-4xl font-semibold my-5">Actors:</h1>
    </main>
  )
}

export default ActorsPage;