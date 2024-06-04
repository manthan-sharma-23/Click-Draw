import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getLastTaskFromUser } from "../core/server_calls/tasks/get-last-task.server-call";
import { LastTaskByUserAtom } from "../store/atoms/last-task.atom";

export const useGetLastTaskByUser = () => {
  const [lastTask, setLastTask] = useRecoilState(LastTaskByUserAtom);
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getLastTaskFromUser({ token })
        .then((data) => {
          if (data) {
            setLastTask(data);
            setLoading(false);
            setError(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setLastTask(null);
          setLoading(false);
          setError(err);
        });
    }
  }, [token]);

  return { loading, task: lastTask, error };
};
