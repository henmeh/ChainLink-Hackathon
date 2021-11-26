import React, { useEffect, useState } from "react";
import { Moralis } from "moralis";
import Button from "../../Button/button";
import { Form, Input } from "antd";

Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

const EditEmployeeModal = ({
  open,
  onClose,
  _paymentMethod,
  _id,
  _title,
  _first_name,
  _last_name,
  _dateOfBirth,
  _gender,
  _address,
  _emailAddress,
  _phone,
  _ethAddress,
  _hireDate,
  _salary,
}) => {
  const [title, setTitle] = useState(_title);
  const [first_name, setFirstName] = useState(_first_name);
  const [last_name, setLastName] = useState(_last_name);
  const [dateOfBirth, setDateOfBirth] = useState(_dateOfBirth);
  const [gender, setGender] = useState(_gender);
  const [address, setAddress] = useState(_address);
  const [emailAddress, setEmailAddress] = useState(_emailAddress);
  const [phone, setPhone] = useState(_phone);
  const [ethAddress, setEthAddress] = useState(_ethAddress);
  const [hireDate, setHireDate] = useState(_hireDate);
  const [salary, setSalary] = useState(_salary);
  const [paymentMethod, setPaymentMethod] = useState(_paymentMethod);
  
  const edit = async () => {
    const Employee = Moralis.Object.extend(paymentMethod);
        const query = new Moralis.Query(Employee);
        query.equalTo("objectId", _id);
        const result = await query.first();
        result.set("title", title);
        result.set("first_name", first_name);
        result.set("last_name", last_name);
        result.set("dateOfBirth", dateOfBirth);
        result.set("gender", gender);
        result.set("address", address);
        result.set("emailAddress", emailAddress);
        result.set("phone", phone);
        result.set("ethAddress", ethAddress);
        result.set("hireDate", hireDate);
        result.set("salary", salary);
        
        await result.save();
  };

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

  if (!open) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ color: "white" }}> Edit Employee</h3>
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
          <Form.Item label={<label style={{color: "white"}}> Title </label>} name="title">
            <Input
              defaultValue={title}
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> First Name </label>}
            name="first_name"
            rules={[{ required: true, message: "Please input First Name!" }]}
          >
            <Input
              className="input_first_name"
              defaultValue={first_name}
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Last Name </label>}
            name="last_name"
            rules={[{ required: true, message: "Please input Last Name!" }]}
          >
            <Input
              className="input_last_name"
              defaultValue={last_name}
              type="text"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Date of Birth </label>}
            name="dateofbirth"
            rules={[{ required: true, message: "Please input Date of Birth!" }]}
          >
            <Input
              className="input_dateOfBirth"
              defaultValue={dateOfBirth}
              type="date"
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Gender </label>}
            name="gender"
            rules={[{ required: true, message: "Please input Gender!" }]}
          >
            <Input
              className="input_gender"
              defaultValue={gender}
              type="text"
              onChange={(event) => setGender(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Address </label>}
            name="address"
            rules={[{ required: true, message: "Please input Address!" }]}
          >
            <Input
              className="input_address"
              type="text"
              defaultValue={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Email </label>}
            name="email"
            rules={[{ required: true, message: "Please input Email!" }]}
          >
            <Input
              className="input_email"
              type="email"
              defaultValue={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Phone </label>}
            name="phone"
            rules={[{ required: true, message: "Please input Phone!" }]}
          >
            <Input
              className="input_phone"
              type="number"
              defaultValue={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Eth Address </label>}
            name="ethAddress"
            rules={[{ required: true, message: "Please input Eth Address!" }]}
          >
            <Input
              className="input_ethaddress"
              type="text"
              defaultValue={ethAddress}
              onChange={(event) => setEthAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Hire Date </label>}
            name="hiredate"
            rules={[{ required: true, message: "Please input Hire Date!" }]}
          >
            <Input
              className="input_hiredate"
              type="date"
              defaultValue={hireDate}
              onChange={(event) => setHireDate(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Monthly Salary </label>}
            name="salary"
            rules={[{ required: true, message: "Please input Hire Salary!" }]}
          >
            <Input
              className="input_salaray"
              type="number"
              defaultValue={salary}
              onChange={(event) => setSalary(event.target.value)}
            />
          </Form.Item>
        </Form>

        <Button
          text={"Edit"}
          onClick={() => {
            edit();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default EditEmployeeModal;
