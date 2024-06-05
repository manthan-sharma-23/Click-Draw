import { useEffect, useState } from "react";
import { OptionStatistics, Task, TaskResult } from "../core/types/models";
import { getTaskById } from "../core/server_calls/tasks/get-task.byId.server-call";
import { useParams } from "react-router-dom";

const useGetTaskById = () => {
  const [task, setTask] = useState<TaskResult | null>(null);
  const { taskId } = useParams();
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      getTaskById({ taskId: Number(taskId), token })
        .then((data) => {
          console.log(data)
          setTask(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setTask(null);
        });
    }
  }, [token]);

  return { loading, task };
};

export default useGetTaskById;
