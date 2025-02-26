import React from "react";

export const SwiftFormsIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Clipboard" className="Clipboard relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 8H36C37.0609 8 38.0783 8.42143 38.8284 9.17157C39.5786 9.92172 40 10.9391 40 12V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8H16M18 4H30C31.1046 4 32 4.89543 32 6V10C32 11.1046 31.1046 12 30 12H18C16.8954 12 16 11.1046 16 10V6C16 4.89543 16.8954 4 18 4Z"
          stroke="#F3F3F3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export const Logo = () => {
  return (
    <div data-layer="Logo Master Component" className="LogoMasterComponent w-[66px] h-[66px] relative">
      <div data-layer="Ellipse"
           className="Ellipse1 w-[66px] h-[66px] left-0 top-0 absolute bg-[#da2323] rounded-full"/>
      <div data-svg-wrapper data-layer="Clipboard" className="Clipboard left-[9px] top-[7px] absolute">
        <SwiftFormsIcon/>
      </div>
    </div>
  )
}

export const RequestIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Icon" className="Icon relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_107_517)">
          <path
            d="M7 15H14V17H7V15ZM7 11H17V13H7V11ZM7 7H17V9H7V7ZM19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 19H5V5H19V19Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_107_517">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export const SentIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Icon" className="Icon relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17ZM5 17V12V7V10.5V13.5V17Z"
              fill="#1D1B20"/>
      </svg>
    </div>
  )
}

export const DraftIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Icon" className="Icon relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_107_537)">
          <path
            d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02V9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3V3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19V6.19Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_107_537">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Logo;
