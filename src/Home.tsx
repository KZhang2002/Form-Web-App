import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import {
  Form,
  FormControllerApi,
  GetFormsByAuthorRequest,
  GetFormsBySigneeRequest,
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
  "Author": "author",
  "Signatures": "signatures",
  "Form Name": "formName",
  "Form Type": "formType",
  "Date": "date"
};

export const Home = () => {
  const [sectionHeaders, setSectionHeaders] = useState<string[]>([]);
  const [processedListData, setProcessedListData] = useState<any[]>([]);
  const [listData, setListData] = useState<Form[]>([]);
  const { section } = useParams();
  const { userInfo } = useAuthStore();

  const fetchFormData = async (filterType: string) => {
    console.log(`Attempting fetch data for section: ${filterType ?? "default"}`);

    let forms = [];
    let headers: string[] = [];

    try {
      const formApi = new FormControllerApi();
      const userApi = new UserControllerApi();

      // Determine section headers locally
      if (filterType === "userList") {
        headers = ["Username", "First Name", "Last Name", "Level", "Title"];
      } else {
        headers = ["Level", "Author", "Signatures", "Form Name", "Form Type", "Date"];
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

      console.log("Fetched forms:", forms);
      setListData(forms);

      const listRows = forms.map((form: any) =>
        headers.map(header => {
          const key = headerToKeyMap[header];
          return form?.[key] ?? "";
        })
      );

      setProcessedListData(listRows);
    } catch (e) {
      console.error(`Failed to fetch forms for section ${filterType}:`, e);
    }
  };

  useEffect(() => {
    console.log("Switched to section", section)
    fetchFormData(section ?? "default");
  }, [section]);

  return (
    <div data-layer="Default Layout"
         className="DefaultLayout w-full h-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      <NavBar/>
      <div data-layer="Content" className="Content h-[995px] justify-start items-center gap-2.5 inline-flex">
        <NavDrawer/>
        <div data-layer="MainContent"
             className="MainContent flex flex-col items-start gap-[30px] w-[1614px] pt-[30px] pr-[34px] pb-0 pl-[30px] self-stretch">
          {/*<SearchBar/>*/}
          <List data={processedListData} sectionHeaders={sectionHeaders} refreshData={fetchFormData} filterType={section} />
        </div>
      </div>
    </div>
  )
}

export default Home;