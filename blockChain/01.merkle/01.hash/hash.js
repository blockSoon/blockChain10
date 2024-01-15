const { SHA256 } = require("crypto-js");
// const SHA256 = require("crypto-js/sha256");

// SHA256은 블록체인에서 가장 많이 채택되고 있는 암호 방식
// 속도도 장점이 있고 인증서나 블록체인에서 많이 사용중
// SHA256 알고리즘은 256비트로 구성된 64자리 문자열로 암호화 한다.

const str = "hello";
console.log("해시결과 : ", SHA256(str).toString());
console.log("길이는? : ", SHA256(str).toString().length);

// 머클루트
// 하나의 해시 값이 될때까지 암호화하고 문자열 더하고를 반복한다.
