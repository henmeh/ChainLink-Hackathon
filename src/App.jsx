import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Dashboard from "./components/Dashboard/dashboard";
import Products from "./components/Products/products";
import Transactions from "./components/Transactions/transactions";
import Wallet from "./components/Wallet/Wallet";
import NFTBalance from "./components/NFTBalance";
import InchDex from "./components/InchDex/InchDex";
import Employees from "./components/Employees/employees";
import Chains from "./components/Chains/Chains";
import Account from "./components/Account";
import { Menu } from "antd";
import "./style.css";

// Routing
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const styles = {
    content: {
      width: "100vw",
      display: "flex",
      height: "100vh",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Roboto, sans-serif",
      color: "white",
      //marginTop: "100px",
      //backgroundColor: "red",
      padding: "0 0 0 175px",
    },
    sider: {
      position: "fixed",
      zIndex: 1,
      height: "100vh",
      width: "175px",
      display: "flex",
      flexDirection: "column",
      //justifyContent: "center",
      alignItems: "center",
      fontFamily: "Roboto, sans-serif",
      boxShadow: "rgb(0 0 0 / 45%) 0px 0px 12px 6px",
    },
    siderTop: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      fontSize: "15px",
      fontWeight: "600",
      marginBottom: "45px",
    },
  };

  return (
    <Router>
      <div style={{ mineight: "100vh", display: "flex", flexDirection: "row" }}>
        <div style={styles.sider}>
          <div style={styles.siderTop}>
            Logo
            <Chains />
            <Account />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "17px",
              fontWeight: "500",
              width: "100%",
              justifyContent: "center",
              background: "transparent",
            }}
            defaultSelectedKeys={["balance"]}
          >
            <Menu.Item key="balance">
              <NavLink to="/balance"> Balance</NavLink>
            </Menu.Item>
            <Menu.Item key="nftbalance">
              <NavLink to="/nftbalance"> NFT Balance</NavLink>
            </Menu.Item>
            <Menu.Item key="wallet">
              <NavLink to="/wallet"> Wallet</NavLink>
            </Menu.Item>
            <Menu.Item key="transactions">
              <NavLink to="/transactions"> Transactions</NavLink>
            </Menu.Item>
            <Menu.Item key="swap">
              <NavLink to="/swap"> Swap</NavLink>
            </Menu.Item>
            <Menu.Item key="products">
              <NavLink to="/products"> Products</NavLink>
            </Menu.Item>
            <Menu.Item key="employees">
              <NavLink to="/employees"> Employees</NavLink>
            </Menu.Item>
          </Menu>
        </div>
        <div style={styles.content}>
          {isAuthenticated ?
          <Switch>
            <Route exact path="/balance">
              <Dashboard />
            </Route>
            <Route exact path="/nftbalance">
              <NFTBalance />
            </Route>
            <Route exact path="/wallet">
              <Wallet />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/swap">
              <InchDex />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/employees">
              <Employees />
            </Route>
             <Redirect from="/" to="/balance" />
          </Switch>
          :
          <Switch>
            <Route  exact path="/nonauthenticated">
              <div>Please login using the "Authenticate" button</div>
            </Route>
            <Redirect from="/" to="/nonauthenticated" />
          </Switch>}
        </div>
      </div>
    </Router>
  );
};

export default App;

/*
 <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard loggedIn={isAuthenticated}/>} />
        <Route path="/Wallet" element={<Wallet loggedIn={isAuthenticated}/>} />
        <Route path="/Products" element={<Products loggedIn={isAuthenticated}/>} />
        <Route path="/Transactions" element={<Transactions loggedIn={isAuthenticated}/>} />
        <Route path="/NFTBalance" element={<NFTBalance loggedIn={isAuthenticated}/>} />
        <Route path="/Employees" element={<Employees loggedIn={isAuthenticated}/>} />
        <Route path="/Dex" element={<InchDex chain={"eth"}/>} />
      </Routes>
*/
