import { P2P } from "./server/p2p";
import Chain from "./chain/chain";
import { Client } from "./server/client";
import App from "./server"

const chain = new Chain();
const client = new Client(chain, 8080);

const chain2 = new Chain();
const client2 = new Client(chain2, 8080);

const app = App(client,chain);
const app2 = App(client2, chain2);

const p2p = new P2P(chain);

app.listen(4000, ()=>{
    console.log("server on~")
})

app2.listen(4001, ()=>{
    console.log("server2 on~")
})
p2p.listen(8080);