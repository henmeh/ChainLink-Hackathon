import React, { useState } from "react";
import Button from "../../Button/button";
import { Form, Input } from "antd";
import { Moralis } from "moralis";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const EditInventoryModal = ({ open, onClose, _id, _item, _category, _status, _sales, _stock, _price }) => {
  const [item, setItem] = useState(_item);
  const [category, setCategory] = useState(_category);
  const [status, setStatus] = useState(_status);
  const [sales, setSales] = useState(_sales);
  const [stock, setStock] = useState(_stock);
  const [price, setPrice] = useState(_price);

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

  const edit = async () => {
    const Inventory = Moralis.Object.extend("Inventory");
    const query = new Inventory();
    query.equalTo("objectId", _id);
    const result = await query.first();
    result.set("item", item);
    result.set("category", category);
    result.set("status", status);
    result.set("sales", sales);
    result.set("stock", stock);
    result.set("price", price);
    await result.save();
  };

  if (!open) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ color: "white" }}> Edit Inventory</h3>
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
              defaultValue={item}
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
              defaultValue={category}
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
              defaultValue={status}
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
              defaultValue={sales}
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
              defaultValue={stock}
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
              type="number"
              defaultValue={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Item>
          <Button
            text={"Edit"}
            onClick={() => {
              setItem("");
              setCategory("");
              setStatus("");
              setSales("");
              setStock("");
              setPrice("");
              edit();
              onClose();
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default EditInventoryModal;
