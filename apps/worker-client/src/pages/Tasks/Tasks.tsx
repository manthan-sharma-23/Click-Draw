import { useGetWorkerTasks } from "@/lib/core/hooks/useGetWorkerTasks";
import { getNextTask } from "@/lib/core/server_calls/worker/get.next-task.worker";
import { NextTaskAtom } from "@/lib/core/store/atom/next.task.atom";
import { Alert, Button, CircularProgress, Typography } from "@mui/material";
import { CornerDownRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

const Tasks = () => {
  const { error, tasks, loading } = useGetWorkerTasks();
  const navigate = useNavigate();
  const [nextTask, setNextTask] = useRecoilState(NextTaskAtom);
  const reset_next_task = useResetRecoilState(NextTaskAtom);

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        {error + "Hey"}
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <CircularProgress color="secondary" size={50} />
      </div>
    );
  }

  const navigateToNextTask = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getNextTask({ token })
        .then((data) => {
          if (data) {
            setNextTask(data);
            navigate(`/task/${data.id}`);
          } else {
            throw new Error();
          }
        })
        .catch((_err) => {
          reset_next_task();
        });
    }
  };

  return (
    <div className="h-full w-full flex flex-col pt-4 justify-center items-start overflow-hidden">
      {tasks.length <= 0 && (
        <Alert severity="success" color="warning" sx={{ width: "100%" }}>
          Hey there please come back later no tasks for you yet
        </Alert>
      )}
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
        <Typography
          className="font-poppins"
          variant="h6"
          component={"h5"}
          fontWeight={600}
        >
          You have {tasks.length} new tasks !
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={navigateToNextTask}
          disabled={tasks.length <= 0}
        >
          <div className="flex justify-center items-center gap-2 px-2 py-1">
            <CornerDownRight size={15} />
            <p className="font-medium">Get Started</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Tasks;
