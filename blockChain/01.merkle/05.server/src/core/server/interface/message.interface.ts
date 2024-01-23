import Block from "@core/block/block";

export enum MessageType {
    latestBlock = "latestBlock",
    allBlock = "allBlock",
    addBlock = "addBlock"
}

export interface IMessage {
    type : MessageType,
    payload : Block | Block[]
}