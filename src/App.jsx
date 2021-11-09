import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Dashboard from "./components/Dashboard/dashboard";
import Sidebar from "./components/Sidebar/sidebar";
import Products from "./components/Products/products";
import Transactions from "./components/Transactions/transactions";
import Wallet from "./components/Wallet/Wallet";
import NFTBalance from "./components/NFTBalance";
import InchDex from "./components/InchDex/InchDex";

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
  <Wrapper>
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard loggedIn={isAuthenticated}/>} />
        <Route path="/Wallet" element={<Wallet loggedIn={isAuthenticated}/>} />
        <Route path="/Products" element={<Products loggedIn={isAuthenticated}/>} />
        <Route path="/Transactions" element={<Transactions loggedIn={isAuthenticated}/>} />
        <Route path="/NFTBalance" element={<NFTBalance loggedIn={isAuthenticated}/>} />
        <Route path="/Dex" element={<InchDex chain={"eth"}/>} />
      </Routes>
    </Router>
  </Wrapper>
  )
};

export default App;
