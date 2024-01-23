export interface IBlockHeader {
    version : string; // 블록의 버전
    height : number; // 블록의 높이 0 ~ 부터 시작 블록의 순서 
    timestamp : number; // 블록의 생성 시간
    previousHash : string; // 이전 블록의 해시
}

export interface IBlock extends IBlockHeader {
  merkleRoot : string; // 머클루트 해시값
  hash : string; // 블록의 내용을 모두 더해서 해시화 시킨 문자열
  nonce : number; // 블록을 채굴하기 위해서 몇번이나 연산작업을 시도했는지
  diffculty : number; // 블록의 난이도 // POW 알고리즘을 연산작업할때 맞춰야될 퀴즈 2 000
  data : string[]; // 블록의 기록되는 트랜젝션들..
}