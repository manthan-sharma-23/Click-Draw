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
          if (data) {
            setTasks(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setTasks([]);
          setLoading(false);
        });
    }
  }, [token]);

  return { loading, tasks };
};
