import { TransactionRow, TransactionPool, TransactionData, TxIn, TxOut ,UnspentTxOut, UnspentTxPool } from "./interface/transaction.interface";
import { Sender,Receipt } from "@core/transaction/interface/receipt.interface";
import { SignatureInput } from "elliptic";
import { SHA256 } from "crypto-js";


// 트랜잭션 객체 구조
class Transaction {
    // 블록을 채굴하면 트랜잭션 처리가 된다.
    // 블록 생성 권한을 얻고(마이닝 퀴즈를 맞춰서)
    // 블록이 정상적으로 체인에 추가가 되면 트랜잭션이 처리된다.
    // 이때 새로운 블록의 첫번째 트랜잭션으로 특별한 트랜잭션이 추가되는데 코인베이스 트랜잭션이다.
    // 새로운 블록의 첫 거래 이자 블록 채굴 보상을 얻는 트랜잭션
    private readonly REWARD = 50; // 채굴자 보상
    private readonly transactionPool : TransactionPool = []; // 아직 처리되지않은 트랜잭션을 담을 변수

    getPool() : TransactionPool {
        return this.transactionPool;
    }

    createInput (
        myUnspentTxOuts : UnspentTxOut[],
        receiptAmount : number,
        signature : SignatureInput) : [TxIn[], number]  {
            // 0보다 금액이 큰지 비교
            let targetAmount = 0;

            const txins = myUnspentTxOuts.reduce((acc : TxIn[], unspentTxOut : UnspentTxOut)=>{
                const {amount, txOutId, txOutIndex} = unspentTxOut;
                // 0을 보내면 조건 처리
                if (targetAmount >= receiptAmount) return acc; 
                targetAmount += amount;
                acc.push({txOutIndex, txOutId, signature});
                return acc;
            }, [] as TxIn[] )
            return [txins, targetAmount];
    }
    createOutInput (recevied : string , amount : number, sender : string, senderAmount : number) {
        // amount 받은 사람의 금액
        // senderAmount 보낸 사람의 잔액
        console.log(recevied, amount, sender, senderAmount);
        const txouts : TxOut[] = [];
        // txout 받는사람, 받은 금액

        txouts.push({account : recevied, amount});

        // 보낸사람의 잔액은 다시 새로운 객체를 만들어서 추가
        if(senderAmount - amount > 0){
            txouts.push({account : sender, amount : senderAmount - amount})
        }

        // 잔액을 비교 검증
        const outAmount = txouts.reduce((acc, txout : TxOut) => {
            return acc + txout.amount
        },0)
        // 전체 금액을 검ㄴ증
        // 내가 가지고 있는 금액에서 
        // 보낸 금액과 내가 남은 잔액이 
        // 총 금액과 같은지 검증
        if(outAmount !== senderAmount) throw new Error("총금액이 맞지 않는다.");

        return txouts;
    }

    serializeTxOut( txOut : TxOut) : string {
        // 출력 트랜잭션을 해시 문자열로 반환
        const {account, amount} = txOut;
        const text = [account,amount].join("");
        return SHA256(text).toString();
    }

    serializeTxIn(txIn : TxIn) : string {
        const {txOutIndex} = txIn;
        return SHA256(txOutIndex.toString()).toString();
    }

    // 트랜잭션을 추가
    create(receipt : Receipt, unspentTxOuts : UnspentTxOut[]) {
        // 서명을 먼저 확인

        if(!receipt.signature) throw new Error("서명이 없다.");

        // 유효한 트랜잭션이 발생한것인지 검증
        // 잔액을 계산
        // txinput
        const [txIns, amount] = this.createInput(unspentTxOuts, receipt.amount, receipt.signature);

        // txout
        // 트랜잭션의 출력값 
        const txOuts = this.createOutInput(receipt.received, receipt.amount, receipt.sender.account, amount);

        // 트랜잭션 객체화
        const transaction = {
            txIns, // 누가 누구에게 금액을 전송한 내용과 서명이 포함되어있다. 잔액도 확인
            txOuts, // 결과물 누가 얼마를 받았다.
            hash : ""
        }

        // 트랜잭션의 hash 값을 추가
        transaction.hash = this.serializeRow(transaction);

        // 트랜잭션 pool에 추가
        this.transactionPool.push(transaction);

        return transaction;
    }

    serializeTx<T>(data : T[], callback : (item : T) => string){
        // 트랜잭션 내용을 문자열로 반환
        return data.reduce((acc : string, item : T)=> acc +callback(item), "")
    }

    serializeRow(row :TransactionRow) {
        const {txIns, txOuts} = row;
        // 직열화된 문자열로 변환

        const txOutsText = this.serializeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item))

        const txInsText = this.serializeTx<TxIn>(txIns, (item)=> this.serializeTxIn(item))

        // 트랜잭션의 해시
        return SHA256(txOutsText + txInsText).toString();
    }

    // 블록의 채굴자가
    // 블록의 채굴보상을 받는 특수한 트랜잭션
    // 블록에 첫번째 거래내용으로 기록이 된다.
    // 코인 베이스 트랜잭션
    // 채굴자의 주소와 보상이 제공된다.
    createCoinbase(account : string, latestBlockHeight : number) {
        // txoutindex로 최신블록의 높이를 포함시켜준다.
        // 단순하게 txin, txout의 내용을 만들어서 넣어주고
        const txIn = this.createTxIn(latestBlockHeight + 1);
        const txout = this.createTxOut(account, this.REWARD);
        return this.createRow([txIn],[txout])
    }

    createTxIn(txOutIndex : number, txOutId? : string, signature? :SignatureInput){
        // 단순하게 입력 트랜잭션만 생성
        const txIn = new TxIn();
        txIn.txOutIndex = txOutIndex;
        txIn.txOutId = txOutId;
        txIn.signature = signature;
        return txIn;
    }

    createTxOut(account : string, amount : number) : TxOut {
        if(account.length !== 40) throw new Error("지갑주소 잘못 입력함");
        const txout = new TxOut();
        txout.account = account;
        txout.amount = amount;
        return txout;
    }

    createRow(txIns : TxIn[], txOuts : TxOut[]) {
        // 단순하게 트랜잭션 hash 값을 반환
        const transactionRow = new TransactionRow();
        transactionRow.txIns = txIns;
        transactionRow.txOuts = txOuts;
        transactionRow.hash = this.serializeRow(transactionRow);

        return transactionRow;
    }

    // 트랜잭션 pool에 있는 트랜잭션을 처리
    update( transaction : TransactionRow) {
        const findCallback = (tx : TransactionRow) => transaction.hash == tx.hash;
        const index = this.transactionPool.findIndex(findCallback);
        if(index !== -1) this.transactionPool.splice(index,1);
    }

    // 트랜잭션 목록을 업데이트
    sync(transactions : any){
        if(typeof transactions === "string") return;

        transactions.forEach(this.update.bind(this));
    }
}
export default Transaction;