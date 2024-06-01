import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WalletAdapter } from "./utils/components/utils/Wallet";
import RootLayout from "./utils/components/layouts/RootLayout";
import Home from "./pages/home/Home";
const App = () => {
  return (
    <div className="h-screen w-screen">
      <WalletAdapter>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </WalletAdapter>
    </div>
  );
};

export default App;
