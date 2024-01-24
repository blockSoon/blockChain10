import {SignatureInput} from "elliptic";
// 트랜잭션의 구조를 정의할건데
// Txin, Txout

// 트랜잭션 입력 구조
export class TxIn {
    txOutId ? : string; // 이전 트랜잭션의 ID(해시값)
    txOutIndex : number; // 이전 트랜잭션의 출력 인덱스
    signature : SignatureInput; // 트랜잭션의 입력 서명
}

// 트랜잭션 출력 구조
export class TxOut {
    account : string; // 수신자 계정 공개키 or 주소
    amount : number; // 수신자가 받은 금액
}

// txin과 txout을 담아줄 구조
export class TransactionRow {
    txIns : TxIn[]; // 트랜잭션 입력 목록(utxo의 값을 참조해서)
    txOuts : TxOut[]; // 트랜잭션이 처리되면 출력값 목록
    hash? : string; // 트랜잭션의 식별자 (해시값)
}

// UTXO 구조 정의
export class UnspentTxOut {
    txOutId : string; // 해당 UTXO에 포함된 트랜잭션 Hash
    txOutIndex : number; // 해당 UTXO가 포함된 트랜잭션 출력 인덱스
    account : string; // UTXO 소유 계정
    amount : number; // 잔액
}

// 트랜잭션 데이터 정의
// 직렬화된 문자열로 반환을 할수도 있음.
export type TransactionData = string | TransactionRow;

// 사용되지 않은 UTXO들을 담을 pool 구조
export type UnspentTxPool = UnspentTxOut[];

// 처리되지 않은 트랜잭션들을 담을 pool 구조
export type TransactionPool = TransactionRow[];
