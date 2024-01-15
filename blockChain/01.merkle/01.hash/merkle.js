const merkle = require("merkle");

// A, B, C, D
// A + B , C + D
// AB + CD
// ABCD

// 머클 트리
// 데이터의 무결성 검증에 사용되는 트리 구조
// 트리 처럼 뻗어서 마지막 루트 해시값을 구해서 사용한다.
// 머클루트가 처리하는 값이 홀수일 경우 마지막 데이터를 한번더 해시해서 사용한다.

const txData = ["A", "B", "C", "D", "E"];

const merkleTree = merkle("sha256").sync(txData);
const Root = merkleTree.root();
console.log(Root);
