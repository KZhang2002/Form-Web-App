import React from 'react';
import './App.css';
import './Home.tsx'

export const Example = () => {
  const thingamajig = (num: number)=> {
    // do stuff
    return num;
  }

  return (
    <div>
      {thingamajig(3)}
    </div>
  )
};

export default Example;