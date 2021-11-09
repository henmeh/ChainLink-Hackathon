import Transfer from "./components/Transfer";
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
    color: "white",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    fontSize: "16px",
    width: "450px",
    height: "500px",
    fontWeight: "500",
    backgroundColor: "var(--sidebar)",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function Wallet({ loggedIn }) {
  if (loggedIn) {
    return (
      <div style={styles.wrapper}>
        <Card
          style={styles.card}
          title={
            <div style={styles.header}>
              <Blockie scale={5} avatar currentWallet />
              <Address size="6" copyable />
              <NativeBalance />
            </div>
          }
        >
          <Transfer />
        </Card>
      </div>
    );
  } else {
    return <div>Please log in </div>;
  }
}

export default Wallet;
