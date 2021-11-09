import ERC20Balance from "../ERC20Balance";
import NativeBalance from "../NativeBalance";

const Dashboard = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <div style={{ width: "100%", padding: "15px" }}>
        <NativeBalance />
        <ERC20Balance />
      </div>
    );
  }
  else {
    return (
      <div>Please login</div>)
  }
};

export default Dashboard;
