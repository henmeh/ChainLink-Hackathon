import ERC20Transfer from "../ERC20Transfers/ERC20Transfers";
import NativeTransactions from "../NativeTransactions/NativeTransactions";

const Transactions = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "15px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ERC20Transfer />
      
    </div>
  );
};

export default Transactions;
//<NativeTransactions />