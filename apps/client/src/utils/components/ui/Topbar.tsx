import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../../config/config.app";
import { generate_functional_string_for_signature } from "../../generators/signature-string.functional-generator";
import { Alert } from "@mui/material";
import { PublicKey } from "@solana/web3.js";
import Avvvatars from "avvvatars-react";
import { SideBarOptions } from "@/utils/config/sideBar.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { app_navigation_routes } from "@/utils/config/links";
import { AiTwotoneWallet } from "react-icons/ai";
import useGetUser from "@/lib/hooks/useGetUser";

const Topbar = () => {
  const { publicKey, signMessage, connected } = useWallet();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useGetUser();

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  const signAndSend = async () => {
    if (connected) {
      if (window.localStorage.getItem("token")) return;
      const [signString, encodedSign] =
        generate_functional_string_for_signature();

      const signature = await signMessage?.(encodedSign);

      const result = await axios.post(`${BACKEND_URL}/v1/users/signin`, {
        publicKey: publicKey?.toString(),
        signature,
        signString,
      });
      const token = result.data.token;
      if (token) {
        window.localStorage.setItem("token", token);
        <Alert severity="success">Authorized Successfully</Alert>;
        navigate("/");
      } else {
        <Alert severity="error">{`ERROR : ${result.data}`}</Alert>;
      }
    }
  };

  return (
    <div className="h-full w-full flex justify-between items-center px-[10%] bg-black">
      <div className="w-[50vw] h-full flex gap-[3rem] items-center ">
        <p className="w-[15%] cursor-pointer text-xl font-medium tracking-tighter font-mono">
          /= ClickDraw
        </p>
        <div className="w-[60%] h-full flex justify-start gap-4 ">
          {SideBarOptions.map((option, index) => (
            <Link
              key={index}
              to={option.link}
              className={cn(
                "items-center flex py-2 px-3 rounded-md text-white/60 hover:text-white transition-all",
                option.link === pathname && "text-white"
              )}
            >
              <p className="block">{option.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {!publicKey ? (
          <WalletMultiButton
            style={{ backgroundColor: "black", height: "4.5vh" }}
          />
        ) : (
          <div className="flex gap-6 items-center ">
            <div className="flex gap-3 items-center justify-center ">
              <p>{user?.Worker.wallet?.currentAmount}</p>
              <AiTwotoneWallet className="text-2xl bg-yellow-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ProfileSection publicKey={publicKey} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.assign(app_navigation_routes.WORKER_URL);
                    }}
                  >
                    Worker Pannel
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <WalletDisconnectButton
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    style={{ backgroundColor: "black", height: "4.5vh" }}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

function ProfileSection({ publicKey }: { publicKey: PublicKey }) {
  return (
    <div className="cursor-pointer">
      <Avvvatars value={publicKey.toString()} style="shape" size={34} />
    </div>
  );
}

export default Topbar;
