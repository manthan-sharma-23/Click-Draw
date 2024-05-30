import { Outlet } from "react-router-dom";
import Topbar from "../ui/Topbar";

const RootLayout = () => {
  return (
    <div className="bg-white h-screen w-screen text-black">
      <div className="h-[8vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[91vh] w-full bg-tintwhite">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
