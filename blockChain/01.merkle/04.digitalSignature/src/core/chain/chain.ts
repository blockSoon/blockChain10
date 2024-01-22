import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import { IChain } from "@core/interface/chain.interface";
import { Faillable } from "@core/interface/faillable.interface";
import {INTERVAL}from "@core/config"
class Chain implements IChain {
    private chain : Block[] = [GENESIS];

    // 체인을 반환 하는 메서드
    get(): Block[] {
        return this.chain;
    }

    // 체인의 길이 반환하는 메서드
    length(): number {
        return this.chain.length;
    }

    // 체인의 마지막 블록 반환
    latestBlock(): Block {
        return this.chain[this.length() - 1];
    }

    // 체인에 블록을 추가
    addToChain(receivedBlock: Block): Block {
        this.chain.push(receivedBlock);
        return this.latestBlock();
    }

    // 블록 조회할때 어떤메서드로 조회할건지
    getBlock(callbackFn: (block: Block) => boolean): Block {
        // 예 > getBlockByHeight > callbackFn === (block : Block) => block.height === heigth
        // this.chain.find((block : Block) => block.height === heigth)
        // 순회하면서 블록이 들어가고 조회한 높이에 맞는 블록이 있으면 블록을 반환한다

        const findBlock = this.chain.find(callbackFn);
        if(!findBlock) throw new Error("찾은 블록이 없어..");
        return findBlock;
    }

    // 블록의 높이를 조회
    getBlockByHeight(heigth: number): Block {
        return this.getBlock((block : Block) => block.height === heigth)
    }

    // 블록의 해시로 조희
    getBlockByHash(hash: string): Block {
        // 83fe7345341ea596c1be3fd916bb8e90dbeff692e1adc99321d4a5e4e557e41c
        return this.getBlock((block : Block) => block.hash === hash)
    }

    serialize(): string {
        return JSON.stringify(this.chain);
        // [{block},{block2},{block3}] 이런 문자열로 변환 될것.
    }

    deserialize(chunk: string): Block[] {
        return JSON.parse(chunk)
        // 다른 노드에서 받은 체인JSON 문자열을 파싱
    }

    // 상대방 체인과 비교
    replaceChain(receiveChain: Block[]): Faillable<undefined, string> {
        // 본인 가지고 있는 체인과 상대방의 체인을 검증하는 로직
        // 실제로는 더 복잡한 검증 로직이 들어있겠지만 우리는 간단하게 토이프로젝트이기때문에 
        // 간단한 비교 로직으로 작성할것.

        // 상대방에게서 받은 체인에서 마지막 블록
        const latestReceivedBlock : Block = receiveChain[receiveChain.length - 1];

        // 본인의 마지막 블록
        const latestBlock : Block = this.latestBlock();

        if(latestReceivedBlock.height === 0){
            return {
                isError : true,
                value : "상대방의 체인은 마지막 블록이 최초블록이다."
            }
        }
        if(latestReceivedBlock.height <= latestBlock.height){
            return {
                isError : true,
                value : "상대방의 체인이 내 체인보다 짧거나 같다."
            }
        }

        // 상대방의 체인이 내 체인보다 길면
        // 상대방의 체인으로 내 체인을 업데이트
        this.chain = receiveChain;
        return {isError : false, value : undefined};
    }

    // 난이도 조정 목적 
    // 비트코인은 10분간 블록의 생성하기 위해서 난이도를 조정해주는데 목표는 평균적으로 블록이 10분에 한개 생성 되는것이 목표
    // 컴퓨터 연산 해시레이트의 변화에 따라 난이도를 조정해서 생성의 간격을 조정한것.
    // 난이도의 측정 주기를 설정을 하는데 실제 비트코인에서는 2,016개 블록 주기로 난이도를 조정한다. 
    // 블록 생성 시간이 10분이라 가정해서 약 2주 정도의 주기로 난이도 조정을 한다.
    // 2주 미만이면 해시레이트가 높은것 난이도 상승! 2주 이상이면 해시레이트가 낮아졌다는 뜻 난이도 감소.

    // 우리는 토이 블록체인이기 때문에 난이도 조정을 눈으로 빠르게 보기위해서 2주를 기다릴수 없기 때문에
    // 10번째 블록 마다 난이도 조정을 하게 만들어 보자.

    // 10번째 이전 블록을 반환할 메서드

    // 체인에 블록이 추가될때 난이도 증가식이 포함될건데.
    getAdjustmentBlock(): Block {
        const currentLength = this.length();
        // 최초블록 or 10번째 이전 블록
        const adjustmentBlock : Block = currentLength < INTERVAL ? GENESIS : this.chain[currentLength - INTERVAL];
        return adjustmentBlock;
    }
}
export default Chain;