import { useRecoilState, useResetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getWorkerTasks } from "../server_calls/tasks/get.worker-tasks";
import { TasksAtom } from "../store/atom/tasks.atom";

export const useGetWorkerTasks = () => {
  const [tasks, setTasks] = useRecoilState(TasksAtom);
  const reset = useResetRecoilState(TasksAtom);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      getWorkerTasks({ token })
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          setErr(err);
          reset();
          setLoading(false);
        });
    }
  }, [token]);

  return { loading, error: err, tasks };
};

