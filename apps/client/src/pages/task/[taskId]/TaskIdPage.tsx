import useGetTaskById from "@/lib/hooks/useGetTaskById";
import React from "react";
import { useParams } from "react-router-dom";

const TaskByIdPage = () => {
  const { task } = useGetTaskById();
  return <div className="h-full w-full ">{JSON.stringify(task)}</div>;
};

export default TaskByIdPage;
