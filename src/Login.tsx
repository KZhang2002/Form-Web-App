import React from 'react';
import './App.css';
import './Home'

export const Login = () => {
  const thingamajig = (num: number)=> {
    // do stuff
    return num;
  }

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="bg-blue-500">
      </div>
      <div className="grid grid-rows-5">
        <div className="bg-gray-500">
        </div>
        <div className="row-span-3 flex flex-col">
          <div className="text-center text-5xl font-sans m-5">
            Log into SwiftForms
          </div>
          <div className="text-xl font-sans m-5">
            Username
          </div>
          <input className="flex border-2 mx-5" type="text"/>
          <div className="text-xl font-sans m-5">
            Password
          </div>
          <input className="flex border-2 mx-5" type="text"/>
          <div className="mt-auto flex justify-center">
            <button className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-fit">Log In</button>
          </div>
          
        </div>
        <div className="bg-gray-500">
        </div>
      </div>
      <div className="bg-blue-500">
      </div>
    </div>
    
  )
};

export default Login;