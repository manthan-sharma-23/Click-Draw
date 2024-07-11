import { useGetWorkerTasks } from "@/lib/core/hooks/useGetWorkerTasks";
import { getNextTask } from "@/lib/core/server_calls/worker/get.next-task.worker";
import { NextTaskAtom } from "@/lib/core/store/atom/next.task.atom";
import { SubmissionByWorkerSelector } from "@/lib/core/store/selectors/submissionCountSelector";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import TaskTable from "./TaskTable";
import { Button } from "@/utils/components/ui/button";

const Tasks = () => {
  const { error, tasks, loading } = useGetWorkerTasks();
  const navigate = useNavigate();
  const setNextTask = useSetRecoilState(NextTaskAtom);
  const reset_next_task = useResetRecoilState(NextTaskAtom);
  const submissions = useRecoilValue(SubmissionByWorkerSelector);

  if (submissions.submissions_today! >= 10) {
    return (
      <div>
        <Alert color="warning" severity="warning">
          <AlertTitle>LIMIT EXCEEDED</AlertTitle>
          Submissions limit exceeded for today come back next day :)
        </Alert>
      </div>
    );
  }
  if (error) {
    return (
      <Alert color="error" severity="error">
        <AlertTitle>ERROR</AlertTitle>
        {error}
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
            console.log(data);
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
    <div className="h-full w-full flex flex-col pt-4 justify-start items-center overflow-hidden">
      {tasks.length <= 0 && (
        <Alert severity="success" color="warning" sx={{ width: "100%" }}>
          <AlertTitle>NO TASKS PENDING</AlertTitle>
          Hey there please come back later, no tasks for you yet :)
        </Alert>
      )}
      {tasks.length > 0 && (
        <div className="h-auto w-full flex justify-between items-center">
          <p className="text-xl font-medium font-poppins">
            Tasks: {tasks.length}
          </p>
          <Button onClick={navigateToNextTask}>Get Started</Button>
        </div>
      )}
      <div className="w-full h-auto mt-5">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default Tasks;
