import {useNavigate} from "react-router-dom";
import React from "react";

type ListItemProps = {
  isHeader: boolean;
  index: number;
  headers: string[]; // Array of section headers
  data: string[]; // Array of corresponding data
};

const ListItem = (props: ListItemProps) => {
  const { isHeader, headers, data, index } = props;

  // If there is no data, display the "No forms here" message
  if (data.length === 0 && index >= 0) {
    return (
      <md-list-item className="w-[1421px] items-center bg-slate-100">
        <div className="justify-center gap-9 flex">
          <div className="w-full text-center text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
            There are no forms here!
          </div>
        </div>
      </md-list-item>
    );
  }

  let color;
  if (index < 0) color = "bg-slate-300";
  else if (index % 2 == 1) color = "bg-slate-200";
  else color = "bg-slate-100";

  return (
    <md-list-item className={`w-[1421px] items-center ${color} ${isHeader ? "" : "cursor-pointer"}`}>
      <div slot="headline" className="justify-start gap-9 flex">
        {headers.map((header, idx) => (
          <div
            key={idx}
            className="text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide"
          >
            {header}
          </div>
        ))}
      </div>
    </md-list-item>
  );
};


type ListProps = {
  sectionHeaders: string[]; // Array of section headers
  data: any[]; // Array of data objects
  refreshData: (filterType: string) => Promise<void>;
  filterType: string;
};

export const List = ({ sectionHeaders, data, refreshData, filterType }: ListProps) => {
  console.log("List received this data: ", data);

  return (
    <div>
      <button
        onClick={() => refreshData(filterType)}
        className="px-12 py-2 mb-5 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Refresh
      </button>
      <md-list style={{ maxWidth: "1550px", backgroundColor: "#ffffff" }}>
        <ListItem key={-1} isHeader={true} index={-1} headers={sectionHeaders} data={[]} />
        {data.length ? (
          data.map((item, index) => (
            <ListItem key={index} isHeader={false} index={index} headers={sectionHeaders} data={Object.values(item)} />
          ))
        ) : (
          <ListItem key={0} isHeader={false} index={0} headers={sectionHeaders} data={[]} />
        )}
      </md-list>
    </div>
  );
};
