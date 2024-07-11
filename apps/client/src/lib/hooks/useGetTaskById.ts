import { useEffect, useState } from "react";
import { TaskResult } from "../core/types/models";
import { getTaskById } from "../core/server_calls/tasks/get-task.byId.server-call";
import { useParams } from "react-router-dom";

const useGetTaskById = () => {
  const [task, setTask] = useState<TaskResult | null>(null);
  const { taskId } = useParams();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoading(true);
      getTaskById({ taskId: Number(taskId), token })
        .then((data) => {
          if (typeof data === "string") {
            setLoading(false);
            setTask(null);
            setErr(data);
          } else {
            console.log(data);
            setTask(data);
            setLoading(false);
            setErr(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(err);
          setLoading(false);
          setTask(null);
        });
    }
  }, [token, taskId]);

  return { loading, task, error: err };
};

export default useGetTaskById;
