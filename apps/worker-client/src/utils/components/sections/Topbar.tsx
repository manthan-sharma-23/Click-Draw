import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/utils/components/ui/dropdown-menu";
import "../../../lib/styles/WalletButton.css";
import { useWallet } from "@solana/wallet-adapter-react";
import Avvvatars from "avvvatars-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils";
import { generate_functional_string_for_signature } from "@/lib/core/functions/generate_sign_string_function";
import axios from "axios";
import { BACKEND_URL } from "@/utils/config/env";
import { useEffect } from "react";
import { getWorkerFromDb } from "@/lib/core/server_calls/worker/getWorker.server_call";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { WorkerAtom } from "../../../lib/core/store/atom/worker.atom";
import { AiTwotoneWallet } from "react-icons/ai";

const navOptions = [
  {
    name: "Tasks",
    link: "/tasks",
  },
  {
    name: "Analytics",
    link: "/analytics",
  },
  {
    name: "Wallet",
    link: "/wallet",
  },
];

const Topbar = () => {
  const { publicKey, signMessage } = useWallet();
  const setWorker = useSetRecoilState(WorkerAtom);
  const reset_worker = useResetRecoilState(WorkerAtom);
  const [signString, encodedString] =
    generate_functional_string_for_signature();
  const user = useRecoilValue(WorkerAtom);
  const navigate = useNavigate();

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  const signAndSend = async () => {
    const signature = await signMessage?.(encodedString);

    console.log({ publicKey: publicKey?.toString(), signature, signString });
    const result = await axios.post(`${BACKEND_URL}/v1/worker/signin`, {
      publicKey: publicKey?.toString(),
      signature,
      signString,
    });
    const token: string = result.data.token;

    if (token) {
      window.localStorage.setItem("token", token);
      const data = await getWorkerFromDb({ token });
      if (data) {
        setWorker(data);
      } else {
        reset_worker();
      }
    }
  };

  const { pathname } = useLocation();
  return (
    <div className="h-full w-full p-2 px-[10%] flex justify-between items-center shadow-md">
      <div className=" flex items-center h-full gap-2 w-auto">
        <p
          onClick={() => navigate("/")}
          className="mr-[3rem] h-full flex items-center font-mono tracking-tighter cursor-pointer font-semibold text-xl "
        >
          /= ClickDraw
        </p>
        <div className="flex items-center h-full w-auto gap-10 text-black/55 font-poppins">
          {navOptions.map((option) => (
            <Link
              to={option.link}
              className={cn(
                "hover:text-black",
                pathname === option.link && "text-black font-medium"
              )}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center ">
        <div>
          {publicKey ? (
            <div className="flex gap-4 items-center justify-center w-auto h-full mx-10">
              <p className="font-medium font-roboto text-xl">
                {user?.wallet?.currentAmount}
              </p>
              <AiTwotoneWallet className="bg-yellow-500 text-2xl" />
            </div>
          ) : (
            <WalletMultiButton
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            />
          )}
        </div>
        {publicKey && (
          <DropdownMenu>
            <DropdownMenuTrigger className="ring-0  border-0 p-0 m-0">
              <div className="cursor-pointer mx-2 rounded-full transition-all  hover:bg-black/10 p-[.5px] hover:p-[2px]">
                <Avvvatars
                  style="shape"
                  value={publicKey.toString()}
                  size={36}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => window.location.assign("http://localhost:3000/")}
              >
                Switch to User Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <WalletDisconnectButton
                  onClick={() => {
                    window.localStorage.clear();
                    reset_worker();
                  }}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
