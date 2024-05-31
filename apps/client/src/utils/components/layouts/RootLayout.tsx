import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar";

const RootLayout = () => {
  return (
    <div className="bg-tintdark h-screen w-screen text-white">
      <div className="h-[8vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[92vh] w-full px-[10%] bg-tinted">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
