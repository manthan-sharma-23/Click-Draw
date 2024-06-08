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
      <div className="w-3/4 h-auto bg-white  flex flex-col items-start justify-center gap-4 rounded-2xl overflow-hidden ">
        <p className="text-5xl font-poppins font-medium">Hey There,</p>
        <p className="text-3xl font-poppins font-medium">{worker.address}</p>
      </div>
      <div className="flex flex-col gap-3  justify-center items-start w-1/4 h-auto py-8 px-6 rounded-2xl bg-darkblue border-4 border-purple-500">
        <p className="text-white text-5xl font-semibold font-poppins">Wallet</p>
        <div className="text-white text-4xl font-medium font-poppins flex gap-3  items-center justify-start w-full">
          <p>{(wallet?.currentAmount || 0) / public_coin_modal.sol}</p>
          <SiSolana className="text-3xl text-purple-600" />
        </div>
      </div>
    </div>
  );
}
export default Wallet;
