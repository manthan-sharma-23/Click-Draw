import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getCreatedTasks } from "../core/server_calls/tasks/get-tasks-created.server-call";
import { CreatedTasksAtom } from "../store/atoms/created-tasks.atom";

export const useGetCreatedTasks = () => {
  const [tasks, setTasks] = useRecoilState(CreatedTasksAtom);
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getCreatedTasks({ token })
        .then((data) => {
          setLoading(false);
          if (data) {
            setTasks(data);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setTasks([]);
        });
    }
  }, [token]);

  return { loading, tasks };
};
