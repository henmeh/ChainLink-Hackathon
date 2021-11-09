import ERC20Transfer from "../ERC20Transfers/ERC20Transfers";
import NativeTransactions from "../NativeTransactions/NativeTransactions";

const Transactions = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <div style={{ width: "100%", padding: "15px", display: "flex", flexDirection: "row" }}>
        <ERC20Transfer />
        <NativeTransactions />
      </div>
    );
  }
  else {
    return (
      <div>Please login</div>)
  }
};

export default Transactions;