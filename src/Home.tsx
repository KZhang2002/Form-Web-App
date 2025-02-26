import React from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import { LoginInfo } from "./Login";
import { useLocation } from "react-router-dom";

export const SearchBar = () => {
  return (
    <div data-layer="Search bar"
         className="SearchBar w-[720px] h-14 bg-[#ece6f0] rounded-[28px] justify-start items-center gap-1 inline-flex overflow-hidden">
      <div data-layer="state-layer"
           className="StateLayer grow shrink basis-0 self-stretch p-1 justify-start items-center gap-1 flex">
        <div data-svg-wrapper data-layer="Leading-icon" className="LeadingIcon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_114_416)">
              <path d="M15 30V28H33V30H15ZM15 25V23H33V25H15ZM15 20V18H33V20H15Z" fill="#49454F"/>
            </g>
            <defs>
              <clipPath id="clip0_114_416">
                <rect x="4" y="4" width="40" height="40" rx="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div data-layer="Content"
             className="Content grow shrink basis-0 self-stretch justify-start items-center gap-2.5 flex">
          <div data-layer="supporting-text"
               className="SupportingText text-[#49454f] text-base font-normal font-['Roboto'] leading-normal tracking-wide">Search
          </div>
        </div>
        <div data-svg-wrapper data-layer="Trailing-Elements" className="TrailingElements">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_114_423)">
              <path
                d="M31.6 33L25.3 26.7C24.8 27.1 24.225 27.4167 23.575 27.65C22.925 27.8833 22.2333 28 21.5 28C19.6833 28 18.1458 27.3708 16.8875 26.1125C15.6292 24.8542 15 23.3167 15 21.5C15 19.6833 15.6292 18.1458 16.8875 16.8875C18.1458 15.6292 19.6833 15 21.5 15C23.3167 15 24.8542 15.6292 26.1125 16.8875C27.3708 18.1458 28 19.6833 28 21.5C28 22.2333 27.8833 22.925 27.65 23.575C27.4167 24.225 27.1 24.8 26.7 25.3L33 31.6L31.6 33ZM21.5 26C22.75 26 23.8125 25.5625 24.6875 24.6875C25.5625 23.8125 26 22.75 26 21.5C26 20.25 25.5625 19.1875 24.6875 18.3125C23.8125 17.4375 22.75 17 21.5 17C20.25 17 19.1875 17.4375 18.3125 18.3125C17.4375 19.1875 17 20.25 17 21.5C17 22.75 17.4375 23.8125 18.3125 24.6875C19.1875 25.5625 20.25 26 21.5 26Z"
                fill="#49454F"/>
            </g>
            <defs>
              <clipPath id="clip0_114_423">
                <rect x="4" y="4" width="40" height="40" rx="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export const Home = () => {

  const location = useLocation();
  const loginInfo: LoginInfo = location.state || {};

  return (
    <div data-layer="Default Layout"
         className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      <NavBar username={loginInfo.username} showAccount={true}/>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 inline-flex">
        <NavDrawer/>
        <div data-layer="MainContent"
             className="MainContent flex flex-col items-start gap-[30px] w-[1614px] pt-[30px] pr-[34px] pb-0 pl-[30px] self-stretch">
          <SearchBar/>
        </div>
      </div>
    </div>
  )
}

export default Home;