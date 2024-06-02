import { WorkerAtom } from "@/lib/core/store/atom/worker.atom";
import { useRecoilValue } from "recoil";

const Home = () => {
  const worker = useRecoilValue(WorkerAtom);

  if (!worker) return <div>Please connect using wallet Again</div>;

  return <div></div>;
};

export default Home;
