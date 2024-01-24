import { SignatureInput } from "elliptic";

// 보내는 사람
export class Sender {
    publickKey : string
    account : string
}

// 영수증
export class Receipt {
    sender : Sender;
    received : string;
    amount : number;
    signature : SignatureInput
}

// 지갑
export class Accounts {
    privateKey : string;
    publicKey : string;
    account : string;
}