import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

const Topbar = () => {
  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    signAndSend();
  }, [publicKey]);

  const signAndSend = async () => {
    const encodedSign = new TextEncoder().encode("Sign in to click Draw");
    const sign = await signMessage?.(encodedSign);
  };

  return (
    <div className="h-full w-full flex justify-between items-center px-[10%]">
      <p className=" cursor-pointer font-roboto text-xl font-semibold tracking-wider">
        ClickDraw
      </p>
      <div>
        {!publicKey ? (
          <WalletMultiButton
            style={{ backgroundColor: "black", height: "4.5vh" }}
          />
        ) : (
          <WalletDisconnectButton
            style={{ backgroundColor: "black", height: "4.5vh" }}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
