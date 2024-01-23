import { IBlock, IBlockHeader } from "@core/interface/block.interface";

class BlockHeader implements IBlockHeader {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    constructor(_previousBlock : IBlock) {
        // 새로 생성되는 블록은 이전블록의 내용이 필요하다
         this.version = BlockHeader.getVersion();
         this.timestamp = BlockHeader.getTimestamp();
         this.height = _previousBlock.height + 1;
         this.previousHash = _previousBlock.hash;
    }

    static getVersion() {
        return "1.0.0";
    }
    static getTimestamp () {
        return new Date().getTime();
    }
}

export default BlockHeader;