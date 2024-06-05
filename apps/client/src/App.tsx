import { ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { AppTheme } from "./utils/theme/theme.mui";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./utils/components/layouts/RootLayout";
import HomePage from "./pages/home/HomePage";
import { WalletAdapter } from "./lib/core/wallet/WalletAdapter";
import CreateTask from "./pages/create-task/Create-task";
import Analytics from "./pages/analytics/Analytics";
import TaskByIdPage from "./pages/task/[taskId]/TaskIdPage";

function App() {
  return (
    <div>
      <RecoilRoot>
        <ThemeProvider theme={AppTheme}>
          <WalletAdapter>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/create-task" element={<CreateTask />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/task/:taskId" element={<TaskByIdPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WalletAdapter>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
