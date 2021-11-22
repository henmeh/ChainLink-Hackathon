import React, { useEffect, useState } from "react";
import { useNewMoralisObject } from "react-moralis";
import Button from "../../Button/button";
import { Form, Checkbox } from "antd";

const NewEmployeeModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const[checked, setChecked] = useState(true);
  const[disabled, setDisabled] = useState(false);

  const { isSaving, errorSaving, save } = useNewMoralisObject("Employees");

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

  const onChange = () => {
    console.log("Hallo");
  }

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={{ color: "white" }}> Create new Employee</h3>
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
            <input
              className="input_title"
              value={title}
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> First Name </label>}
            name="first_name"
            rules={[{ required: true, message: "Please input First Name!" }]}
          >
            <input
              className="input_first_name"
              value={first_name}
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Last Name </label>}
            name="last_name"
            rules={[{ required: true, message: "Please input Last Name!" }]}
          >
            <input
              className="input_last_name"
              value={last_name}
              type="text"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Date of Birth </label>}
            name="dateofbirth"
            rules={[{ required: true, message: "Please input Date of Birth!" }]}
          >
            <input
              className="input_dateOfBirth"
              value={dateOfBirth}
              type="date"
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Gender </label>}
            name="gender"
            rules={[{ required: true, message: "Please input Gender!" }]}
          >
            <input
              className="input_gender"
              value={gender}
              type="text"
              onChange={(event) => setGender(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Address </label>}
            name="address"
            rules={[{ required: true, message: "Please input Address!" }]}
          >
            <input
              className="input_address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Email </label>}
            name="email"
            rules={[{ required: true, message: "Please input Email!" }]}
          >
            <input
              className="input_email"
              type="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Phone </label>}
            name="phone"
            rules={[{ required: true, message: "Please input Phone!" }]}
          >
            <input
              className="input_phone"
              type="number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Eth Address </label>}
            name="ethAddress"
            rules={[{ required: true, message: "Please input Eth Address!" }]}
          >
            <input
              className="input_ethaddress"
              type="text"
              value={ethAddress}
              onChange={(event) => setEthAddress(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Hire Date </label>}
            name="hiredate"
            rules={[{ required: true, message: "Please input Hire Date!" }]}
          >
            <input
              className="input_hiredate"
              type="date"
              value={hireDate}
              onChange={(event) => setHireDate(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<label style={{color: "white"}}> Monthly Salary </label>}
            name="salary"
            rules={[{ required: true, message: "Please input Hire Salary!" }]}
          >
            <input
              className="input_salaray"
              type="number"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
            />
          </Form.Item>
        </Form>
        <div>
        <Checkbox onChange={onChange}><text style={{color: "white"}}>Add to Paymentflow</text></Checkbox>
        <Checkbox onChange={onChange}><text style={{color: "white"}}>Add to Paymentpool</text></Checkbox>
        </div>
        
        <Button
          text={"Create"}
          onClick={() => {
            const activeStream = false;
            setTitle("");
            setFirstName("");
            setLastName("");
            setDateOfBirth("");
            setGender("");
            setAddress("");
            setEmailAddress("");
            setPhone("");
            setEthAddress("");
            setHireDate("");
            setSalary("");
            save({
              title,
              first_name,
              last_name,
              dateOfBirth,
              gender,
              address,
              emailAddress,
              phone,
              ethAddress,
              hireDate,
              salary,
              activeStream,
            });
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default NewEmployeeModal;
