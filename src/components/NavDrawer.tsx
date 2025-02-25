import React from "react";
import {RequestIcon, SentIcon, DraftIcon} from "./Icons";

export const NavDrawer = () => {
  return (
    <div data-layer="Navigation Drawer/Default"
         className="NavigationDrawerDefault w-[306px] h-[995px] p-3 bg-[#f7f2fa] flex-col justify-start items-start inline-flex overflow-hidden">
      <div data-layer="Inbox"
           className="Inbox self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">
        <div data-layer="state-layer"
             className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <RequestIcon/>
          <div data-layer="Label"
               className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Requests
          </div>
          <div data-layer="Badge label text"
               className="BadgeLabelText text-right text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">123
          </div>
        </div>
      </div>
      <div data-layer="Sent"
           className="Sent self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">
        <div data-layer="state-layer"
             className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <SentIcon/>
          <div data-layer="Label"
               className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Sent
          </div>
        </div>
      </div>
      <div data-layer="Drafts"
           className="Drafts self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">
        <div data-layer="state-layer"
             className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
          <DraftIcon/>
          <div data-layer="Label"
               className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Drafts
          </div>
        </div>
      </div>
    </div>
  )
}