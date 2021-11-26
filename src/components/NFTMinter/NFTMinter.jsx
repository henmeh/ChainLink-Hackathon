import React from "react";
import { Card, Image, Tooltip, Modal, TextArea, Input} from "antd";
import { useMoralis } from "react-moralis";
import styles from "./styles";
import Button from "../../components/Button/button";
import useChain from "hooks/useChain";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";


function CreateNFT() {
  const { Moralis, web3 } = useMoralis();
  const { switchNetwork } = useChain();
  const { chainId } = useMoralisDapp();


  let nftContractAddress = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431"; // Make this variable

  // Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
  // Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
  // BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD

  // choose value as per dragdrop

  const minting = async () => {

    chainId !== "0x13881" && switchNetwork("0x13881");
    // Storing the file

    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();

    // Storing the metadata

    const imageURI = imageFile.ipfs();
    const metadata = {
      name: document.getElementById("metadataName").value,
      description: document.getElementById("metadataDescription").value,
      image: imageURI,
    };
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await metadataFile.saveIPFS().then((result) => {
      alert("Metadata saved successfully");
    });
    const metadataURI = metadataFile.ipfs();
    console.log(metadataURI);

    // minting
    await mintToken(metadataURI).then((result) => {
      alert("Token minting transaction sent successfully !!");
    });
  };

  async function mintToken(_uri) {
    const encodedFunction = web3.eth.abi.encodeFunctionCall(
      {
        name: "mintToken",
        type: "function",
        inputs: [
          {
            type: "string",
            name: "tokenURI",
          },
        ],
      },
      [_uri]
    );

    const transactionParameters = {
      to: nftContractAddress,
      // eslint-disable-next-line no-undef
      from: ethereum.selectedAddress,
      data: encodedFunction,
    };
    // eslint-disable-next-line no-undef
    const txt = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txt;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Card
        style={styles.card}
        bodyStyle={{ padding: "18px" }}
        title={<div style={styles.text}>NFT Minter</div>}
        size="large"
      >
        This minter currently supports only Polygon Mumbai NFTs.
        <br />
        <br></br>
        <Input
          type="text"
          name="metadataName"
          id="metadataName"
          placeholder="Name of the NFT"
        />
        <br />
        <br />
        <br></br>
        <br></br>
        <Input
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            border: "none",
            outline: "none",
          }}
          placeholder="Description of the NFT"
          name="metadataDescription"
          id="metadataDescription"
        />
        <br />
        <br />
        <Input type="file" name="fileInput" id="file" placeholder="File" />
        <br />
        <br />
        <br />
        <Button text={"Mint"} onClick={minting} />
      </Card>
    </div>
  );
}

export default CreateNFT;