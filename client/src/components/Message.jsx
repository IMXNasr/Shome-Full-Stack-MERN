import React from 'react';

const Message = ({type, children}) => {
  return (
    <>
    {type === 'success' ? (
      <div className={`bg-transparent w-full p-3 text-green-600 border-green-600 border-2 rounded`}>{children}</div>
    ) : type === 'error' ? (
      <div className={`bg-transparent w-full p-3 text-red-600 border-red-600 border-2 rounded`}>{children}</div>
    ) : null}
    </>
  )
}

export default Message;