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

const Topbar = () => {
  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  const signAndSend = async () => {
    if (window.localStorage.getItem("token")) return;
    const [signString, encodedSign] =
      generate_functional_string_for_signature();

    const signature = await signMessage?.(encodedSign);

    const result = await axios.post(`${BACKEND_URL}/users/signin`, {
      publicKey: publicKey?.toString(),
      signature,
      signString,
    });
    const token = result.data.token;
    if (token) {
      window.localStorage.setItem("token", token);
      <Alert severity="success">Authorized Successfully</Alert>;
    } else {
      <Alert severity="error">{`ERROR : ${result.data}`}</Alert>;
    }
  };

  return (
    <div className="h-full w-full flex justify-between items-center px-[10%]">
      <p className=" cursor-pointer font-poppins text-2xl font-semibold tracking-wider">
        ClickDraw
      </p>
      <div>
        {!publicKey ? (
          <WalletMultiButton
            style={{ backgroundColor: "black", height: "4.5vh" }}
          />
        ) : (
          <div className="flex gap-4 items-center ">
            <WalletDisconnectButton
              onClick={() => {
                window.localStorage.removeItem("token");
              }}
              style={{ backgroundColor: "black", height: "4.5vh" }}
            />
            <ProfileSection publicKey={publicKey} />
          </div>
        )}
      </div>
    </div>
  );
};

function ProfileSection({ publicKey }: { publicKey: PublicKey }) {
  return (
    <div className="">
      <Avvvatars value={publicKey.toString()} style="shape" />
    </div>
  );
}

export default Topbar;
