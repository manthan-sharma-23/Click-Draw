import { useGetLastTaskByUser } from "@/lib/hooks/useGetLastTaskByUser";
import { PieChart } from "@mui/x-charts/PieChart";
import { CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const HomePage = () => {
  const { task } = useGetLastTaskByUser();
  console.log(task);
  const navigate = useNavigate();

  return (
    <div className="h-full  w-full flex  gap-2 justify-center items-start">
      <div className="h-full w-[30%] gap-2 flex flex-col items-center justify-center">
        <div className=" flex flex-col  justify-center gap-5 w-full h-[30%] rounded-2xl bg-blue-500/90 px-5  py-8 border-4 font-poppins text-white">
          <p className="text-4xl font-medium">Create Task</p>
          <p className=" text-white/75 text-lg ">
            Poll for thumbnails, UI designs, Sports cars or maybe show some
            curious rizz
          </p>
          <div className="flex justify-end items-center w-full px-2">
            <Button
              onClick={() => navigate("/create-task")}
              className="flex items-center gap-2 bg-white text-[#528CF7] hover:ring-2 hover:ring-blue-600 hover:text-white transition-all"
            >
              <CornerDownRight size={17} />
              <p>Create Task</p>
            </Button>
          </div>
        </div>
        {task ? (
          <div
            onClick={() => navigate(`/task/${task.task.id}`)}
            className="relative w-full h-[70%] rounded-2xl bg-[#101316] border-4 cursor-pointer hover:scale-[1.01] transition-all  p-6 py-8 text-white"
          >
            <CornerDownRight
              className="absolute text-white/60 top-[1rem] right-[1rem]"
              size={20}
            />
            <p className=" text-4xl font-medium w-full mb-6">
              Last Poll Statistics
            </p>
            <div className="w-full text-black/70 flex justify-center items-center">
              <PieChart
                series={[
                  {
                    data: task.result.map((option) => ({
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
            <p className="text-white w-full font-semibold  font-poppins tracking-wider flex justify-center items-center text-3xl mt-5">
              {task.task.responses} / {task.task.worker}
            </p>

            <div className="text-white/70 w-full h-auto flex flex-col items-start justify-center text-lg mt-5 font-poppins tracking-wide gap-1">
              <p className="w-full">No. of Responses : {task.task.responses}</p>
              <p className="w-full">
                CreatedAt : {moment(task.task.createdAt).format("ll")}
              </p>
              <p className="w-full">Funded : {task.task.funds} lamports</p>
              <p className="w-full">
                No. of Options : {task.task.options?.length}
              </p>
              <p className="w-full">Status : {task.task.status}</p>
            </div>
          </div>
        ) : (
          <div className="h-[70%] w-full font-poppins p-6 bg-[#101316] text-white text-4xl font-medium rounded-xl flex flex-col items-center justify-center">
            Don't have any poll <br />
            Please Create One XD!
          </div>
        )}
      </div>

      <div className="h-full w-[70%] font-poppins bg-bg-white rounded-xl flex flex-col items-center justify-center">
        <div className="h-[30%] w-full mb-6 flex gap-4">
          <div className="w-1/2 gap-5 h-full rounded-2xl border-2 border-black bg-white text-black  py-8 px-6">
            <p className="text-4xl font-medium mb-4">Analytic Dashboard</p>
            <p className=" text-black/75 text-lg mb-4">
              Get All your results and polls in a compact dashboard{" "}
            </p>
            <div className="flex justify-end items-center w-full px-2">
              <Button
                onClick={() => navigate("/analytics")}
                className="flex items-center gap-2 bg-black text-white  transition-all"
              >
                <CornerDownRight size={17} />
                <p>Visit Analytics</p>
              </Button>
            </div>
          </div>
          <div className="w-1/2 h-full rounded-2xl bg-[#101316] ring-4 ring-blue-400 text-white py-8 px-6">
            <p className="text-4xl font-medium mb-4">Update Profile</p>
            <p className=" text-white/75 text-lg mb-4">
              Get Endless benefits own the memberships as well the polls
            </p>
            <div className="flex justify-end items-center w-full px-2">
              <Button
                onClick={() => navigate("/analytics")}
                className="flex items-center gap-2 bg-white text-[#528CF7] hover:ring-2 hover:ring-blue-600 hover:text-white transition-all"
              >
                <CornerDownRight size={17} />
                <p>Upgrade</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6 font-mono py-8 h-[70%] w-full font-semibold text-7xl  rounded-2xl bg-tintwhite flex flex-col items-start justify-center">
          // Click_ <br />
          Draw ===/
        </div>
      </div>
    </div>
  );
};

export default HomePage;
