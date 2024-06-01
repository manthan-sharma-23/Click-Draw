import Topbar from "../ui/Topbar";
import { Divider } from "@mui/material";
import SideBar from "../ui/SideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="bg-tintdark h-screen w-screen text-white">
      <div className="h-[8vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[92vh] flex items-center justify-center w-full py-2 px-[10%] bg-tinted">
        <SideBar />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        />
        <div className="w-[85%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
