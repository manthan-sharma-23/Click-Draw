import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../server_calls/tasks/get-task.byId";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { NextTaskAtom } from "../store/atom/next.task.atom";

export const useGetNextTask = () => {
  const token = window.localStorage.getItem("token");
  const { taskId } = useParams();
  const setNextTask = useSetRecoilState(NextTaskAtom);
  const reset = useResetRecoilState(NextTaskAtom);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (token && taskId) {
      setLoading(true);
      getTaskById({ token, taskId })
        .then((data) => {
          if (data) {
            setNextTask(data);
            setLoading(false);
          } else {
            setLoading(false);
            throw new Error();
          }
        })
        .catch((_err) => {
          setLoading(false);
          reset();
          setErr(_err);
        });
    }
  }, [taskId, token]);

  return { err, loading };
};
