import { IBlock } from "@core/interface/block.interface";
import { Faillable } from "@core/interface/faillable.interface";
import CryptoModule from "@core/crypto/crypto.module";
import BlockHeader from "./blockHeader";
import { SHA256 } from "crypto-js";
import merkle from "merkle";
import {BLOCK_GENRATION_INTERVAL, DIFFICULTY_ADJUSTMENT_INTERVAL} from "@core/config"

// block의 형태를 class로 정의
class Block extends BlockHeader implements IBlock {
    hash: string;
    merkleRoot: string;
    nonce: number;
    diffculty: number;
    data: string[];
    constructor(_previousBlock : Block, _data : string[], _adjustmentBlock : Block){
        // 부모 블록해더 생성자 호출
        super(_previousBlock);
        this.merkleRoot = Block.getMerkleRoot<string>(_data); // 머클루트 알고리즘 메서드
        this.hash = Block.createBlockHash(this); // 블록의 모든 내용을 가지고 만든 해시값

        this.nonce = 0; // 블록생성 당시에 연산작업이 얼마나 반복되었는지 넣을 것.
        this.diffculty = Block.getDifficulty(this, _adjustmentBlock, _previousBlock); // 블록의 난이도 설정 블록의 생성 주기를 조절하기위해서 필요한 값
        this.data = _data;
    }

    // 현재 블록의 해시를 구하는 메서드
    static createBlockHash(_block : Block) : string {
        const {version, timestamp, height, merkleRoot, previousHash, diffculty, nonce} = _block;
        const value : string = `${version}${timestamp}${height}${merkleRoot}${previousHash}${diffculty}${nonce}`;
        return SHA256(value).toString();
    }

    // 머클루트를 구하는 메서드
    // getMerkleRoot 메서드를 사용할때 매개변수의 타입을 정의하고싶어.
    // getMerkleRoot<T> 함수 호출시 제네릭에 정의한 타입을 함수 안에서 사용하기 위해.
    static getMerkleRoot<T>(_data : T[]): string {
        const merkleTree = merkle("sha256").sync(_data);
        return merkleTree.root();
    }

    // 블록 생성
    // 블록의 해시 만드는 메서드
    // 블록의 검증 메서드
    // 마이닝 => 블록 생성 권한을 얻기위해서 난이도에 맞는 답을 구하는 연산
    static findBlock(generateBlock : Block){
        let hash : string
        // 연산의 횟수
        let nonce : number = 0;

        while(true){
            // 16진수 -> 2진수 변경
            nonce++;
            generateBlock.nonce = nonce;
            hash = Block.createBlockHash(generateBlock);
            // nonnce가 증가함으로 블록의 해시값이 변경 된다
            // 정답을 찾아가는 과정
            const binary : string = CryptoModule.hashToBinary(hash);
            console.log("binary : ",binary);
            // 정답을 비교 POW 작업증명 
            // 연산을 통해서 해당 정답을 찾았는지 비교하는 식은
            // 난이도 2 가정 00 이상이니? 0의 갯수
            // 000000000000010101110101010101010
            // startsWith = 문자열에서 앞에 문자열이 포함되는지 비교
            const result : boolean = binary.startsWith("0".repeat(generateBlock.diffculty));

            if(result){
                // 정답을 맞추면
                // 정답을 맞춘 해시를 생성할 블록에 포함시키고
                generateBlock.hash = hash;
                // 실제로 포함시킬 블록을 반환
                return generateBlock;
            }
        }
    }

    // 블록이 유효한지 검증하는 메서드
    static isValidNewBlock(_newBlock : Block, _previousBlock : Block) : Faillable<Block, string> {
        // 블록의 유효성 검사 실패시 반환식
        if(_previousBlock.height + 1 !== _newBlock.height){
            return {isError : true, value : "이전 블록의 높이 비교 오류" }
        }
        if(_previousBlock.hash !== _newBlock.previousHash){
            return {isError : true, value : "이전 블록 해시 비교 오류"}
        }
        if(Block.createBlockHash(_newBlock) !== _newBlock.hash){
            return {isError: true, value : "블록 해시 오류"}
        }

        // 블록유효성 검사 통과
        return {isError : false, value : _newBlock};
    }

    // 블록 추가
    static generateBlock(_previousBlock : Block, _data : string[], _adjustmentBlock : Block) : Block {
        const generateBlock = new Block(_previousBlock, _data, _adjustmentBlock);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock;
    }

    // 난이도 조정 메서드 난이도를 구해준다.
    static getDifficulty(_newBlock : Block, _adjustmentBlock : Block, _previousBlock) : number{
        // 실제는 2,016개 우리는 여기서 10개로 작성할것.

        // 블록의 높이가 0이면 에러 반환 높이가 0이 들어왔어
        if(_newBlock.height <= 0) throw new Error("높이가 0이 들어왔어");
        // 블록의 높이가 10 미만이면 0의 난이도를 반환
        if(_newBlock.height < 10) return 0;
        // 블록의 높이가 21 미만이면 1의 난이도를 반환
        if(_newBlock.height < 21) return 1;

        // 난이도를 조정

        // 나머지가 떨어지면 않으면 
        if(_newBlock.height % DIFFICULTY_ADJUSTMENT_INTERVAL !== 0){
            return _previousBlock.diffculty;
        }

        // 블록의 생성 시간을 10번째 블록과 차이를 구하고
        const timeToken : number = _newBlock.timestamp - _adjustmentBlock.timestamp;
        // 블록의 10개 주기 시간 블록 생성 주기 목표 시간
        const timeExpected : number = BLOCK_GENRATION_INTERVAL * 10 * DIFFICULTY_ADJUSTMENT_INTERVAL;
        
        // 난이도가 증가하거나 감소
        if(timeToken < timeExpected / 2) return _previousBlock.diffculty + 1;

        if(timeToken > timeExpected * 2) return _previousBlock.diffculty - 1;
        
    }
}

export default Block;