import React from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import { LoginInfo } from "./Login";
import {useLocation, useNavigate} from "react-router-dom";

export const SearchBar = () => {
  return (
    <div data-layer="Search bar"
         className="SearchBar w-[720px] h-14 bg-[#ece6f0] rounded-[28px] justify-start items-center gap-1 inline-flex overflow-hidden">
      <div data-layer="state-layer"
           className="StateLayer grow shrink basis-0 self-stretch p-1 justify-start items-center gap-1 flex">
        <div data-svg-wrapper data-layer="Leading-icon" className="LeadingIcon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_114_416)">
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
            <g clipPath="url(#clip0_114_423)">
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

interface listItemProps {
  isHeader: boolean; //todo could probably come up with a better solution than this
  level?: number;
  author?: string;
  signaturesGotten?: number;
  signaturesRequired?: number;
  formName?: string;
  formType?: string; // todo replace with formalized formtype variable?
  arrivalDate?: Date;
  index?: number;
}

export const ListItem = (props: listItemProps) => {
  const { isHeader, level, author, signaturesGotten, signaturesRequired, formName, formType, arrivalDate, index } = props;
  let color = "bg-blue-400";
  console.log(index);
  if (index < 0) color = "bg-slate-300"
  else if (index % 2 == 1) color = "bg-slate-200"
  else color = "bg-slate-100"

  const navigate = useNavigate();

  return (
    <md-list-item onClick={() => navigate("/doc")} className={`w-[1421px] items-center ${color} cursor-pointer`}>
      <div slot="headline" className="justify-start gap-9 flex">
        <div
          className="w-[103px] text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Level" : level}`}
        </div>
        <div
          className="w-[260px] text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Author" : author}`}
        </div>
        <div
          className="w-[134px] text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Signatures" : `${signaturesGotten}/${signaturesRequired}`}`}
        </div>
        <div
          className="w-[483px] text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Form Name" : formName}`}
        </div>
        <div
          className="w-[104px] text-right text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Form Type" : formType}`}
        </div>
        <div
          className="w-[157px] text-right text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {`${isHeader ? "Date" : arrivalDate}`}
        </div>
      </div>
    </md-list-item>
  )
}

interface ListItemProps {
  isHeader: boolean;
  level?: number;
  author?: string;
  signaturesGotten?: number;
  signaturesRequired?: number;
  formName?: string;
  formType?: string;
  arrivalDate?: string;
}

const listData: ListItemProps[] = [
  {
    isHeader: false, // Regular item
    level: 1,
    author: "John Doe",
    signaturesGotten: 3,
    signaturesRequired: 5,
    formName: "Form A",
    formType: "Type 1",
    arrivalDate: "2024-01-01",
  },
  {
    isHeader: false, // Another regular item
    level: 0,
    author: "Jane Smith",
    signaturesGotten: 2,
    signaturesRequired: 3,
    formName: "Form B",
    formType: "Type 2",
    arrivalDate: "2024-01-02",
  },
  {
    isHeader: false, // Another regular item
    level: 4,
    author: "Audrey Zou",
    signaturesGotten: 42,
    signaturesRequired: 98,
    formName: "Proposition to Ban all Witches from Campus",
    formType: "Proposition",
    arrivalDate: "2024-01-02",
  },
  {
    isHeader: false, // Another regular item
    level: 4,
    author: "Miriam Webster",
    signaturesGotten: 123,
    signaturesRequired: 456,
    formName: "Petition to Ban Audrey Zou from Campus",
    formType: "Petition",
    arrivalDate: "2024-01-02",
  },
  // More items can be added here
];

export const List = () => {
  return (
    <div>
      <md-list style={{maxWidth: "1550px", backgroundColor: "#ffffff"}}>
        <ListItem key={-1} isHeader={true} index={-1}/>
        {listData.map((item, index) => (
          <ListItem key={index} {...{...item, index}} />
        ))}
      </md-list>
    </div>
  )
}

export const Home = () => {

  const location = useLocation();
  const loginInfo: LoginInfo = location.state || {}; // todo add zustand to simplify passing down data

  return (
    <div data-layer="Default Layout"
         className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      <NavBar username={loginInfo.username} showAccount={true}/>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 inline-flex">
        <NavDrawer/>
        <div data-layer="MainContent"
             className="MainContent flex flex-col items-start gap-[30px] w-[1614px] pt-[30px] pr-[34px] pb-0 pl-[30px] self-stretch">
          <SearchBar/>
          <List/>
        </div>
      </div>
    </div>
  )
}

export default Home;