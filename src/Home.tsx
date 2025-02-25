import React from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";

export const Home = () => {
  return (
    <div data-layer="Default Layout"
         className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      <NavBar/>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 inline-flex">
        <NavDrawer/>
      </div>
    </div>
  )
}

export default Home;