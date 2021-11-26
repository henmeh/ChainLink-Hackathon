import { useState, useEffect } from "react";
import NewInventoryModal from "./components/NewInventoryModal";
import EditInventoryModal from "./components/EditInventoryModal";
import { Moralis } from "moralis";
import Button from "../Button/button";
import "../../style.css";
import { Table } from "antd";
import { useMoralisQuery } from "react-moralis";

const Products = () => {
  const [isAddInventoryModalActive, setAddInventoryModalActive] = useState(false);
  const [isEditInventoryModalActive, setEditInventoryModalActive] = useState(false);
  const [id, setId] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sales, setSales] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const { data, errorQuery, isLoading } = useMoralisQuery(
    "Inventory",
    (query) => query.descending("objectId"),
    [],
    { live: true }
  );

  const deleteInventory = async (_inventoryId) => {
    const Inventory = Moralis.Object.extend("Inventory");
    const query = new Moralis.Query(Inventory);
    query.equalTo("objectId", _inventoryId);
    const result = await query.first();
    await result.destroy();
  };

  const editInventory = (_id, _item, _category, _status, _sales, _stock, _price) => {
    setId(_id);
    setItem(_item);
    setCategory(_category);
    setStatus(_status);
    setSales(_sales);
    setStock(_stock);
    setPrice(_price);
    setEditInventoryModalActive(true);
  };


  let dataSource = [];

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const inventory = {
        key: data[i].id,
        id: data[i].id,
        item: data[i].attributes.item,
        category: data[i].attributes.category,
        status: data[i].attributes.status,
        sales: data[i].attributes.sales,
        stock: data[i].attributes.stock,
        price: data[i].attributes.price,
      };
      dataSource.push(inventory);
    }
  }

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "edit",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            text={"Edit"}
            onClick={() => {
              editInventory(
                record.id,
                record.item,
                record.category,
                record.status,
                record.sales,
                record.stock,
                record.price,
              );
            }}
          />
          <Button text={"Delete"} onClick={() => deleteInventory(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "white", marginRight: "10px" }}>
          Products
        </h2>
        <Button
          text={"Create new Product"}
          onClick={() => {
            setAddInventoryModalActive(true);
          }}
        />
      </div>
      {isAddInventoryModalActive && (
        <NewInventoryModal
          open={isAddInventoryModalActive}
          onClose={() => setAddInventoryModalActive(false)}
        />
      )}
      {isEditInventoryModalActive && (
        <EditInventoryModal
          open={isEditInventoryModalActive}
          onClose={() => setEditInventoryModalActive(false)}
          _id={id}
          _item={item}
          _category={category}
          _status={status}
          _sales={sales}
          _stock={stock}
          _price={price}
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

export default Products;
