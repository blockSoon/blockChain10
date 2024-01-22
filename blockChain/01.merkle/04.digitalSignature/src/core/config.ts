import { IBlock } from "./interface/block.interface";

export const GENESIS : IBlock = {
    version : "1.0.0",
    height : 0,
    timestamp : new Date().getTime(),
    hash : "0".repeat(64),
    previousHash : "0".repeat(64),
    merkleRoot : "0".repeat(64),
    diffculty : 0,
    nonce : 0,
    data : ["tx01"]
}

// 자주 사용하는 값을 상수로 정리
export const INTERVAL = 10;
// 블록 10개 생성 주기
export const BLOCK_GENRATION_INTERVAL = 10 * 60;
// 블록 10개 이전
export const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;