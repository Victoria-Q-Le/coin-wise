import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinList from "./pages/CoinList";
import CoinPage from "./pages/CoinPage";
import Home from "./pages/Home";
import './App.css'
import { styled } from "@mui/material";

const StyledContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh"
})

function App() {
  return (
    <StyledContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<CoinList />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </StyledContainer>
  );
}

export default App;
