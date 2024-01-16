// 체인은 블록 객체들을 가지고 있는 배열로 구성
import Block from "@core/block/block";
import { Faillable } from "./faillable.interface";

export interface IChain {
    // 체인에 있는 모든 블록 조회
    get() : Block[];
    // 체인의 길이를 조회하는 메서드
    length() : number;
    // 마지막 블록 조회
    latestBlock() : Block;
    // 체인에 블록을 추가
    addToChain(receivedBlock : Block) : Block;
    // 블록 조회 (블록 조회를 여러가지 할껀데 콜백으로 전달해서 사용할 것.)
    getBlock(callbackFn : (block : Block) => boolean ) : Block;
    // 블록 높이로 블록 조회
    getBlockByHeight(heigth : number) : Block;
    // 블록의 해시값으로 블록 조회
    getBlockByHash(hash : string) : Block;
    // 블록체인을 문자열로 변경 블록 체인을 주고 받기 위해 사용할것.
    serialize() : string;
    // 블록체인의 문자열을 받아서 파싱
    deserialize(chunk : string) : Block[];
    // 체인 비교를 해서 맞는 체인으로 교체하는 메서드(롱기스트 체인 룰)
    replaceChain(receiveChain : Block[]) : Faillable<undefined, string>;
    // 블록의 n번째 이전 블록을 조회
    getAdjustmentBlock() : Block;
}