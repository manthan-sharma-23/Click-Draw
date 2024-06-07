import useGetSubmissions from "@/lib/core/hooks/useGetSubmissions";
import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import AnalyticsTable from "./AnalyticsTable";

const Analytics = () => {
  const { submissions, loading } = useGetSubmissions();
  const worker = useRecoilValue(WorkerAtom);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="mt-5 w-full h-auto flex">
        <div className="w-2/3 h-auto ">
          <p className="text-5xl font-poppins font-medium">Analytics</p>
        </div>
        <div className="w-1/3 h-auto py-8 px-6 border flex justify-start items-center">
          <SubmissionCountMeterUI
            value={submissions?.submissionCountForDay || 0}
          />
          <div></div>
        </div>
      </div>
      <div className="mt-5 flex h-auto w-full flex-col justify-start items-center ">
        <p className="w-full text-4xl font-poppins font-medium text-left ">
          Submissions
        </p>
        <div className="w-full h-auto">
          <AnalyticsTable submissions={submissions?.submissions || []} />
        </div>
      </div>
    </div>
  );
};

const SubmissionCountMeterUI = ({ value }: { value: number }) => {
  return (
    <Gauge
      width={150}
      height={150}
      value={value}
      startAngle={-110}
      endAngle={110}
      valueMax={10}
      cornerRadius={"50%"}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 30,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#3E63DD",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
};

export default Analytics;
