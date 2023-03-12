import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { staticURL, URL } from '../utils/constants';

const Actor = ({id, as}) => {
  const [actor, setActor] = useState({});
  const getActor = async () => {
    const {data} = await axios.get(`${URL}/actors/${id}`);
    setActor(data);
  }
  useEffect(() => {
    getActor();
  }, []);
  if(actor)
  return (
    <div className="flex gap-4 mb-5">
      {/* Actor Image */}
      <div>
        <div className="w-16 aspect-square rounded-full overflow-hidden">
          <img className="pointer-events-none" src={`${staticURL}/actor/${actor.photo}`} alt={actor.name} />
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{actor.name}</h2>
        <h4 className="text-sm">as {as}</h4>
      </div>
    </div>
  )
}

export default Actor;