import React, { useState } from "react";
import Button from "../../Button/button";
import { Form, Input } from "antd";
import { Moralis } from "moralis";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const NewInventoryModal = ({ open, onClose }) => {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sales, setSales] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

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

  const saveInventory = async (
    _item,
    _category,
    _status,
    _sales,
    _stock,
    _price
  ) => {
    const Inventory = Moralis.Object.extend("Inventory");
    const inventory = new Inventory();
    inventory.set("item", _item);
    inventory.set("category", _category);
    inventory.set("status", _status);
    inventory.set("sales", _sales);
    inventory.set("stock", _stock);
    inventory.set("price", _price);
    await inventory.save();
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ color: "white" }}> Create new Inventory</h3>
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
          <Form.Item
            label={<label style={{ color: "white" }}> Item </label>}
            name="item"
          >
            <Input
              className="input_title"
              value={item}
              type="text"
              onChange={(event) => setItem(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}> Category </label>}
            name="category"
            //rules={[{ required: true, message: "Please input First Name!" }]}
          >
            <Input
              className="input_first_name"
              value={category}
              type="text"
              onChange={(event) => setCategory(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}> Status </label>}
            name="status"
            //rules={[{ required: true, message: "Please input Last Name!" }]}
          >
            <Input
              className="input_last_name"
              value={status}
              type="text"
              onChange={(event) => setStatus(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}> Sales </label>}
            name="sales"
            //rules={[{ required: true, message: "Please input Date of Birth!" }]}
          >
            <Input
              className="input_dateOfBirth"
              value={sales}
              type="number"
              onChange={(event) => setSales(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}> Stock </label>}
            name="stock"
            //rules={[{ required: true, message: "Please input Gender!" }]}
          >
            <Input
              className="input_gender"
              value={stock}
              type="number"
              onChange={(event) => setStock(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "white" }}> Price </label>}
            name="price"
            //rules={[{ required: true, message: "Please input Address!" }]}
          >
            <Input
              className="input_address"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Item>
          <Button
            text={"Create"}
            onClick={() => {
              setItem("");
              setCategory("");
              setStatus("");
              setSales("");
              setStock("");
              setPrice("");
              saveInventory(item, category, status, sales, stock, price);
              onClose();
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default NewInventoryModal;
