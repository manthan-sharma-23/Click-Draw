import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button as ShadButton } from "@/utils/components/ui/button";
import { useNavigate } from "react-router-dom";

const GradientButton = styled(Button)({
  background: "linear-gradient(to right, #fb8c00, #ef6c00)", // Darker orange gradient
  color: "white",
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: "bold",
  borderRadius: "8px",
  "&:hover": {
    background: "linear-gradient(to right, #ef6c00, #e65100)", // Even darker on hover
  },
});

const Home = () => {
  const worker = useRecoilValue(WorkerAtom);
  const navigate = useNavigate();

  if (!worker) return <div>Please connect using wallet Again</div>;

  return (
    <div className="h-full w-full py-3">
      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col">
          <p className="bg-white text-5xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-700 py-4">
            CLick_Draw
          </p>
          <p className="bg-white mb-6 font-poppins font-semibold text-center text-xl tracking-wider">
            Answer Polls , Earn Real Money !
          </p>
          <div className="flex justify-center gap-8 items-center">
            <GradientButton variant="contained" onClick={()=>{
              navigate("/wallet")
            }}>Go to Wallet</GradientButton>
            <ShadButton className="font-semibold" onClick={()=>{
              navigate("/tasks")
            }}>GET TASKS</ShadButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
