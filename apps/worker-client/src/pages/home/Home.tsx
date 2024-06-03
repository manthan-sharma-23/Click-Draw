import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { useRecoilValue } from "recoil";
import { Box } from "@mui/material";

const Home = () => {
  const worker = useRecoilValue(WorkerAtom);

  if (!worker) return <div>Please connect using wallet Again</div>;

  return (
    <div className="h-full w-full py-3">
      <Box border={6} color={"white"} fontWeight={900} padding={2} borderColor={"#FFFF57"} bgcolor={"#FFC53D"} borderRadius={4} height={270}>
        Hey
      </Box>
    </div>
  );
};

export default Home;
