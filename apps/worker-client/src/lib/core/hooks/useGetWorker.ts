import { useRecoilState, useResetRecoilState } from "recoil";
import { WorkerAtom } from "../store/atom/worker.atom";
import { useEffect, useState } from "react";
import { getWorkerFromDb } from "../server_calls/worker/getWorker.server_call";

export const useGetWorker = () => {
  const [worker, setWorker] = useRecoilState(WorkerAtom);
  const reset_atom = useResetRecoilState(WorkerAtom);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");

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
  }, [token]);

  return { worker, loading };
};
