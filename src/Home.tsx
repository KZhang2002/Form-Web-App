import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import {
  Form,
  FormControllerApi, FormSignature, FormTemplateControllerApi, FormTemplateSignature,
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
  "Template Title": "formTitle",
  "Template Identifier": "formTemplateIdentifier",
};

export const Home = () => {
  const [sectionHeaders, setSectionHeaders] = useState<string[]>([]);
  const [processedListData, setProcessedListData] = useState<any[]>([]);
  const [formIdListData, setFormIdListData] = useState<any[]>([]);
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
      } else if (filterType === "templateList") {
        headers = ["Template Title", "Template Identifier", "Signatures"];
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

        case "templateList":
          forms = await tempApi.getAllFormTemplates();
          console.log("templates", forms)
          break;

        default:
          const signeeParams: GetFormsBySigneeRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsBySignee(signeeParams);
          break;
      }

      if (filterType !== "userList" && filterType !== "templateList") {
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
              if (filterType === "templateList") {
                const signatures: FormTemplateSignature[] = form?.formTemplateSignatureSet;
                const total = signatures.length.toString();
                return total.toString();
              } else {
                const signatures: FormSignature[] = form?.[key];
                const total = signatures.length.toString();
                const approved = signatures.reduce((count, sig) => {
                  return sig.approved === true ? count + 1 : count;
                }, 0).toString();
                return `${approved}/${total}`;
              }

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
            case "Template Title":
            case "Template Identifier":
            default:
              return form?.[key] ?? "";
          }
        })
      );

      setProcessedListData(listRows);

      if (section == "templateList") {
        const formIds = forms.map((form: any, ind: number) => {
          return form.formTemplateIdentifier ?? "";
        })

        setFormIdListData(formIds);
      } else {
        const formIds = forms.map((form: any, ind: number) => {
          return form.formId ?? 0;
        })

        setFormIdListData(formIds);
      }



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
          <div
            className="SearchBar w-[720px] h-14 bg-[#ece6f0] rounded-[28px] justify-start items-center gap-1 inline-flex overflow-hidden">
            <div className="StateLayer grow shrink basis-0 self-stretch py-1 px-5 justify-start items-center gap-1 flex">
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
          </div>

          <List data={filteredRows} formIds={formIdListData} sectionHeaders={sectionHeaders} refreshData={fetchFormData}
                filterType={section ?? ""}/>
        </div>
      </div>
    </div>
  )
}

export default Home;