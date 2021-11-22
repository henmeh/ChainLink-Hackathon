import ERC20Balance from "../ERC20Balance";
import NativeBalance from "../NativeBalance";

const Dashboard = () => {
  return (
    <div style={{ width: "100%", padding: "15px" }}>
      <NativeBalance />
      <ERC20Balance />
    </div>
  );
};

export default Dashboard;
