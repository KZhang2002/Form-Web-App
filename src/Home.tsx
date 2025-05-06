import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import {
  Form,
  FormControllerApi, FormSignature, FormTemplateControllerApi,
  GetFormsByAuthorRequest,
  GetFormsBySigneeRequest, GetUserFromFormRequest,
  UserControllerApi
} from "./typing";
import {List} from "./components/List";
import { useParams } from "react-router-dom";
import {useAuthStore} from "./stores/useAuthStore";

export const headerToKeyMap: Record<string, string> = {
  "Username": "username",
  "First Name": "firstName",
  "Last Name": "lastName",
  "Level": "level",
  "Title": "title",
  "Author": "username",
  "Signatures": "formSignatureSet",
  "Form Name": "formTitle",
  "Form Type": "formTemplateIdentifier",
  "Date": "publishDate",
  "Author Level": "level",
  "Form ID": "formId",
};

export const Home = () => {
  const [sectionHeaders, setSectionHeaders] = useState<string[]>([]);
  const [processedListData, setProcessedListData] = useState<any[]>([]);
  const [listData, setListData] = useState<Form[]>([]);
  const [query, setQuery] = useState("");

  const { section } = useParams();
  const userInfo = useAuthStore((state) => state.userInfo);

  const fetchFormData = async (filterType: string) => {
    console.log(`Attempting fetch data for section: ${filterType ?? "default"}`);

    let forms = [];
    let other = [];
    let temps = []; // templates
    let headers: string[] = [];

    try {
      const formApi = new FormControllerApi();
      const userApi = new UserControllerApi();
      const tempApi = new FormTemplateControllerApi();

      // Determine section headers locally
      if (filterType === "userList") {
        headers = ["Username", "First Name", "Last Name", "Level", "Title"];
      } else {
        headers = ["Author Level", "Author", "Signatures", "Form Name", "Form Type", "Form ID", "Date"];
      }

      setSectionHeaders(headers);

      switch (filterType) {
        case "sent":
          const sentParams: GetFormsByAuthorRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsByAuthor(sentParams);
          break;

        case "userList":
          forms = await userApi.getUsers();
          break;

        case "formList":
          forms = await formApi.getForms();
          break;

        default:
          const signeeParams: GetFormsBySigneeRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsBySignee(signeeParams);
          break;
      }

      if (filterType !== "userList") {
        other = await Promise.all(
          forms.map(async (form) => {
            const user = await userApi.getUserFromForm({ formId: form.formId });
            return user;
          })
        );

        temps = await Promise.all(
          forms.map(async (form) => {
            const temp = await tempApi.getTemplateFromForm({ formId: form.formId });
            return temp;
          })
        );
      }

      console.log("Fetched forms:", forms);
      console.log("Fetched other:", other);
      setListData(forms);

      const listRows = forms.map((form: any, ind: number) =>
        headers.map(header => {
          const key = headerToKeyMap[header];
          if (!key) {
            console.warn(`No mapping found for header: ${header}`);
            return "";
          }

          switch (header) {
            case "Author":
            case "Author Level":
              return other[ind]?.[key] ?? "";

            case "Form Name":
            case "Form Type":
              return temps[ind]?.[key] ?? "";

            case "Signatures":
              const signatures: FormSignature[] = form?.[key];
              const total = signatures.length.toString();
              const approved = signatures.reduce((count, sig) => {
                return sig.approved === true ? count + 1 : count;
              }, 0).toString();
              return `${approved}/${total}`;

            case "Date":
              const date: Date = form?.[key];
              return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).toString() ?? "";

            case "Level":
            case "Username":
            case "First Name":
            case "Last Name":
            case "Title":
            case "Form ID":
            default:
              return form?.[key] ?? "";
          }
        })
      );

      setProcessedListData(listRows);
    } catch (e) {
      console.error(`Failed to fetch forms for section ${filterType}:`, e);
    }
  };

  const filteredRows = processedListData.filter(row =>
    row.some(cell =>
      cell.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  useEffect(() => {
    console.log("Switched to section", section)
    fetchFormData(section ?? "default");
  }, [section]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query.trim());
    }
  };

  const onSearch = (q: string) => {
    setQuery(q);
  }


  return (
    <div data-layer="Default Layout"
         className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      <NavBar/>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 inline-flex">
        <NavDrawer/>
        <div data-layer="MainContent"
             className="MainContent flex flex-col items-start gap-[30px] w-[1614px] pt-[30px] pr-[34px] pb-0 pl-[30px] self-stretch">

          {/* Search bar */}
          <div
            className="SearchBar w-[720px] h-14 bg-[#ece6f0] rounded-[28px] justify-start items-center gap-1 inline-flex overflow-hidden">
            <div className="StateLayer grow shrink basis-0 self-stretch p-1 justify-start items-center gap-1 flex">
              <div className="LeadingIcon">
                {/* Menu icon */}
              </div>
              <div className="Content grow shrink basis-0 self-stretch justify-start items-center gap-2.5 flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                  className="bg-transparent outline-none text-[#49454f] text-base font-normal font-['Roboto'] leading-normal tracking-wide w-full"
                />
              </div>
              <div className="TrailingElements cursor-pointer" onClick={() => onSearch(query.trim())}>
                {/* Search icon */}
              </div>
            </div>
          </div>

          <List data={filteredRows} sectionHeaders={sectionHeaders} refreshData={fetchFormData}
                filterType={section ?? ""} isForms={section !== "userList"}/>
        </div>
      </div>
    </div>
  )
}

export default Home;