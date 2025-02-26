import React from 'react';
import './App.css';
import './Home'
import NavBar from "./components/NavBar";
import { NavDrawer } from "./components/NavDrawer";

export const DocumentView = () => {
  const thingamajig = (num: number) => {
    // do stuff
    return num;
  }

  return (
    <div>
      <div className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
        <NavBar username={"Placeholder"} showAccount={true}/>
      </div>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 flex">
        <NavDrawer />
        <div className="h-screen flex flex-1 justify-center items-center bg-gray-200 self-stretch">
          <div className="bg-white w-[500px] h-[500px] p-8 shadow-lg rounded-lg">
            <p>Your document content goes here...</p>
          </div>
        </div>
      </div>

    </div>


  )
};

export default DocumentView;