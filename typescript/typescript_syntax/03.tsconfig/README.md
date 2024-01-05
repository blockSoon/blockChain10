# tsconfig.json

- compileOptions : typescript 파일을 컴파일 할때 어떤 형태로 컴파일을 진행할지
- include : 컴파일을 진행할 대상지정
- exclude : 컴파일에서 제외할 대상 지정

# tsconfig.json 파일 내용 예시

```json
{
  "compileOptions": {
    "outDir": "./dist"
  },

  "include": ["src/*"], // 경로 패턴
  "exclude": ["**/*.test.ts"] // 경로 패턴 하위의 모든 폴더안에 파일 확장자명이 .test.ts인 모든 파일
}
```

# compileOptions

- module : 모듈 시스템 지정
- outDir : 내보낼 경로 지정
- target : 번들링 문법 지정 ex) es5, es6 ...
- esMoudleInterop : inport/export 문법을 바꾸는 행위 지정 ex ) true 기본적으로
  (CommonJS 형식과 ES6 형식의 혼용을 자연스럽게 통합을 해주는 역활)
- struct : true로 두자 엄격모드(공부)(타입스크립트를 개발이 되어있는 프로젝트에 도입을 한다하면 false로 주는게 좋다.)
- baseUrl : 모듈의 상대 경로를 기본값으로 설청 ./src
- paths : `baseUrl`로 지정한 경로를 기준으로 상대 위치를 가져오는 매핑값을 작성 (마치 경로를 변수처럼 사용할수 있다.) baseUrl == ./src 나는 경로가 너무 길어져서 /home/coponents/hooks/temp 너무 길어.. => 변수 처럼 쓰고 싶어
  /@temp 진짜 마치 변수처럼 사용할수 있게 해주는 속성

# 환경 구축

```sh
npm init -y
npm install -D typescript
npx tsc --init
```

# 별칭을 사용해서 컴파일을 진행하면 별칭이 그대로 컴파일 되기 때문에 경로의 문제가 생긴다

- 해결 방안 컴파일 당시에 실제 경로를 지정할수 있게 만들어줘야한다.

# tsc-alias 패키지를 설치 사용해서

- 컴파일 하고 실제의 경로를 지정할수 있게 작업 해줘야한다.

```sh
npm install -D tsc-alias
# 컴파일하면서 같이 패키지의 내용을 동작
"scripts" :
{
    "build" : "tsc && tsc-alias"
}
```
