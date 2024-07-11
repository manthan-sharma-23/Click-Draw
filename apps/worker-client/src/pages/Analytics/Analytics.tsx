import useGetSubmissions from "@/lib/core/hooks/useGetSubmissions";
import { CircularProgress } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import AnalyticsTable from "./AnalyticsTable";
import useGetSubmissionsPerDay from "@/lib/core/hooks/useGetSubmissionsPerDay";
import { LineChart } from "@mui/x-charts/LineChart";

const Analytics = () => {
  const { submissions, loading } = useGetSubmissions();
  const { submissionsPerDay } = useGetSubmissionsPerDay();

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start">
      <div className="mt-5 w-full h-auto flex  flex-col">
        <p className="text-5xl font-poppins font-medium">Analytics</p>
        <div className="my-3 flex w-full gap-5 items-center justify-center">
          <div className="w-2/3 h-auto ">
            <SubmissionsPerDayGraph data={submissionsPerDay} />
          </div>
          <div className="w-1/3 h-auto p-6 gap-3 flex justify-start items-center ">
            <div className="w-2/3 h-full flex flex-col justify-center items-start gap-2">
              <p className="text-lg font-poppins font-semibold">
                Submissions Today : {submissions?.submissionCountForDay}
              </p>
              <p className="text-lg font-poppins font-semibold">
                Total Submissions : {submissions?.submissions.length}
              </p>
              <p className="text-lg font-poppins font-semibold">
                Submission Limit Per Day : 10
              </p>
            </div>
            <SubmissionCountMeterUI
              value={submissions?.submissionCountForDay || 0}
            />
          </div>
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

const SubmissionsPerDayGraph = ({
  data,
}: {
  data: { date: Date; submissionCount: number }[];
}) => {
  console.log(data);
  const dates = data.map((v) => new Date(v.date).getDate());
  const count = data.map((v) => v.submissionCount);

  console.log(dates);
  console.log(count);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <LineChart
        xAxis={[{ data: dates }]}
        series={[
          {
            curve: "linear",
            color: "#3E63DD",
            area: true,
            data: [...count],
          },
        ]}
        width={600}
        height={350}
      />
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
      text={`${value}/10`}
      valueMax={10}
      cornerRadius={"50%"}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 25,
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
