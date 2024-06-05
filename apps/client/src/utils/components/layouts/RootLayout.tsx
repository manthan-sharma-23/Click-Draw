import { useWallet } from "@solana/wallet-adapter-react";
import Topbar from "../ui/Topbar";
import { Outlet } from "react-router-dom";
import useGetUser from "@/lib/hooks/useGetUser";
import { CircularProgress } from "@mui/material";

const RootLayout = () => {
  const { publicKey } = useWallet();

  const { loading } = useGetUser();

  return (
    <div className="bg-tintdark h-screen w-screen text-white overflow-hidden">
      <div className="h-[6vh] w-full ">
        <Topbar />
      </div>
      <div className="h-[94vh] overflow-y-scroll flex items-center justify-center w-full py-2 px-[10%] bg-white text-black">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center ">
            <CircularProgress size={20} />
          </div>
        ) : publicKey ? (
          <Outlet />
        ) : (
          <div className="h-full w-full font-poppins text-4xl flex justify-center items-center font-medium">
            Please Connect Using Some Wallet :)
          </div>
        )}
      </div>
    </div>
  );
};

export default RootLayout;
