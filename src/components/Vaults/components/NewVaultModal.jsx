import React, { useEffect, useState } from "react";
import Button from "../../Button/button";
import { Form, Checkbox } from "antd";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { vaultAbi } from "../../../helpers/abi";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const NewVaultModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [donationPerUser, setDonationPerUser] = useState("");
  const [userGoal, setUserGoal] = useState("");
  const [charityAddress, setCharityAddress] = useState("");
  const [ethVault, setEthVault] = useState(true);
  const [daysLocked, setDaysLocked] = useState("");
  const { user } = useMoralis();
  const contractAddress = "0x7b9DaE28d5c7E5024a537Baa9D33c01CA60520fB";

  const styles = {
    modal: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "20px",
      width: "400px",
    },
    modalContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "430px",
      width: "100%",
      //height: "800px",
      //marginTop: "-300px",
      padding: "20px",
      background: "rgb(48, 48, 48)",
      borderRadius: "20px",
    },
  };

  const getVaultId = async () => {
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(vaultAbi, contractAddress);
   
        const options = {
            contractAddress: contractAddress,
            functionName: "getVaultCount",
            abi: vaultAbi,
            params: {
            },
          };  
    const receipt = await Moralis.executeFunction(options);
    console.log(receipt);
    return receipt;
  }

  const createVault = async () => {
    const web3 = await Moralis.enableWeb3();
    const contract = new web3.eth.Contract(vaultAbi, contractAddress);
   
        const options = {
            contractAddress: contractAddress,
            functionName: "createVault",
            abi: vaultAbi,
            params: {
              name: name,
              description: description,
              donationPerUser: Moralis.Units.Token(donationPerUser, "18"),
              userGoal: userGoal,
              charityAddress: charityAddress,
              ethVault: ethVault,
              daysLocked: daysLocked,
            },
          };
    const receipt = await Moralis.executeFunction(options);
    console.log(receipt)

    const Vaults = Moralis.Object.extend("Vaults");
    const vault = new Vaults();
    vault.set("name", name);
    vault.set("description", description);
    vault.set("donationPerUser", donationPerUser);
    vault.set("userGoal", userGoal);
    vault.set("charityAddress", charityAddress);
    vault.set("ethVault", ethVault);
    vault.set("daysLocked", daysLocked);
    vault.set("vaultId", (await getVaultId() - 1).toString());
    await vault.save();
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ color: "white" }}> Create new Vault</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={onClose}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          autoComplete="off"
        >
          <Form.Item label={<label style={{color: "white"}}> Name </label>} name="name">
            <input
              className="input_title"
              value={name}
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Description </label>}
            name="description"
          >
            <input
              className="input_first_name"
              value={description}
              type="text"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Donation </label>}
            name="number"
            rules={[{ required: true, message: "Please input donation per user" }]}
          >
            <input
              className="input_last_name"
              value={donationPerUser}
              type="text"
              onChange={(event) => setDonationPerUser(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Usergoal </label>}
            name="goal"
            rules={[{ required: true, message: "Please input Usergoal!" }]}
          >
            <input
              className="input_dateOfBirth"
              value={userGoal}
              type="number"
              onChange={(event) => setUserGoal(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Charityaddress </label>}
            name="address"
            rules={[{ required: true, message: "Please input an address!" }]}
          >
            <input
              className="input_gender"
              value={charityAddress}
              type="text"
              onChange={(event) => setCharityAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Eth Vault </label>}
            name="vault"
            //rules={[{ required: true, message: "Please input Address!" }]}
          >
            <Checkbox checked={ethVault} onChange={() => {setEthVault(!ethVault)}}></Checkbox>
              </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Days locked </label>}
            name="days"
            rules={[{ required: true, message: "Please input Days locked!" }]}
          >
            <input
              className="input_email"
              type="number"
              value={daysLocked}
              onChange={(event) => setDaysLocked(event.target.value)}
            />
          </Form.Item>
        </Form>
        <Button
          text={"Create"}
          onClick={() => {
              createVault()
              setName("");
              setDescription("");
              setDonationPerUser("");
              setCharityAddress("");
              setEthVault(true);
              setDaysLocked("");
              setUserGoal("");
              onClose();
            }}
        />
      </div>
    </div>
  );
};

export default NewVaultModal;
