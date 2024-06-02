import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "../../../lib/styles/WalletButton.css";
import { useWallet } from "@solana/wallet-adapter-react";
import Avvvatars from "avvvatars-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils";
import { generate_functional_string_for_signature } from "@/lib/core/functions/generate_sign_string_function";
import axios from "axios";
import { BACKEND_URL } from "@/utils/config/env";
import { useEffect } from "react";

const navOptions = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Analytics",
    link: "/analytics",
  },
  {
    name: "Profile",
    link: "/profile",
  },
];

const Topbar = () => {
  const { publicKey, signMessage } = useWallet();
  const [signString, encodedString] =
    generate_functional_string_for_signature();

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

    if (token) window.localStorage.setItem("token", token);
  };

  const { pathname } = useLocation();
  return (
    <div className="h-full w-full p-2 px-[10%] flex justify-between items-center shadow-md">
      <div className=" flex items-center h-full gap-2 w-auto">
        <p className="mr-[5rem] h-full flex items-center font-mono tracking-tighter cursor-pointer font-semibold text-xl ">
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
            <WalletDisconnectButton
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            />
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
          <div className="cursor-pointer mx-2 rounded-full transition-all  hover:bg-black/10 p-[.5px] hover:p-[2px]">
            <Avvvatars style="shape" value={publicKey.toString()} size={36} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
