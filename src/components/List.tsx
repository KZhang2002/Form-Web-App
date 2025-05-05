import {useNavigate} from "react-router-dom";
import React from "react";

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
  let color;
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

type ListProps = {
  data: any[];
  refreshData: () => Promise<void>;
};

export const List = ({ data, refreshData }: ListProps) => {
  console.log(data);

  return (
    <div>
      <button onClick={() => {
        // console.log('button clicked')
        refreshData()
      }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Refresh
      </button>
      <md-list style={{maxWidth: "1550px", backgroundColor: "#ffffff"}}>
        <ListItem key={-1} isHeader={true} index={-1}/>
        {data.map((item, index) => (
          <ListItem key={index} {...{...item, index}} />
        ))}
      </md-list>
    </div>
  )
}