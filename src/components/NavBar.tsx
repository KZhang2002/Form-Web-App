import React from "react";
// import { ReactComponent as Icon } from './icon.svg';
import Logo from "./Icons";


export const NavBar = () => {
  return (
    <div data-layer="Top Bar"
         className="TopBar  self-stretch px-[29px] py-2.5 bg-[#0033a0] justify-start items-center gap-[81px] inline-flex">
      <div data-layer="Logo Group" className="LogoGroup justify-start items-center gap-[18px] flex">
        <Logo/>
        <div data-layer="Title" className="Title w-[503px] h-[58px] justify-start items-center gap-[21px] inline-flex">
          <div data-layer="SwiftForms Admin Tools" className="SwiftformsAdminTools"><span
            className="text-white text-5xl font-bold font-['Inter'] whitespace-pre">SwiftForms   </span><span
            className="text-[#dfcbcb] text-4xl font-semibold font-['Inter']">Admin Tools</span></div>
        </div>
      </div>
      <div data-layer="Account Area"
           className="AccountArea grow shrink basis-0 h-[52px] justify-end items-center flex">
        <div data-layer="Login Button"
             className="LoginButton w-[191px] h-[52px] px-11 py-[7px] bg-[#c70f2e] rounded-lg justify-center items-center gap-2.5 flex">
          <div data-layer="Log In"
               className="LogIn text-center text-white text-[32px] font-medium font-['Inter']">Login
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;