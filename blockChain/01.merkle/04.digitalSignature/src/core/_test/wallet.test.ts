import { randomBytes, sign } from "crypto";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";

describe("전자 서명", ()=>{
    let privateKey : string;
    let publicKey : string;
    let signature : elliptic.ec.Signature;
    const ec = new elliptic.ec("secp256k1")
    it("개인키 생성", ()=>{
        // 랜덤한 2진수를 구하고
        // 16진수로 변환
        privateKey = randomBytes(32).toString("hex");
        console.log(`개인키 : ${privateKey}`);
        console.log(`개인키 길이 : ${privateKey.length}`)
    })
    
    it("공개키 생성", ()=>{
        const keyPair = ec.keyFromPrivate(privateKey);
        // 개인키로 키페어 생성
        publicKey = keyPair.getPublic().encode("hex",true);
        console.log(`공개키 : ${publicKey}`)
        console.log(`공개키 길이 : ${publicKey.length}`)
        // 공개키의 길이가 66자리인데 여기에서
        // 26자리를 앞에서 자른 40자리의 문자열이 지갑의 주소
    })

    it("서명 만들기", () => {
        // 서명을 만들때 트랜잭션 내용을 포함시켜서 서명을 만들어 보자.
        const keyPair = ec.keyFromPrivate(privateKey);

        // 트랜잭션은 임시로 만들어 봅시다
        const tx01 = SHA256("tx data").toString();

        signature = keyPair.sign(tx01, "hex");
        console.log('서명 : ', signature );

        // BN = 무척 큰 정수 타입
        // negative: 0 양수 라는 의미
        // words : 서명의 값을 32 비트 정수 배열로 표시한 값
        // length 배열의 길이
        // 서명 :  Signature {
        //     r: BN {
        //       negative: 0,
        //       words: [
        //          6830329, 60568425,
        //         24327165, 63162145,
        //         53007443, 56567652,
        //         55221997, 54768288,
        //         26322702,   498330
        //       ],
        //       length: 10,
        //       red: null
        //     },
        //     s: BN {
        //       negative: 0,
        //       words: [
        //         60418608, 55063277, 63448349, 33641526,
        //         38291210, 26683216, 43477014, 16850980,
        //         65307739,  3597728,        0,        0,
        //                0,        0,        0,        0,
        //                0,        0,        0,        0,
        //                0,        0,        0,        0,
        //                0,        0,        0,        0,
        //                0,        0
        //       ],
        //       length: 10,
        //       red: null
        //     },
        //     recoveryParam: 1
        //   }
    })
})