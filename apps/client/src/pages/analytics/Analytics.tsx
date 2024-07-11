import { useGetCreatedTasks } from "../../lib/hooks/useGetCreatedTasks";
import { LineChart } from "@mui/x-charts/LineChart";
import "swiper/swiper-bundle.css";
import "../../lib/styles/scroll.css";
import { CircularProgress } from "@mui/material";
import { useGetLastTaskByUser } from "@/lib/hooks/useGetLastTaskByUser";
import { PieChart } from "@mui/x-charts/PieChart";
import AnalyticsTable from "./AnalyticsTable";
import { useNavigate } from "react-router-dom";
import useGetUser from "@/lib/hooks/useGetUser";

const Analytics = () => {
  const { loading, tasks } = useGetCreatedTasks();
  const { task: lastTask
   } = useGetLastTaskByUser();
  const { user } = useGetUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full w-full flex justify-center items-center text-4xl font-semibold">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className=" h-full w-full  flex flex-col items-start justify-start py-3 ">
      <p className="w-full font-poppins  text-4xl font-semibold flex items-end  gap-4">
        <p className=" h-full flex items-end"> Welcome</p>
        <p className="text-xl h-full  flex items-end">{user.address}</p>
      </p>
      <div className="h-auto w-full  mt-5 font-poppins">
        <div className="w-full h-[30vh]  flex gap-5 ">
          {lastTask ? (
            <div
              onClick={() => navigate(`/task/${lastTask.task.id}`)}
              className="overflow-hidden w-2/3 h-full flex items-center justify-center bg-darkblue border-2 border-black/70 shadow-md rounded-2xl text-white py-8 px-6  font-medium"
            >
              <div className="cursor-pointer w-2/3 h-full flex flex-col justify-between items-center">
                <p className="w-full text-4xl">Last Poll Results</p>
                <div className="h-auto w-full text-lg flex items-center justify-around mt-4 ">
                  <div className=" w-1/2 h-full flex flex-col gap-1 text-white/60">
                    <p>Responses : {lastTask.task.responses}</p>
                    <p>Workers : {lastTask.task.worker}</p>
                    <p>Funds : {lastTask.task.funds}</p>
                    <p>Options : {lastTask.task.options?.length}</p>
                  </div>
                  <div className="w-1/2 h-full text-lg text-white/65 flex flex-col gap-1  flex-wrap">
                    {lastTask.result.map((option) => (
                      <p>
                        Option {option.option.serial_no} :{" "}
                        {option.percentage.toFixed()}%
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/3 h-full">
                <PieChart
                  series={[
                    {
                      data: lastTask.result.map((option) => ({
                        value: option.percentage,
                        label: String(option.option.serial_no),
                      })),

                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          ) : (
            <div className="w-2/3 h-full flex items-center justify-center bg-white border-2 border-black/70 shadow-md rounded-2xl text-black py-8 px-6 text-4xl font-medium"></div>
          )}
          <div className="w-1/3 h-full  border-4 bg-white p-8 text-black  shadow-md border-blue-400 rounded-2xl">
            <div className="w-full flex justify-between items-center">
              <p className=" text-4xl font-medium">Tasks</p>
              <div className="flex justify-end items-center text-3xl font-medium">
                {tasks.length}
              </div>
            </div>
            <div>
              <LineChart
                xAxis={[{ data: tasks.map((task) => task.id) }]}
                series={[
                  {
                    color: "#60A5FA",
                    data: tasks.map((task) => task.responses),
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-8 border">
        <AnalyticsTable tasks={tasks} />
      </div>
    </div>
  );
};

export default Analytics;
