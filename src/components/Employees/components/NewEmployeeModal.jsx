import React, { useEffect, useState } from "react";
import Button from "../../Button/button";
import { Form, Checkbox } from "antd";
import { Moralis } from "moralis";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";
import { useMoralis } from "react-moralis";


Moralis.start({
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL,
  appId: process.env.REACT_APP_MORALIS_APPLICATION_ID,
});

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
  const[isFlow, setFlow] = useState(false);
  const[isPool, setPool] = useState(false);
  const { user } = useMoralis();


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

  const onChangeFlow = () => {
    setFlow(!isFlow);
  }

  const onChangePool = () => {
    setPool(!isPool);
  }

  const saveEmployee = async (_paymentMethod, _title, _first_name, _last_name, _dateOfBirth, _gender, _address, _emailAddress, _phone, _ethAddress, _hireDate, _salary, _activeStream, _poolId) => {
    if(_paymentMethod === "flow") {
      const Employee = Moralis.Object.extend("PaymentFlow"); 
      const employee = new Employee();
      employee.set("paymentMethod", _paymentMethod);
      employee.set("title", _title);
      employee.set("first_name", _first_name);
      employee.set("last_name", _last_name);
      employee.set("dateOfBirth", _dateOfBirth);
      employee.set("gender", _gender);
      employee.set("address", _address);
      employee.set("emailAddress", _emailAddress);
      employee.set("phone", _phone);
      employee.set("ethAddress", _ethAddress);
      employee.set("hireDate", _hireDate);
      employee.set("salary", _salary);
      employee.set("activeStream", _activeStream);
      await employee.save();
      }
    if(_paymentMethod === "pool") {
      const Employee = Moralis.Object.extend("PaymentPoolMembers"); 
      const queryPoolMembers = new Moralis.Query(Employee);
      queryPoolMembers.limit(1000);
      const result = await queryPoolMembers.find();
      if(result.length === 0) {
        const employee = new Employee();
        employee.set("paymentMethod", _paymentMethod);
        employee.set("title", _title);
        employee.set("first_name", _first_name);
        employee.set("last_name", _last_name);
        employee.set("dateOfBirth", _dateOfBirth);
        employee.set("gender", _gender);
        employee.set("address", _address);
        employee.set("emailAddress", _emailAddress);
        employee.set("phone", _phone);
        employee.set("ethAddress", _ethAddress);
        employee.set("hireDate", _hireDate);
        employee.set("salary", _salary);
        employee.set("poolSize", _salary);
        employee.set("poolShares", 1);
        await employee.save();
        await addPoolMembers(_ethAddress, 1);
      } else {
        // calculating poolSize
        let poolSize = parseFloat(_salary);
        for(let i = 0; i < result.length; i++) {
          poolSize += parseFloat(result[i].get("salary"));
        }
        for(let i = 0; i < result.length; i++) {
          result[i].set("poolShares", result[i].get("salary") / poolSize);
          result[i].set("poolSize", poolSize.toString());
          await result[i].save();
        }
        // adding new member
        const employee = new Employee();
        employee.set("paymentMethod", _paymentMethod);
        employee.set("title", _title);
        employee.set("first_name", _first_name);
        employee.set("last_name", _last_name);
        employee.set("dateOfBirth", _dateOfBirth);
        employee.set("gender", _gender);
        employee.set("address", _address);
        employee.set("emailAddress", _emailAddress);
        employee.set("phone", _phone);
        employee.set("ethAddress", _ethAddress);
        employee.set("hireDate", _hireDate);
        employee.set("salary", _salary);
        employee.set("poolSize", poolSize.toString());
        employee.set("poolShares", salary / poolSize);
        await employee.save();
        await addPoolMembers(_ethAddress, (salary / poolSize));
      }
    }
  }

  const addPoolMembers = async (_memberAddress, _shares) => {
    //init superfluid
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
    });
    await sf.initialize();
    const employer = sf.user({
      address: user.attributes.ethAddress,
      token: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
    });
    
    //adding poolmembers
    await employer.giveShares({
      poolId: 104,
      recipient: _memberAddress,
      shares: (_shares * 100).toFixed(0),
    });
  };

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
            //rules={[{ required: true, message: "Please input Date of Birth!" }]}
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
            //rules={[{ required: true, message: "Please input Gender!" }]}
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
            //rules={[{ required: true, message: "Please input Address!" }]}
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
            //rules={[{ required: true, message: "Please input Email!" }]}
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
            //rules={[{ required: true, message: "Please input Phone!" }]}
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
            //rules={[{ required: true, message: "Please input Hire Date!" }]}
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
            rules={[{ required: true, message: "Please input Monthly Salary!" }]}
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
        <Checkbox onChange={onChangeFlow}><h3 style={{color: "white"}}>Add to Paymentflow</h3></Checkbox>
        <Checkbox onChange={onChangePool}><h3 style={{color: "white"}}>Add to Paymentpool</h3></Checkbox>
        </div>
        
        <Button
          text={"Create"}
          onClick={() => {
            if(ethAddress === "" || salary === "") {
              alert("Please input a valid Eth Address and a valid monthly salary");
              return;
            } else {
              const activeStream = false;
              const poolId = 1;
              let paymentMethod;
              isFlow ? paymentMethod = "flow" : paymentMethod = "pool";
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
              saveEmployee(
                paymentMethod,
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
                poolId,
              )
              onClose();
            }
           
          }}
        />
      </div>
    </div>
  );
};

export default NewEmployeeModal;
