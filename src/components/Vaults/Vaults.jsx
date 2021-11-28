import { useState, useEffect } from "react";
import NewVaultModal from "./components/NewVaultModal";
import { Moralis } from "moralis";
import Button from "../Button/button";
import "../../style.css";
import useChain from "hooks/useChain";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import { Table } from "antd";
import { vaultAbi } from "../../helpers/abi";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const Vaults = () => {
  const [isNewVaultModalActive, setNewVaultModalActive] = useState(false);
  const { switchNetwork } = useChain();
  const { chainId } = useMoralisDapp();
  const { data, errorQuery, isLoading } = useMoralisQuery(
    "Vaults",
    (query) => query.descending("objectId"),
    [],
    { live: true }
  );
  const contractAddress = "0x7b9DaE28d5c7E5024a537Baa9D33c01CA60520fB";

  const networkCheck = async () => {
    chainId !== "0x3" && switchNetwork("0x3");
  }

  const addAmount = async (_id, _value) => {
    console.log(_id);
    console.log(_value);
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(vaultAbi, contractAddress);
   
        const options = {
            contractAddress: contractAddress,
            functionName: "addAmount",
            abi: vaultAbi,
            params: {
              vaultId: parseInt(_id)
            },
            msgValue: Moralis.Units.Token(_value, "18"),
          };  
    const receipt = await Moralis.executeFunction(options);
    console.log(receipt)
  }

  const distributeFundsBack = async (_id) => {
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(vaultAbi, contractAddress);
   
        const options = {
            contractAddress: contractAddress,
            functionName: "distributeFundsBack",
            abi: vaultAbi,
            params: {
              vaultId: parseInt(_id)
            },
          };   
    const receipt = await Moralis.executeFunction(options);
    console.log(receipt)
  }

  const deleteVault = async (_id) => {
    const Vault = Moralis.Object.extend("Vaults");
    const query = new Moralis.Query(Vault);
    query.equalTo("objectId", _id);
    const result = await query.first();
    await result.destroy();
  };

  let dataSource = [];

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const vault = {
        key: data[i].id,
        id: data[i].id,
        name: data[i].attributes.name,
        description: data[i].attributes.description,
        donationPerUser: data[i].attributes.donationPerUser,
        userGoal: data[i].attributes.userGoal,
        charityAddress: data[i].attributes.charityAddress,
        ethVault: data[i].attributes.ethVault,
        daysLocked: data[i].attributes.daysLocked,
        vaultId: data[i].attributes.vaultId,
      };
      dataSource.push(vault);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Donation",
      dataIndex: "donationPerUser",
      key: "donationPerUser",
    },
    {
      title: "Usergoal",
      dataIndex: "userGoal",
      key: "userGoal",
    },
    {
      title: "Charityaddress",
      dataIndex: "charityAddress",
      key: "charityAddress",
    },
    {
      title: "Ethvault",
      dataIndex: "ethVault",
      key: "ethVault",
    },
    {
      title: "Days locked",
      dataIndex: "daysLocked",
      key: "daysLocked",
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              text={"Add Amount"}
              onClick={() => {
                addAmount(
                  record.vaultId, record.donationPerUser
                );
              }}
            />
            <Button
              text={"Distribute Funds Back"}
              onClick={() => {
                distributeFundsBack(
                  record.vaultId
                );
              }}
            />
            <Button
              text={"Delete Vault"}
              onClick={() => {
                deleteVault(record.id
                );
              }}
            />
          </div>
        ),
      },
  ];

  useEffect(() => {
    networkCheck();
  }, [chainId]);

  return (
    <div style={{ width: "100%", margin: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "white", marginRight: "10px" }}>
          Welcome to your vault section
        </h2>
        <Button
          text={"Create new Vault"}
          onClick={() => {
            setNewVaultModalActive(true);
          }}
        />
      </div>
      {isNewVaultModalActive && (
        <NewVaultModal
          open={isNewVaultModalActive}
          onClose={() => setNewVaultModalActive(false)}
        />
      )}
      <Table
        rowClassName="tablerow"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default Vaults;
  
