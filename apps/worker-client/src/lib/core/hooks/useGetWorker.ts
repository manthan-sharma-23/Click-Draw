import { useRecoilState, useResetRecoilState } from "recoil";
import { WorkerAtom } from "../store/atom/worker.atom";
import { useEffect, useState } from "react";
import { getWorkerFromDb } from "../server_calls/worker/getWorker.server_call";
import { useLocation } from "react-router-dom";

export const useGetWorker = () => {
  const [worker, setWorker] = useRecoilState(WorkerAtom);
  const reset_atom = useResetRecoilState(WorkerAtom);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");
  const {pathname}=useLocation()

  useEffect(() => {
    if (token) {
      setLoading(true);
      getWorkerFromDb({ token })
        .then((data) => {
          setLoading(false);
          setWorker(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          reset_atom();
        });
    }
  }, [token,pathname]);

  return { worker, loading };
};
