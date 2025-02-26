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

export const UsersIcon = () => {
  return (
    <div data-svg-wrapper data-layer="UserList" className="UserList relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_145_1386)">
          <path
            d="M16.67 13.1299C18.04 14.0599 19 15.3199 19 16.9999V19.9999H23V16.9999C23 14.8199 19.43 13.5299 16.67 13.1299Z"
            fill="#323232"/>
          <path
            d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5 5.27 15 6.58 15 8C15 9.42 14.5 10.73 13.67 11.76C14.09 11.9 14.53 12 15 12Z"
            fill="#323232"/>
          <path
            d="M9 12C11.21 12 13 10.21 13 8C13 5.79 11.21 4 9 4C6.79 4 5 5.79 5 8C5 10.21 6.79 12 9 12ZM9 6C10.1 6 11 6.9 11 8C11 9.1 10.1 10 9 10C7.9 10 7 9.1 7 8C7 6.9 7.9 6 9 6Z"
            fill="#323232"/>
          <path
            d="M9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13ZM15 18H3V17.01C3.2 16.29 6.3 15 9 15C11.7 15 14.8 16.29 15 17V18Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_145_1386">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export const FormIcon = () => {
  return (
    <div data-svg-wrapper data-layer="FormList" className="FormList relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_145_1399)">
          <path
            d="M12 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7H12C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H12C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13ZM12 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H12C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM20 3H4C3.45 3 3 3.45 3 4V20C3 20.55 3.45 21 4 21H20C20.55 21 21 20.55 21 20V4C21 3.45 20.55 3 20 3ZM19 19H5V5H19V19Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_145_1399">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export const AccountCreationIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Icon" className="Icon relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_145_1406)">
          <path
            d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.9 17 8C17 9.1 16.1 10 15 10C13.9 10 13 9.1 13 8C13 6.9 13.9 6 15 6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14ZM9 18C9.22 17.28 12.31 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 15V12H9V10H6V7H4V10H1V12H4V15H6Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_145_1406">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export const FolderIcon = () => {
  return (
    <div data-svg-wrapper data-layer="Icon" className="Icon relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_71_1656)">
          <path
            d="M9.17 6L11.17 8H20V18H4V6H9.17ZM10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z"
            fill="#323232"/>
        </g>
        <defs>
          <clipPath id="clip0_71_1656">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export const PlusIcon = () => {
  return (
    <div data-svg-wrapper className="relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M5 12H19" stroke="#323232" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export const LogOutIcon = () => {
  return (
    <div data-svg-wrapper className="relative">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
          stroke="#323232" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}


export default Logo;
