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

const PaymentPool = () => {
  const [id, setId] = useState("");
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
  const { user } = useMoralis();
  const [employer, setEmployer] = useState();

  const [isEditEmployeeModalActive, setEditEmployeeModalActive] =
    useState(false);
  const { data, errorQuery, isLoading } = useMoralisQuery(
    "Paymentpools",
    (query) => query.descending("objectId"),
    [],
    { live: true }
  );

  const initSuperfluid = async () => {
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
    });
    await sf.initialize();
    const employer = sf.user({
      address: user.attributes.ethAddress,
      token: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
    });
    setEmployer(employer);
  };

  useEffect(() => {
    initSuperfluid();
  }, []);

  const deleteEmployee = async (_employeeId) => {
    const Employee = Moralis.Object.extend("Employees");
    const query = new Moralis.Query(Employee);
    query.equalTo("objectId", _employeeId);
    const result = await query.first();
    await result.destroy();
  };

    /*const createNewPaymentPool = async () => {
    const Pools = Moralis.Object.extend("Paymentpools");
    const query = new Moralis.Query(Pools);
    const result = await query.find();
    const newPoolId = (result.length + 1) * 10;

    const poolMembers = [];
    const poolSize = 0;
    const poolEmployees = [];

    await save({ newPoolId, poolMembers, poolSize, poolEmployees });
    console.log(employer);

    await employer.createPool({
      poolId: newPoolId,
    });
  };*/

  const addPoolMembers = async (_poolId, _memberAddress, _salary) => {
    //finding the pool on moralis
    const Pool = Moralis.Object.extend("Paymentpools");
    const query = new Moralis.Query(Pool);
    query.equalTo("newPoolId", _poolId);
    const result = await query.first();
    let poolMembers = result.get("poolMembers");
    let poolSize = result.get("poolSize");
    let poolEmployees = result.get("poolEmployees");

    if (poolMembers.length > 0) {
      if (poolMembers.includes(_memberAddress)) {
        alert("This employee is already part of this paymentpool");
      } else {
        let newPoolEmployees = [];
        let newPoolMembers = [...poolMembers, _memberAddress];
        let newPoolSize = poolSize + parseFloat(_salary);

        for (let i = 0; i < poolEmployees.length; i++) {
          let poolEmployee = {
            address: _memberAddress,
            salary: poolEmployees[i]["salary"],
            shares: poolEmployees[i]["salary"] / newPoolSize,
          };
          newPoolEmployees.push(poolEmployee);
        }
        let newPoolEmployee = {
          address: _memberAddress,
          salary: _salary,
          shares: _salary / newPoolSize,
        };
        newPoolEmployees.push(newPoolEmployee);

        result.set("poolMembers", newPoolMembers);
        result.set("poolSize", newPoolSize);
        result.set("poolEmployees", newPoolEmployees);

        await result.save();

        //calculating shares of all poolmembers
        //let employeeData = result.get("employeeData")
        //for(let i = 0; i < employeeData.length; i++) {
        //  employeeData[i]["poolshares"].set(poolSize / employeeData[i]["salary"]=;
        //}
      }
    } else {
      result.set("poolMembers", [_memberAddress]);
      result.set("poolSize", parseFloat(_salary));
      result.set("poolEmployees", [
        { address: _memberAddress, salary: parseFloat(_salary), shares: 1 },
      ]);
      await result.save();

      //adding poolmembers
      await employer.giveShares({
        poolId: _poolId,
        recipient: _memberAddress,
        shares: 1,
      });
    }
  };

  const payoutPool = async (_poolId) => {
    //finding the pool on moralis
    const web3 = new Moralis.Web3();
    const Pool = Moralis.Object.extend("Paymentpools");
    const query = new Moralis.Query(Pool);
    query.equalTo("newPoolId", _poolId);
    const result = await query.first();
    let poolSize = result.get("poolSize");
    const salary = web3.utils.toWei(poolSize.toString(), "ether");

    await employer.distributeToPool({
      poolId: _poolId,
      amount: salary,
    });
  };

  const editEmployee = (
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
    _salary
  ) => {
    setId(_id);
    setTitle(_title);
    setFirstName(_first_name);
    setLastName(_last_name);
    setDateOfBirth(_dateOfBirth);
    setGender(_gender);
    setAddress(_address);
    setEmailAddress(_emailAddress);
    setPhone(_phone);
    setEthAddress(_ethAddress);
    setHireDate(_hireDate);
    setSalary(_salary);
    setEditEmployeeModalActive(true);
  };

  let dataSource = [];

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const employee = {
        key: data[i].id,
        id: data[i].id,
        title: data[i].attributes.title,
        first_name: data[i].attributes.first_name,
        last_name: data[i].attributes.last_name,
        dateOfBirth: data[i].attributes.dateOfBirth,
        gender: data[i].attributes.gender,
        address: data[i].attributes.address,
        emailAddress: data[i].attributes.emailAddress,
        phone: data[i].attributes.phone,
        ethAddress: data[i].attributes.ethAddress,
        hireDate: data[i].attributes.hireDate,
        salary: data[i].attributes.salary,
        activeStream: data[i].attributes.activeStream,
      };
      dataSource.push(employee);
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Eth Address",
      dataIndex: "ethAddress",
      key: "ethAddress",
      render: (ethaddress) => getEllipsisTxt(ethaddress, 5),
    },
    {
      title: "Hire Date",
      dataIndex: "hireDate",
      key: "hireDate",
    },
    {
      title: "Monthly Salary $",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Action",
      key: "edit",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            text={"Edit"}
            onClick={() => {
              editEmployee(
                record.id,
                record.title,
                record.first_name,
                record.last_name,
                record.dateOfBirth,
                record.gender,
                record.address,
                record.emailAddress,
                record.phone,
                record.ethAddress,
                record.hireDate,
                record.salary
              );
            }}
          />
          <Button text={"Delete"} onClick={() => deleteEmployee(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div style={{margin: "10px"}}>
      {isEditEmployeeModalActive && (
        <EditEmployeeModal
          open={isEditEmployeeModalActive}
          onClose={() => setEditEmployeeModalActive(false)}
          _id={id}
          _title={title}
          _first_name={first_name}
          _last_name={last_name}
          _dateOfBirth={dateOfBirth}
          _gender={gender}
          _address={address}
          _emailAddress={emailAddress}
          _phone={phone}
          _ethAddress={ethAddress}
          _hireDate={hireDate}
          _salary={salary}
        />
      )}
      <Table
        rowClassName="tablerow"
        dataSource={dataSource}
        columns={columns}
        title={() => <h3 style={{ color: "white"}}>Company Paymentpools</h3>}
      />
    </div>
  );
};

export default PaymentPool;
