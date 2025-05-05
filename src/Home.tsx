import React, {useEffect, useState} from "react";
import NavBar from "./components/NavBar";
import {NavDrawer} from "./components/NavDrawer";
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import { LoginInfo } from "./Login";
import {useLocation, useNavigate} from "react-router-dom";
import {getData} from "./backend/apiClient";
import {
  Form,
  FormControllerApi,
  GetFormsByAuthorRequest,
  GetFormsBySigneeRequest,
  GetUserFromFormRequest,
  UserControllerApi
} from "./typing";
import {List} from "./components/List";
import { useParams } from "react-router-dom";
import {useAuthStore} from "./stores/useAuthStore";

export const Home = () => {
  const [sectionHeaders, setSectionHeaders] = useState<string[]>([]);
  const [listData, setListData] = useState<Form[]>([]);
  const { section } = useParams();
  const { userInfo } = useAuthStore();

  const fetchFormData = async (filterType: string) => {
    console.log(`Attempting fetch data for section: ${filterType ?? "default"}`);

    let forms = [];

    try {
      const formApi = new FormControllerApi();
      const userApi = new UserControllerApi();

      // Determine section headers based on filterType and set the state
      if (filterType === "userList") {
        setSectionHeaders(["Username", "First Name", "Last Name", "Level", "Role"]);
      } else {
        setSectionHeaders(["Level", "Author", "Signatures", "Form Name", "Form Type", "Date"]);
      }

      switch (filterType) {
        case "sent":
          const sentParams: GetFormsByAuthorRequest = { username: userInfo?.loginCredential?.username ?? "" };
          forms = await formApi.getFormsByAuthor(sentParams);
          break;

        case "userList":
          // Example: maybe you want forms where the user is a signee
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
    } catch (e) {
      console.error(`Failed to fetch forms for section ${filterType}:`, e);
    }
  };


  useEffect(() => {
    fetchFormData(section);
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
          <List data={listData} sectionHeaders={sectionHeaders} refreshData={fetchFormData} filterType="formList" />
        </div>
      </div>
    </div>
  )
}

export default Home;