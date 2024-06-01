import {
  Alert,
  Button,
  CircularProgress,
  LinearProgress,
  Slider,
  TextField,
} from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { SiSolana } from "react-icons/si";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CreateTaskAtom } from "../../lib/store/atoms/create-task-input.atom";
import {
  app_modal_sol,
  owner_public_key,
} from "../../utils/config/app_modal_sol";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { CreateTaskInServer } from "../../lib/core/server_calls/tasks/create-tasks";

const CreateTask = () => {
  const [progress, setProgress] = useState<null | number>(null);
  const [taskInput, setTaskInput] = useRecoilState(CreateTaskAtom);
  const [loading, setLoading] = useState(false);
  const resetInput = useResetRecoilState(CreateTaskAtom);
  const [files, setFiles] = useState<File[]>([]);
  const [signature, setTxSignature] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [txError, setTxError] = useState("");

  useEffect(() => {
    setTaskInput((v) => ({
      ...v,
      funds:
        app_modal_sol.base_task_fee +
        app_modal_sol.per_image_option * files.length +
        app_modal_sol.aditional_worker_fee *
          (taskInput.worker - app_modal_sol.base_minimum_workers),
    }));
  }, [files.length, taskInput.worker]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles((v) => [selectedFile, ...v]);
    }

    console.log(taskInput);
  };

  const SendSolCall = async () => {
    setTxError("");
    setTxSignature("");
    if (!taskInput.title || files.length === 0) {
      setTxError("Invalid Inputs");
      return;
    }
    if (files.length === 1) {
      setTxError("Choose more than one file to Poll");
      return;
    }
    try {
      setProgress(5);
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(owner_public_key)!,
          lamports: taskInput.funds,
        })
      );
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      setProgress(25);
      console.log(signature);
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
      setTxSignature(signature);
      setTxError("");

      setProgress(45);

      const task = await CreateTaskInServer({
        files,
        task: { ...taskInput, signature },
      });

      setProgress(80);

      if (task) {
        setLoading(false);
        resetInput();
        setFiles([]);
        setTxError("");
        setTxSignature("");
      }

      setProgress(100);
      setProgress(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setTxError(String((error as { message: string }).message));
    }
  };

  return (
    <div className="h-full w-full p-3 px-5 flex flex-col items-start justify-start gap-3 ">
      {progress && (
        <div className="my-2">
          <LinearProgress
            variant="determinate"
            color="inherit"
            value={progress}
          />
        </div>
      )}
      <div className="w-full text-white">
        {signature && (
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            Your Solana Tranaction Was A Success tx Id :{signature}
          </Alert>
        )}
        {txError && (
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            Failed Transaction : {txError}
          </Alert>
        )}
      </div>
      <div className="text-2xl flex justify-between w-full items-center font-poppins font-semibold underline">
        <p>Create Task</p>
        <IoIosInformationCircleOutline className="cursor-pointer text-2xl text-white/55 hover:text-yellow-300" />
      </div>
      <div className="w-full flex flex-col mt-5">
        <TextField
          disabled={loading}
          value={taskInput.title}
          onChange={(e) =>
            setTaskInput((v) => ({ ...v, title: e.target.value }))
          }
          label="Title"
          placeholder="Enter your title"
          fullWidth
        />
      </div>
      <div className="w-full flex flex-col my-3">
        <TextField
          disabled={loading}
          value={taskInput.description}
          onChange={(e) =>
            setTaskInput((v) => ({ ...v, description: e.target.value }))
          }
          label="Description"
          placeholder="Enter your task's description"
          fullWidth
          rows={30}
          sx={{ height: "4vh" }}
        />
      </div>
      <div className="w-full flex justify-between items-center my-3 ">
        <TextField
          disabled={loading}
          sx={{
            width: "9rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          label="Workers"
          value={taskInput.worker}
          className="text-white  font-poppins"
          onChange={(e) =>
            setTaskInput((v) => ({ ...v, worker: Number(e.target.value) }))
          }
        />
        <Slider
          disabled={loading}
          sx={{ width: "85%" }}
          min={15}
          max={75}
          step={5}
          value={taskInput.worker}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            setTaskInput((v) => ({ ...v, worker: Number(value) }))
          }
        />
      </div>
      <div className="mt-4 h-auto w-full ">
        <p className="ml-2 text-xl font-medium">Add Image Options :</p>
        <div className="w-full h-[35vh]  border border-white/20 rounded-md p-3  overflow-x-hidden">
          <div className="hover:text-white relative h-[10rem] flex flex-wrap items-center justify-center text-3xl w-[20rem] border border-white/60 rounded-md">
            <input
              className="opacity-0 h-full w-full absolute cursor-pointer"
              type="file"
              onChange={handleFileChange}
            />
            <IoAdd className="text-4xl text-white/60" />
          </div>
          {files &&
            files.map((file, index) => (
              <div key={index}>
                <img
                  className="h-[10rem] w-[20rem] my-1"
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index}`}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="font-medium text-lg flex items-center gap-3">
          Total Amount: {taskInput.funds} {"(lamports)"}{" "}
          <SiSolana className="text-purple-400" />
        </div>
        <Button
          disabled={loading}
          onClick={() => {
            SendSolCall();
          }}
          variant="contained"
          size="large"
        >
          {loading ? (
            <CircularProgress size="medium" />
          ) : (
            <div className="flex gap-3 items-center">
              Pay SOL
              <SiSolana className="text-purple-600" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
