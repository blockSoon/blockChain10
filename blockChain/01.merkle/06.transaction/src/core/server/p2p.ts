import net, {Socket} from "net"
import { IMessage, MessageType } from "./interface/message.interface"
import Chain from "@core/chain/chain";
import Block from "@core/block/block";
import { IP2P } from "./interface/p2p.interface";

export class P2P implements IP2P{
    sockets : Socket[] = [];
    constructor(private readonly chain : Chain){}
    listen(port: number): void {
        const server = net.createServer((socket)=>{
            // 소켓을 클라이언트가 연결을 시도하면
            // 충돌을 방지하기위해 동적인 포트가 할당된다.
            console.log(`[+] 새로운 소켓 등장 ${socket.remoteAddress} : ${socket.remotePort}`);
            this.sockets.push(socket);

            socket.on("data", (data)=>{
                // 전달된 메시지에 따라 조건처리
                // 클라이언트 측에서 발생시킨 이벤트의 메시지내용에 따라서
                // 블록추가, 블록 전체 조회, 마지막 블록 조회
                console.log(data.toString().trim());
                const message : IMessage = JSON.parse(data.toString().trim());

                switch (message.type) {
                    case MessageType.addBlock:
                        this.chain.replaceChain(message.payload as Block[]);
                        // 내 블록이 체인에 추가가 되었어서 길어졌거나 혹은 내 체인이 짧았거나 그러면 상대방의 더긴 체인을 받을수 있겠죠
                        socket.write(
                            JSON.stringify({type : message.type, payload : this.chain.get()})
                        )
                        break;
                    case MessageType.latestBlock:
                        socket.write(JSON.stringify({type:message.type, payload : this.chain.latestBlock()}));
                        break;
                    case MessageType.allBlock:
                        socket.write(JSON.stringify({type: message.type, payload : this.chain.get()}))
                        break;
                }
            })

            socket.on("end", () =>{
                const index = this.sockets.indexOf(socket);
                if(index === -1) return;

                this.sockets.splice(index, 1);
                console.log(`[-] 소켓 접속 종료 ${socket.remoteAddress} : ${socket.remotePort}`);
            })

        })
        server.listen(port, ()=>{
            console.log(`p2p server on~ port : ${port}`);
        })
    }
}