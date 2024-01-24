import { TransactionData, TransactionPool, TransactionRow,TxIn,TxOut,UnspentTxOut,UnspentTxPool } from "./interface/transaction.interface";

// UTXO
// 각 노드의 UTXO 데이터 베이스
// 각 주소별로 가지고있는 잔액을 조회할수 있다.
// 객체의 내용으로 트랜잭션 out 해시값과 소유자 주소와 잔액의 내용이 포함되어 있다.

// A -> B 1비트를 보냈고
// 트랜잭션이 생성되고 txin txout
// txin에서 이전 트랜잭션 내용의 남은 잔액 내용을 조회해서 
// 트랜잭션 검증을 하고 검증이후 출력값이 처리가 되면 UTXO에 미사용 객체가 추가된다.
// UTXO에서 사용된 객체는 값을 수정하는게 아니고 삭제를 시킨다. 새로운 객체를 만들어서 넣어준다.
// 트랜잭션이 승인이 되면 사용한 객체는 제거를 해버리고 새로운 객체를 다시 포함시켜준다(받은사람의 내용과 보낸사람의 잔액)

class Unspent {
    private readonly unspentTxOuts : UnspentTxPool = [];
    
    getUnspentTxPool() : UnspentTxPool{
        return this.unspentTxOuts;
    }

    // 누군가 돈을 받았고 트랜잭션의 out의 내용으로 UTXO에 잔액 내용포함 객체를 추가
    create(hash : string) {
        return (txout : TxOut, txOutIndex : number) =>{
            const {amount, account} = txout;
            this.unspentTxOuts.push({
                txOutId : hash, // 트랜잭션의 해시값 (송금의 대한 내용을 담고있는 트랜잭션)
                txOutIndex, // 트랜잭션 인덱스
                account, 
                amount
            })
        }
    }

    // UTXO안의 미사용 객체 사용하면 제거
    delate(txin : TxIn) {
        const {txOutId, txOutIndex} = txin;
        const index = this.unspentTxOuts.findIndex((unspentTxOut : UnspentTxOut) => {
            // utxo에 포함된 트랜잭션 아이디가 맞는지 인덱스 비교
            return unspentTxOut.txOutId === txOutId && unspentTxOut.txOutIndex === txOutIndex
        })

        // 사용한 UTXO 객체를 제거
        if(index !== -1) this.unspentTxOuts.splice(index, 1);
    }
    
    // 트랜잭션 업데이트 UTXO의 내용도 업데이트
    update(transaction : TransactionRow) {
        // 처리되는 트랜잭션이 들어옴

        const {txIns, txOuts, hash} = transaction;

        // 해시가 정상적인지 확인
        if(!hash) throw new Error("hash 정상적이지 않다.")

        // 트랜잭션의 출력 값을 UTXO에 추가
        txOuts.forEach(this.create(hash));

        // 사용한 객체 제거
        // UTXO 목록에서 사용한 객체는 제거
        txIns.forEach(this.delate.bind(this));
    }
    
    // 특정 계정이 가지고 있는 UTXO를 조회
    getUTXO(account : string) : UnspentTxOut[] {
        // 계정이 가지고있는 잔액 정보를 모두 조회
        const myUnspentTxOuts = this.unspentTxOuts.filter((utxo)=> utxo.account === account)
        return myUnspentTxOuts;
    }

    // 총금액을 value로 확인
    getAmount(myUnspentTxOuts : UnspentTxOut[]) {
        // 금액만 다 더해서 보여줄 메서드
        return myUnspentTxOuts.reduce((acc, utxo) => acc + utxo.amount, 0);
    }
    
    // 계정의 잔고가 보내는 금액보다 큰지 검증
    isAmount(account :string, SenderAmount: number){
        // 내 주소의 잔액객체를 찾고싶어서 UTXO 객체 배열을 순회하면서 확인
        const mtUnspentTxOuts = this.getUTXO(account);

        // 총 금액
        const totalAmount = this.getAmount(mtUnspentTxOuts);
        if(totalAmount > SenderAmount) return true;
        return false;
    }
}

export default Unspent;