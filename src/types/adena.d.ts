interface AdenaResponse {
  status: "success" | "failure";
  type: string;
  message?: string;
  data?: object;
}

interface AdenaAccountResponse extends AdenaResponse {
  data: {
    accountNumber: number;
    address: string;
    coins: string;
    chainId: string;
    sequence: string;
    status: string;
    publicKey: {
      "@type": string;
      value: string;
    };
  };
}

interface AdenaTransactionResponse extends AdenaResponse {
  data: {
    height: string;
    hash: string;
    deliverTx?: object;
    checkTx?: object;
  };
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
  memo?: string;
  isNotification?: boolean;
}

interface Adena {
  AddEstablish: (appName: string) => Promise<AdenaResponse>;
  GetAccount: () => Promise<AdenaAccountResponse>;
  DoContract: (tx: AdenaContractRequest) => Promise<AdenaTransactionResponse>;
}

export {};

declare global {
  interface Window {
    adena?: Adena;
  }
}
