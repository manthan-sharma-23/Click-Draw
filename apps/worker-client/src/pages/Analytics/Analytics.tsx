import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import React from "react";
import { useRecoilValue } from "recoil";

const Analytics = () => {
  const worker = useRecoilValue(WorkerAtom);

  return <div>{JSON.stringify(worker)}</div>;
};

export default Analytics;
