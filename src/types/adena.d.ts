interface AdenaResponse {
  status: "success" | "failure";
  type: string;
  message: string;
  data: any;
}

interface AdenaSendMessage {
  type: "/bank.MsgSend";
  value: {
    from_address: string;
    to_address: string;
    amount: string;
  };
}

interface AdenaContractRequest {
  messages: AdenaSendMessage[];
  gasFee: number;
  gasWanted: number;
  memo?: string;
}

interface Adena {
  AddEstablish: (appName: string) => Promise<AdenaResponse>;
  GetAccount: () => Promise<AdenaResponse>;
  DoContract: (tx: AdenaContractRequest) => Promise<AdenaResponse>;
}

export {};

declare global {
  interface Window {
    adena?: Adena;
  }
}
