import { useGetWorkerTasks } from "@/lib/core/hooks/useGetWorkerTasks";
import { Alert, Button, CircularProgress, Typography } from "@mui/material";
import { CornerDownRight } from "lucide-react";
import React from "react";

const Tasks = () => {
  const { error, tasks, loading } = useGetWorkerTasks();

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

  return (
    <div className="h-full w-full flex justify-center items-start overflow-hidden">
      {tasks.length < 0 && (
        <Alert severity="success" color="warning" sx={{ width: "100%" }}>
          Hey there please come back later no tasks for you yet
        </Alert>
      )}
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
        <Typography className="font-poppins" variant="h6" component={"h5"}>
          You have {tasks.length} new tasks !
        </Typography>
        <Button variant="contained" color="primary" size="small">
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
