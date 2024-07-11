import { useRecoilValue } from "recoil";
import TransactionsTable from "./TransactionsTable";
import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { SiSolana } from "react-icons/si";
import {
  Wallet as WalletType,
  Worker,
  public_coin_modal,
} from "@/lib/core/types/app.types";
import { Button } from "@/utils/components/ui/button";
import { FiExternalLink } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/utils/components/ui/dialog";
import { useGetWorker } from "@/lib/core/hooks/useGetWorker";
import { Alert, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { putPayoutWallet } from "@/lib/core/server_calls/wallet/put-cashout-wallet.server-call";
import { useToast } from "@/utils/components/ui/use-toast";
import { ToastAction } from "@/utils/components/ui/toast";

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
        {wallet.lockedAmount > 0 && (
          <p className="text-sm text-white">
            Locked Amount : {wallet.lockedAmount}
          </p>
        )}
        <Dialog>
          <DialogTrigger>
            <Button className="mt-3 w-auto px-[1rem] bg-gradient-to-r from-purple-600 to-purple-800 gap-2 flex items-center justify-center hover:from-purple-700 hover:to-purple-900 hover:scale-105 transition-transform duration-200">
              <FiExternalLink className="text-lg font-bold h-full" />
              <p className="text-lg font-poppins font-medium">Cash out</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 m-0 h-auto w-full">
            <CashOutUI />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function CashOutUI() {
  const { worker, loading: WorkerDataLoading } = useGetWorker();
  const [address, setAddress] = useState(worker?.address);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const confirmString = "confirm";

  const handlePayout = async () => {
    const token = window.localStorage.getItem("token");
    if (confirm === confirmString && token && address) {
      setLoading(true);
      const result = await putPayoutWallet({ token, address });
      setLoading(false);
      if (result) {
        toast({
          title: "Transaction Success",
          description: result.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Close</ToastAction>
          ),
        });
        window.location.reload();
      }
    }
  };
  return (
    <div className="min-h-[35vh] w-full flex flex-col justify-start items-center gap-2 p-6 py-8">
      <p className="text-4xl text-gradient-to-r from-purple-600 to-purple-800 font-poppins font-semibold w-full flex items-center justify-start">
        Cashout
      </p>
      {WorkerDataLoading ? (
        <CircularProgress />
      ) : (
        <div className="">
          <p className="font-poppins text-lg text-black/80">
            Cashout from your click_draw wallet to your onchain solana account
          </p>
          <p className="font-poppins text-black/70 mt-2 text-purple-600">
            Your On-Chain Address:
          </p>
          <TextField
            disabled={loading}
            label="On Chain Address"
            color="secondary"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ marginTop: "1rem", color: "red" }}
            size="medium"
          />
          <Alert
            sx={{ marginTop: "1rem" }}
            severity={confirm === confirmString ? "info" : "warning"}
          >
            <p className="font-poppins text-black/70 flex gap-1">
              Type
              <p className="italic font-bold text-black">"confirm"</p>
              as this action cannot be undone
            </p>
          </Alert>
          <TextField
            disabled={loading}
            color="primary"
            fullWidth
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            sx={{ marginTop: "1rem", color: "red" }}
            size="small"
            placeholder="Enter confirm"
          />
          <Button
            onClick={handlePayout}
            className="mt-4  text-[1rem]"
            disabled={confirm !== confirmString || loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Cash Out"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
export default Wallet;
