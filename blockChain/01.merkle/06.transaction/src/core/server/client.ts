import net from "net";
import { IMessage, MessageType } from "./interface/message.interface";
import Chain from "@core/chain/chain";
import Block from "@core/block/block";

export class Client {
    constructor(private readonly chain : Chain, private readonly port : number) {}
    connect(type : MessageType, payload?: string[]):void {
        const client = new net.Socket();
        client.connect(this.port, "127.0.0.1", () => {
            // 어떤 메시지의 내용을 요청할건지. {type payload}
            client.write(JSON.stringify(this.message(type, payload)))
        })

        client.on("data", (data) =>{
            const message : IMessage = JSON.parse(data.toString().trim());
            switch(message.type) {
                case MessageType.addBlock :
                    this.chain.replaceChain(message.payload as Block[]);
                break;
                case MessageType.latestBlock :
                    console.log(message.payload);
                break;
                case MessageType.allBlock :
                    console.log(message.payload);
                break;
            }
            client.destroy(); // 소켓 연결 종료
        })
        client.on("close", ()=>{
            console.log("소켓 통신 종료")
        })
    }
    addBlock(payload : string[]) : Block[] {
        const block = Block.generateBlock(this.chain.latestBlock(),payload, this.chain.getAdjustmentBlock() )
        this.chain.addToChain(block);
        return this.chain.get();
    }
    message(type : MessageType, payload?:string[]) : IMessage {
        let message : IMessage;
        switch (type) {
            case MessageType.addBlock:
                message = {
                    type,
                    payload : this.addBlock(payload)
                }
                break;
            case MessageType.latestBlock:
                message = {
                    type,
                    payload : this.chain.latestBlock()
                }
                break;
            case MessageType.allBlock:
                message = {
                    type,
                    payload : this.chain.get()
                }
                break;
        }
        return message;
    }
}