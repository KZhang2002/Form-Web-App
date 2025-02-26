import React from "react";
import { useNavigate } from 'react-router-dom';
import {RequestIcon, SentIcon, DraftIcon, FormIcon, AccountCreationIcon, UsersIcon, PlusIcon, LogOutIcon} from "./Icons";

interface NavDrawerProps {
  isAdmin?: boolean
}

export const NavDrawer: React.FC<NavDrawerProps> = ({isAdmin = true}) => {

  const navigate = useNavigate();

  return (
    <div>
      <div data-layer="Standard Tools"
           className="NavigationDrawerDefault w-[306px] h-[995px] p-3 bg-[#f7f2fa] flex-col justify-start items-start inline-flex overflow-hidden ">
        <div data-layer="Account Creation" onClick={() => navigate("/")}
             className="AccountCreation self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <PlusIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Create
              Form
            </div>
          </div>
        </div>
        <div data-layer="Inbox" onClick={() => navigate("/")}
             className="Inbox self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
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
        <div data-layer="Sent" onClick={() => navigate("/")}
             className="Sent self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <SentIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Sent
            </div>
          </div>
        </div>
        {/*<div data-layer="Drafts" onClick={() => navigate("/")}*/}
        {/*     className="Drafts self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">*/}
        {/*  <div data-layer="state-layer"*/}
        {/*       className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">*/}
        {/*    <DraftIcon/>*/}
        {/*    <div data-layer="Label"*/}
        {/*         className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Drafts*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div data-layer="Divider" className="w-[397px] h-px px-4 flex-col justify-center items-start inline-flex">
          <div className="self-stretch h-[0px] border border-stone-300"></div>
        </div>
        <div data-layer="Account Creation" onClick={() => navigate("/")}
             className="AccountCreation self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <PlusIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Create
              Account
            </div>
          </div>
        </div>
        <div data-layer="User List" onClick={() => navigate("/")}
             className="UserList self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <UsersIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">User
              List
            </div>
          </div>
        </div>
        <div data-layer="Form List" onClick={() => navigate("/")}
             className="FormList self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <FormIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Form
              List
            </div>
          </div>
        </div>
        <div data-layer="Divider" className="w-[397px] h-px px-4 flex-col justify-center items-start inline-flex">
          <div className="self-stretch h-[0px] border border-stone-300"></div>
        </div>
        <div data-layer="Form List" onClick={() => navigate("/")}
             className="FormList self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden cursor-pointer">
          <div data-layer="state-layer"
               className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">
            <LogOutIcon/>
            <div data-layer="Label"
                 className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">Log Out
            </div>
          </div>
        </div>

        {/*<div data-layer="Create Forms"*/}
        {/*     className="CreateForms self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">*/}
        {/*  <div data-layer="state-layer"*/}
        {/*       className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">*/}
        {/*    <AccountCreationIcon />*/}
        {/*    <div data-layer="Label"*/}
        {/*         className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div data-layer="Archived Forms"*/}
        {/*     className="ArchivedForms self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">*/}
        {/*  <div data-layer="state-layer"*/}
        {/*       className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">*/}
        {/*    /!*<FormIcon /> *!/*/}
        {/*    <div data-layer="Label"*/}
        {/*         className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div data-layer="Trash"*/}
        {/*     className="Trash self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex overflow-hidden">*/}
        {/*  <div data-layer="state-layer"*/}
        {/*       className="StateLayer grow shrink basis-0 self-stretch pl-4 pr-6 py-4 justify-start items-center gap-3 flex">*/}
        {/*    /!*<TrashIcon /> *!/*/}
        {/*    <div data-layer="Label"*/}
        {/*         className="Label grow shrink basis-0 text-[#49454f] text-sm font-medium font-['Roboto'] leading-tight tracking-tight">*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}