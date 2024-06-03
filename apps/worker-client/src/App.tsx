import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WalletAdapter } from "./utils/components/utils/Wallet";
import RootLayout from "./utils/components/layouts/RootLayout";
import Home from "./pages/home/Home";
import Analytics from "./pages/Analytics/Analytics";
import Tasks from "./pages/Tasks/Tasks";
import TaskById from "./pages/Tasks/TaskById";
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
                <Route path="/profile" element={<Analytics />} />
                <Route path="/task/:taskId" element={<TaskById />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WalletAdapter>
      </RecoilRoot>
    </div>
  );
};

export default App;
