import { SignatureInput } from "elliptic";

export class Sender{
    account : string; // 보내는 사람의 계정 주소
}

// 영수증
export class Receipt{
    sender : Sender;
    received : string; // 수신자 계정 주소
    amount : number; // 수신자에게 보내는 금액
    signature : SignatureInput;
}