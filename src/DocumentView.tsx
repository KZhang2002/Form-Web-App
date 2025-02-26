import React from 'react';
import './App.css';
import './Home'

export const DocumentView = () => {
  const thingamajig = (num: number) => {
    // do stuff
    return num;
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white w-[500px] h-[500px] p-8 shadow-lg rounded-lg">
        <p>Your document content goes here...</p>
      </div>
    </div>

  )
};

export default DocumentView;