import Block from "@core/block/block";
import { GENESIS } from "@core/config";
// 블록생성 테스트 코드 작성

// 최초블록은 하드코딩을 해서 작성해주는 경우가 꽤 있다.

// describe : 테스트 코드의 그룹 단위
describe("block 검증", () => {
    let newBlock : Block;
    let newBlock2 : Block;
    // it : 테스트 코드 최소 단위
    it("블록 추가", () => {
        // 블록에 기록할 트랜젝션 내용(거래의 기록)
        const data = ["tx02"];
        
        // pow 작업 증명을 통과한 퀴즈를 맞춘 블록이 newblock에 할당 된다.
        newBlock = Block.generateBlock(GENESIS, data);
        // 블록추가의 준비가 된 블록
        console.log(newBlock);

        // GENESIS => newBlock => newBlock2
        const data2 = ["tx03"];
        newBlock2 = Block.generateBlock(newBlock, data2);
        console.log(newBlock2)
    })
    it("블록 유효성 검증", ()=>{
        const isValidBlock = Block.isValidNewBlock(newBlock2, GENESIS);
        // 이전 블록과 비교했을때 새로 추가된 블록이 유효한 블록인지
        if(isValidBlock.isError) {
            // expect : toBe 값이 맞는지 확인하고 어떤 결과값이 출력되었어야하는지 알려준다.
            return expect(isValidBlock.isError).toBe(false);
        }
        // false 가 나와야하는데 맞니?
        expect(isValidBlock.isError).toBe(false);
    })

    it('블록이 유효한가? ', ()=>{
        expect(()=> Block.isValidNewBlock(newBlock2, GENESIS)).toThrow()
    })
})