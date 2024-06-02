import Topbar from "../sections/Topbar";
import { Outlet } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useGetWorker } from "@/lib/core/hooks/useGetWorker";

const RootLayout = () => {
  useGetWorker();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-[5.5vh] w-full ">
        <Topbar />
      </div>
      <Separator className="bg-black/15" />
      <div className="h-[94.5vh] w-full flex items-center justify-center">
        <div className="px-[10%] py-1 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
