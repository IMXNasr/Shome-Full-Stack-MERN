import React from 'react'

const Actor = ({img, name, as}) => {
  return (
    <div className="flex gap-4 mb-5">
      {/* Actor Image */}
      <div className="w-16 aspect-square rounded-full overflow-hidden">
        <img src={`/${img}`} alt="tom" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <h4 className="text-sm">as {as}</h4>
      </div>
    </div>
  )
}

export default Actor;