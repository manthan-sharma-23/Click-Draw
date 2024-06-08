import { useRecoilValue } from "recoil";
import TransactionsTable from "./TransactionsTable";
import walletPNG from "@/assets/wallet.png";
import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { SiSolana } from "react-icons/si";
import {
  Wallet as WalletType,
  Worker,
  public_coin_modal,
} from "@/lib/core/types/app.types";
import { Button } from "@/utils/components/ui/button";
import { FiExternalLink } from "react-icons/fi";

const Wallet = () => {
  const worker = useRecoilValue(WorkerAtom);
  return (
    <div className="w-full h-full mt-10">
      <WalletUI
        wallet={worker?.wallet || undefined}
        worker={worker as Worker}
      />
      <p className="text-4xl text-black/80 font-medium w-full  mb-5">
        Transactions
      </p>
      <TransactionsTable />
    </div>
  );
};

function WalletUI({ wallet, worker }: { worker: Worker; wallet?: WalletType }) {
  if (!worker || !wallet) return;
  return (
    <div className="my-5 w-full h-[25vh] flex gap-4">
      <div className="w-[75%] h-auto bg-white  flex flex-col items-start justify-center gap-4 rounded-2xl overflow-hidden ">
        <p className="text-5xl font-poppins font-medium">Hey There,</p>
        <p className="text-3xl font-poppins font-medium">{worker.address}</p>
      </div>
      <div className="flex flex-col gap-3  justify-center items-start w-[25%] h-auto py-8 px-6 rounded-2xl bg-darkblue border-4 border-purple-500">
        <p className="text-white text-5xl font-semibold font-poppins">Wallet</p>
        <div className="text-white text-4xl font-medium font-poppins flex gap-3  items-center justify-start w-full">
          <p>{(wallet?.currentAmount || 0) / public_coin_modal.sol}</p>
          <SiSolana className="text-3xl text-purple-600" />
        </div>
        <Button className="mt-3 w-auto px-[1rem] bg-gradient-to-r from-purple-600 to-purple-800 gap-2 flex items-center justify-center hover:from-purple-700 hover:to-purple-900 hover:scale-105 transition-transform duration-200">
          <FiExternalLink className="text-lg font-bold h-full" />
          <p className="text-lg font-poppins font-medium">Cash out</p>
        </Button>
      </div>
    </div>
  );
}
export default Wallet;
