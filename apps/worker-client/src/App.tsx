import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WalletAdapter } from "./utils/components/utils/Wallet";
import RootLayout from "./utils/components/layouts/RootLayout";
import Home from "./pages/home/Home";
import Analytics from "./pages/Analytics/Analytics";
import Tasks from "./pages/Tasks/Tasks";
import TaskById from "./pages/Tasks/TaskById";
import SubmissionById from "@/pages/submission/[submissionId]/SubmissionById";
import Wallet from "./pages/profile/WorkerWallet";
import { Toaster } from "./utils/components/ui/toaster";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <RecoilRoot>
        <WalletAdapter>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/task/:taskId" element={<TaskById />} />
                <Route
                  path="/submission/:submissionId"
                  element={<SubmissionById />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </WalletAdapter>
      </RecoilRoot>
    </div>
  );
};

export default App;
