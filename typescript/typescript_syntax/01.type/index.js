"use strict";
// javascript 문법
const msg = "메시지";
// 타입 정의 typescript
const msg2 = "메시지 typescript";
console.log(msg2);
// typescript의 변수 타입 지정
// 변수명 : 타입명 = 초기값
// node는 자바스크립트 런타임 환경
// typescript는 없어.. 그럼 컴파일해서 javascript 파일로 변환해서 일일히 작업을 확인해봐야하나..
// ts-node를 사용을 하면 개발환경에서 typescript로 작성된 코드를 실행 시켜볼수 있다.
// 기존 javascript는 node를 통해 실행을 시켜볼수 있었는데
// typescript는 node가 해석을 할수가 없다. ts-node로 실행을 시켜볼수 있다.
// nodejs용 typescript 실행 환경을 만들어줌(typescript를 javascript로 변환해서 파일을 가지고 실행 시킬 필요가 없음)
// 1. typescript 코드를 내부 컴파일러(typescript를 javascript로 변환)를 사용해서 메모리상에 javascript 코드로 변환된 내용을 가지고있고
// javascript 파일을 만들지 않음
// 2. 메모리상에 컴파일된 javascript 코드를 nodejs 런타임 환경으로 실행 코드 결과 출력
// 설치 명령어
// nodejs의 javascript 런타임 환경이라 내장 함수 및 모듈의 타입의 정보가 필요하다.(잔소리 방지)
// 그래서 nodejs 타입의 정의가 되어있는 내용을 가지고있는 패키지 설치 @types/node
// ---------------------------------------------------
// npm install ts-node @types/node
// ---------------------------------------------------
// ts-node 실행
// npx ts-node 파일 경로
