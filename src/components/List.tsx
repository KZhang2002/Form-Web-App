import {useNavigate} from "react-router-dom";
import React from "react";

export const headerToKeyMap: Record<string, string> = {
  "Username": "username",
  "First Name": "firstName",
  "Last Name": "lastName",
  "Level": "level",
  "Title": "title",
  "Author": "author",
  "Signatures": "signatures",
  "Form Name": "formName",
  "Form Type": "formType",
  "Date": "publishDate"
};

type ListItemProps = {
  isHeader: boolean;
  index: number;
  headers: string[]; // Array of section headers
  data: string[]; // Array of corresponding data
  isForm?: boolean;
  formId?: number;
};

const ListItem = (props: ListItemProps) => {
  const { isHeader, headers, data, index, isForm = false, formId = -1 } = props;

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (isHeader || !isForm) return;
    navigate(`/doc/${formId}`);
  };

  // If there is no data to show and it's not the header, display a message
  if (!isHeader && (!data || data.length === 0)) {
    return (
      <md-list-item className="w-[1421px] items-center bg-slate-100">
        <div className="justify-center gap-9 flex w-full">
          <div className="w-full text-center text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
            There are no forms for you here!
          </div>
        </div>
      </md-list-item>
    );
  }

  let color;
  if (index < 0) color = "bg-slate-300";
  else if (index % 2 === 1) color = "bg-slate-200";
  else color = "bg-slate-100";

  return (
    <md-list-item className={`w-[1421px] items-center ${color} ${isHeader || !isForm ? "" : "cursor-pointer"}`}
                  onClick={() => handleClick(1)}
    >
      <div slot="headline" className="justify-start gap-9 flex">
        {(isHeader ? headers : data).map((text, idx) => (
          <div
            key={idx}
            className="text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide"
          >
            {text ?? "error"}
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
  isForms: boolean;
};

export const List = ({ sectionHeaders, data, refreshData, filterType, isForms }: ListProps) => {
  console.log("List received this data: ", data);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => refreshData(filterType)}
        className="px-12 py-2 mb-5 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Refresh
      </button>
      <div className="max-h-[700px] overflow-y-auto">
        <md-list style={{ maxWidth: "1550px", backgroundColor: "#ffffff" }}>
          <ListItem key={-1} isHeader={true} index={-1} headers={sectionHeaders} data={[]} />
          {data.length ? (
            data.map((row, index) => (
              <ListItem key={index} isHeader={false} index={index} headers={sectionHeaders} data={row} isForm={isForms} formId={index + 1} />
            ))
          ) : (
            <ListItem key={0} isHeader={false} index={0} headers={sectionHeaders} data={[]} />
          )}
        </md-list>
      </div>
    </div>
  );
};

