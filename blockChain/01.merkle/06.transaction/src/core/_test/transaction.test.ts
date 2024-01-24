// 1. 개인키를 만들자
// 2. 공개키를 만들자
// 3. 서명을 만들자
// 4. 유효한 서명인지 검증하자 개인키로 서명한 서명을 공개키로 검증
// 5. 지갑의 내용으로 공개키 자르자.
// 6. 트랜잭션 객체 생성 및 UTXO 객체 생성
// 7. 트랜잭션 out, 임의의 트랜잭션 해시값, 서명을 만든다
// 8. 임의의 잔액을 추가하기 위해서 UTXO에 미사용 객체 추가 40비트 줄거임
// 9. 위에 만든 서명의 내용이 10비트를 보내는 서명의 내용이었고 
// 10. 트랜잭션 pool 담고 이후에 처리되는 과정을
// 11. 정상적으로 처리가 되고 있는 과정임 UTXO 해당 트랜잭션의 내용에서 txOut의 미사용 객체를 추가해주고 
//     (40비트 가지고있는 사람) 사용한 객체는 제거
// 12. 트랜잭션 처리한 트랜잭션 삭제(확인)
import elliptic from "elliptic";
import Transaction from "@core/transaction/transaction";
import Unspent from "@core/transaction/unspent";
import {randomBytes} from "crypto"
import { SHA256 } from "crypto-js";
import { Receipt } from "@core/transaction/interface/receipt.interface";
const ec = new elliptic.ec("secp256k1");

describe("Transaction", ()=>{
    let transaction : Transaction;
    let unspent : Unspent;
    let privateKey : string;
    let publicKey : string;
    let signature : elliptic.ec.Signature;
    let addres;

    // 테스트 케이스가 실행 되기 전에 호출됨
    beforeEach(()=>{
        transaction = new Transaction();
        unspent = new Unspent();
    })

    it("개인키 생성", ()=>{
         privateKey = randomBytes(32).toString("hex");
         console.log("개인키 길이 : ", privateKey.length);
         console.log("개인키 : ", privateKey);
    })

    it("공개키 생성", ()=>{
        const keyPair = ec.keyFromPrivate(privateKey);
        publicKey = keyPair.getPublic().encode("hex", true);
        console.log("공개키 : ",publicKey);
        console.log("공개키 길이 : ", publicKey.length);
    })

    // 개인키의 목적은 공개키 생성과 서명 생성
    // 공개키의 목적은 개인키로 만든 서명을 검증하는 역활 신원 인증 이사람이 한게 맞아?.

    it("서명 만들기", ()=>{
        const keyPair = ec.keyFromPrivate(privateKey);
        const hash = SHA256("transaction Data 01").toString();
        signature = keyPair.sign(hash, "hex");
        console.log("서명 : ", signature);
    })

    // 공개키로 검증
    it("서명 검증", () =>{
        const hash = SHA256("transaction Data 01").toString();
        const verify = ec.verify(hash, signature, ec.keyFromPublic(publicKey, "hex"));
        console.log(verify);
    })

    it("지갑 주소", () => {
        addres = publicKey.slice(26).toString();
        console.log(`계정 : 0x${addres}`)
    })

    // 트랜잭션
    it("transaction 테스트" , () => {
        // 보내는 계정의 주소
        const account = "0".repeat(40);

        // 보내는 계정이 가질 비트
        const amount = 40;

        // 미사용 잔액 객체를 만들어서 추가해주자 (이거는 우리가 테스트하기위해서)
        const txout = transaction.createTxOut(addres, amount);
        // 트랜잭션 출력값 하나 만든것 내용은 아래
        // {
        //     account : addres
        //     amount : 40
        // }
        // 임의의 트랜잭션 해시를 하나 만들고
        const txHash = SHA256("tx01").toString();
        // UTXO에 미사용 객체 추가 할거임 지금 만든 지갑주소가 소유자고 40비트의 잔액을 가지고있는
        const unspentOuts = unspent.create(txHash);
        unspentOuts(txout, 1);

        console.log("unspent 미사용 객체 추가", unspent.getUnspentTxPool());

        // 서명이 필요하다. 송금을 한사람이 맞는지 검증을 해주는 서명

        const receipt : Receipt = {
            sender : addres,
            received : account,
            amount : 10,
            signature : signature
        }
        // 서명 검증 
        const tx01 = transaction.create(receipt, unspent.getUTXO(addres));

        console.log("transaction  풀", transaction.getPool());
        
        // 트랜잭션 처리
        unspent.update(tx01);
        transaction.update(tx01);

        console.log("unspent 미사용 객체 제거 및 새로운 미사용 객체 추가", unspent.getUnspentTxPool());
        console.log("처리된 transaction pool에서 제거",transaction.getPool());

    })
})