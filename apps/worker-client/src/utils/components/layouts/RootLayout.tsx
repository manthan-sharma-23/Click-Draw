import React from "react";
import Topbar from "../sections/Topbar";
import SideBar from "../sections/SideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[5vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[92vh] w-full ">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
