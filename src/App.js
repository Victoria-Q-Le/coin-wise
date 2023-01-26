import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinList from "./pages/CoinList";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<CoinList />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
