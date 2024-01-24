import { Client } from "./client";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import { MessageType } from "./interface/message.interface";
import path from "path";
import fs from "fs";
import Chain from "@core/chain/chain";

export default (client : Client, chain : Chain) =>{
    const app : Express = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));

    app.get("/", (req : Request, res : Response)=>{
        // 여기는 페이지 내용 불러와주자
        res.send(fs.readFileSync(path.join(__dirname, "./views/index.html"),"utf8"));
    })

    app.get("/chains", (req: Request, res:Response)=>{
        client.connect(MessageType.allBlock);
        res.json(chain.get());
    })

    app.post("/block/mine", (req : Request, res : Response) =>{
        const {data} : {data : Array<string>} = req.body;
        client.connect(MessageType.addBlock, data);
        res.json(chain.get());
    })

    app.get("/block/latestBlock", (req : Request, res : Response) =>{
        client.connect(MessageType.latestBlock);
        res.json(chain.latestBlock());
    })

    return app;
}