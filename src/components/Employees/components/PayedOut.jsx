import React, { useEffect, useState } from "react";
import Button from "../../Button/button";
import { Table } from "antd";
import { getEllipsisTxt } from "../../../helpers/formatters";
import { useMoralisQuery } from "react-moralis";
import EditEmployeeModal from "./EditEmployeeModal";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const PayedOut = (_salary) => {
  const [payedOut, setPayedOut] = useState();
  const [salary, setSalary] = useState(_salary._salary);
  
  useEffect(() => {
    calculatingPayout();
  }, []);

  const calculatingFlowRate = (_monthlySalary) => {
    const secondsPerMonth = 2592000;
    const web3 = new Moralis.Web3();
    const tokensPerMonth = web3.utils.toWei(_monthlySalary, "ether");
    const flowRate = parseInt(tokensPerMonth / secondsPerMonth);
    return flowRate;
  };

  const calculatingPayout = async () => {
    const flowRate = calculatingFlowRate(salary);
    let payedOut = 0;
    let payedOutDisplay = "";
    const web3 = new Moralis.Web3();
    setInterval(function() {
        payedOut += (flowRate * 2);
        payedOutDisplay = parseFloat(web3.utils.fromWei(payedOut.toString(), "ether")).toFixed(5);  
        setPayedOut(payedOutDisplay);
    }, 2000)
  }

  return (
    <div>Already payed out {payedOut}</div>
  );
};

export default PayedOut;
