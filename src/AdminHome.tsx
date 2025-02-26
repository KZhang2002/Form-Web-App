import React from "react";
import NavBar from "./components/NavBar";
import { NavDrawer } from "./components/NavDrawer";
import AdminNavDrawer from "./components/AdminNavDrawer";

const AdminHome = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <AdminNavDrawer />
          <div data-layer="MainContent"
             className="MainContent flex flex-col items-start gap-[30px] w-[1614px] pt-[30px] pr-[34px] pb-0 pl-[30px] self-stretch">
        </div>
      </div>
    </div>
    );
  };
  
  export default AdminHome;