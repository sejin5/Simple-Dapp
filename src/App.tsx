// function App() {
//   return (
//     <>
//       <div className="text-xl bg-card-bg w-[200px]">수정중</div>
//     </>
//   );
// }

// export default App;
import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-[24px] font-bold text-center mb-8">
        Request to Gno.land via Adena wallet
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
        <Card title="Connect Adena Wallet">
          <Button>Connect</Button>
        </Card>

        <Card title="Get Gno.land Address">
          <Button disabled>Get Address</Button>
          <p className="text-[16px]">Address:</p>
        </Card>

        <Card title="Get Balance">
          <Button disabled>Get Balance</Button>
          <p className="text-[16px]">Balance:</p>
        </Card>

        <Card title="Send GNOT">
          <Input label="Recipient:" />
          <Input label="Amount:" />
          <Button disabled>Send</Button>
        </Card>
      </div>
    </div>
  );
}

export default App;
