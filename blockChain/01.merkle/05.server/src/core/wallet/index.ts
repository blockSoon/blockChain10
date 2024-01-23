import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";
import fs from "fs"
import path from "path";

// elliptic 패키지 인스턴스 생성
// 타원곡선 알고리즘의 별명 기준점이 어디냐에 따라 별명이 있는데
// secp256k1
const ec = new elliptic.ec("secp256k1");

// 지갑 저장할 경로
const dir = path.join(__dirname, "../data");

// 지갑 구조 정의
export class Wallet {
    account : string; // 지갑 주소
    privateKey : string; // 개인키
    publicKey : string; // 공개키
    balance : number; // 잔액 

    // 생성된 지갑이면 개인키를 전달해서 클래스 만들어줄거고.
    // 개인키가 없으면 없는지갑 새로 생성할 지갑
    constructor(privateKey : string = "") {
        this.privateKey = privateKey || this.getPrivateKey();
        this.publicKey = this.getPublicKey();
        this.account = this.getAccount();
        this.balance = 0;

        if(privateKey == "")
        Wallet.createWallet(this);
        // 지갑 생성
    }

    static createWallet(myWallet : Wallet){
        // fs 모듈 파일 생성
        // 지갑을 생성할때 내용을 파일로 만들어 줄것.
        // 파일에는 개인키가 내용으로 포함 될거임.
        // 파일의 이름은 지갑 주소
        const filepath = path.join(dir, myWallet.account);
        const filecontent = myWallet.privateKey;
        fs.writeFileSync(filepath, filecontent);
    }

    // 생성된 지갑의 리스트
    static getWalletList() : string[] {
        // 우리가 저장한 지갑 파일들을 읽어서 리스트를 가져오자
        const WalletFiles : string[] = fs.readdirSync(dir);
        return WalletFiles
    }

    static getWalletPrivateKey(account : string) : string {
        const filepath = path.join(dir, account);
        const filecontent = fs.readFileSync(filepath);
        return filecontent.toString();
    }

    getPrivateKey() : string {
        // 랜덤한 바이트로 해시값을 만든게 개인키
        return randomBytes(32).toString("hex");
    }

    getPublicKey() : string {
        // 공개키는 개인키를 가지고 만든다고 했는데.
        const keyPair = ec.keyFromPrivate(this.privateKey);
        // keyPair인스턴스 생성
        // keyPair 개인키의 내용을 가지고 있고 타원 곡선 알고리즘을 통해서 개인키와 기준점으로 공개키 생성
        return keyPair.getPublic().encode("hex", true);
    }

    getAccount() : string {
        // 개인키에서 40자리의 문자열을 지갑의 주소로 사용한다
        return `${this.publicKey.slice(26).toString()}`;
    }
}
