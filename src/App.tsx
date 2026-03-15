import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { useWalletStore } from "./stores/walletStore";
import { useState } from "react";
import { Toast } from "./components/Toast";

function App() {
  const {
    isConnected,
    address,
    balance,
    isLoadingAddress,
    isLoadingBalance,
    isLoadingSend,
    connect,
    getAddress,
    getBalance,
    sendGnot,
  } = useWalletStore();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  window.onload = async () => {
    if (!window.adena) {
      window.open("https://adena.app/", "_blank");
    }
  };

  const handleSend = () => {
    if (!recipient || !amount) {
      alert("Please enter Recipient`s address and Amount.");
      return;
    }
    sendGnot(recipient, amount);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-[24px] font-bold text-center mb-8">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
        <Card title="Connect Adena Wallet">
          <Button onClick={connect} disabled={!!isConnected}>
            {isConnected ? "Connected" : "Connect"}
          </Button>
        </Card>

        <Card title="Get Gno.land Address">
          <Button onClick={getAddress} disabled={!isConnected || isLoadingAddress}>
            Get Address
          </Button>
          <p className="text-[16px]">Address: {address}</p>
        </Card>

        <Card title="Get Balance">
          <Button onClick={getBalance} disabled={!isConnected || isLoadingBalance}>
            Get Balance
          </Button>
          <p className="text-[16px]">Balance: {balance}</p>
        </Card>

        <Card title="Send GNOT">
          <Input
            label="Recipient:"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={!isConnected}
          />
          <Input
            label="Amount:"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={!isConnected}
          />
          <Button onClick={handleSend} disabled={!isConnected || isLoadingSend}>
            Send
          </Button>
        </Card>
      </div>
      <Toast />
    </div>
  );
}

export default App;
