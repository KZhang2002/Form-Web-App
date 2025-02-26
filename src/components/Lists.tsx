import {useNavigate} from "react-router-dom";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import React from "react";

interface listItemProps {
  isHeader: boolean; //todo could probably come up with a better solution than this
  listFormat: object;
  // level?: number;
  // author?: string;
  // signaturesGotten?: number;
  // signaturesRequired?: number;
  // formName?: string;
  // formType?: string; // todo replace with formalized formtype variable?
  // arrivalDate?: Date;
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
  const func = isHeader ? () => {} : () => navigate("/doc"); //todo rename

  return (
    <md-list-item onClick={func} className={`w-[1421px] items-center ${color} ${isHeader ? "" : "cursor-pointer"}`}>
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