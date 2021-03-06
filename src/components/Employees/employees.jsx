import { useState, useEffect } from "react";
import NewEmployeeModal from "./components/NewEmployeeModal";
import { Moralis } from "moralis";
import Button from "../Button/button";
import "../../style.css";
import useChain from "hooks/useChain";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { erc20Abi } from "../../helpers/abi";
import PaymentFlow from "./components/paymentFlow";
import PaymentPool from "./components/paymentPools";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const Employees = ({ user }) => {
  const [isAddEmployeeModalActive, setAddEmployeeModalActive] = useState(false);
  const [daiBalance, setDaiBalance] = useState("");
  const { switchNetwork } = useChain();
  const { chainId } = useMoralisDapp();

  useEffect(() => {
    networkCheck();
    getDaiBalance();
  }, [chainId]);

  const networkCheck = async () => {
    chainId !== "0x5" && switchNetwork("0x5");
  }

  const getDaiBalance = async () => {
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(
      erc20Abi,
      "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"
    );
    const balance = await contract.methods
      .balanceOf(user.attributes.ethAddress)
      .call();
    const revertedBalance = web3.utils.fromWei(balance, "ether");
    setDaiBalance(revertedBalance);
    setInterval(async function () {
      const balance = await contract.methods
        .balanceOf(user.attributes.ethAddress)
        .call();
      const revertedBalance = web3.utils.fromWei(balance, "ether");
      setDaiBalance(revertedBalance);
    }, 15000);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "white", marginRight: "10px" }}>
          Your Dai Balance to pay employess:
        </h2>
        <h3 style={{ color: "white" }}>{daiBalance}</h3>
        <Button
          text={"Create new Employee"}
          onClick={() => {
            setAddEmployeeModalActive(true);
          }}
        />
      </div>
      {isAddEmployeeModalActive && (
        <NewEmployeeModal
          open={isAddEmployeeModalActive}
          onClose={() => setAddEmployeeModalActive(false)}
        />
      )}
      <PaymentPool daiBalance={daiBalance}/>
      <PaymentFlow daiBalance={daiBalance}/>
    </div>
  );
};

export default Employees;
  
