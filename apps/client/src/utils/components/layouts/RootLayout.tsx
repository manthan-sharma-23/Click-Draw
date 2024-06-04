import Topbar from "../ui/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="bg-tintdark h-screen w-screen text-white">
      <div className="h-[6vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[94vh] flex items-center justify-center w-full py-2 px-[10%] bg-white text-black">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
