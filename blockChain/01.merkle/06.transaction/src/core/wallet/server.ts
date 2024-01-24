import express from "express";
import {Wallet} from "./index";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.urlencoded({extended : false}))
app.use(express.json());

app.get("/",(req, res) => {
    const page = fs.readFileSync(path.join(__dirname, "/view/index.html"), "utf8");
    res.send(page);
})

// 지갑 목록
app.post("/walletList", (req,res)=>{
    const list = Wallet.getWalletList();
    res.json(list);
})

// 지갑 생성
app.post("/newWallet",(req,res)=>{
    res.json(new Wallet());
})

// 지갑 조회
app.post("/walletSelect" , (req,res)=>{
    const {account} = req.body;
    const privateKey = Wallet.getWalletPrivateKey(account);
    res.json(new Wallet(privateKey));
})

app.listen(4000, ()=>{
    console.log("server on~")
})
// npx ts-node .\src\core\wallet\server.ts