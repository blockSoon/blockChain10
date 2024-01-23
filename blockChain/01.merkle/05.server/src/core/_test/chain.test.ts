import Block from "@core/block/block";
import Chain from "@core/chain/chain";

import { GENESIS } from "@core/config";

describe("체인 검증", ()=>{
    let newBlock : Block;
    let newBlock2 : Block;
    let newChain : Chain;
    let newChain2 : Chain;
    it("블록 체인 추가", () => {
        const data = ["tx01"];
        // 이전 블록은 GENESIS 블록 트랜젝션 내용은 임시 TX01 10번째 이전 블록은 없기때문에 최초의 블록
        newBlock = Block.generateBlock(GENESIS, data, GENESIS);
        const data2 = ["tx02"];
        newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);

        newChain = new Chain();
        newChain.addToChain(newBlock)
        console.log("newChain : ",newChain.get());
        console.log("newChain Hash", newChain.getBlockByHash(newBlock.hash));
    })

    it("체인의 검증 (롱기스트 체인 룰)", () => {
        // 상대방 체인을 받아서 내 체인과 비교를하고 
        // 상대방체인이 정답 체인이면 업데이트
        newChain2 = new Chain();
        // 최초블록 하나가지고 있는 체인
        console.log("newChain2 get",newChain2.get());
        newChain2.replaceChain(newChain.get());
        console.log("newChain2 replaceChain ",newChain2.get());
    })

    it("블록 난이도 조정", ()=>{
        // 블록을 마이닝하면서 블록 생성 많이 해볼것.
        // 난이도 증가를 확인하기위해
        for(let i = 0; i < 100; i++){
            let block = Block.generateBlock(newChain.latestBlock(), [`tx${i}`], newChain.getAdjustmentBlock());
            newChain.addToChain(block);
        }
        console.log("newChain.getAdjustmentBlock : ", newChain.getAdjustmentBlock());
        console.log("newChain.serialize : ", newChain.serialize());
        console.log("newChain.deserialize : ",newChain.deserialize(newChain.serialize()));
    })
})