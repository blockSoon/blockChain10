# babel

# webpack

## babel

    - 자바스크립트 코드를 변환을 도와준다.
    - 자바스크립트를 컴파일 해준다.

    - 자바스크립트 문법이 진화를 꾸준히 했고
    - ES5 -> ES6 문법이 개발되고
    - ES6문법이 개발이 되었는데 ES5에서 개발한것들을 모두 우리가 변환을 하기에는 무리가있어서
    - babel을 사용해서 문법을 쉽게 변환해서 사용한다.

## 모듈 시스템

### commonjs

```javascript
// a.js
const text = "하이";
const text2 = "하이2";
module.exports = { text, text2 };

// b.js

const { text, text2 } = require("a.js");
```

### ES6

```javascript
// a.js
const text = "하이";
const text2 = "하이2";
export { text, text2 }; // 여러개의 데이터를 내보내야하는경우.
export default text; // 단일의 데이터를 내보내는 경우.

// b.js
import { text, text2 } from "a.js";
import myText from "a.js";
```

### babel의 기본 사용법

    - babel은 기본적으로 자바스크립트로 구성 되어있다.
    - npm으로 설치해서 사용

```sh
    npm install @babel/core @babel/cli @babel/preset-env
```

### babel 환경 구성

### .babelrc 생성

### 설정 값 작성

```json
{
  "presets": ["@babel/preset-env"]
}
```

### babel 실행

```sh
npx babel ["변환할 파일경로"] --out-file ["내보내는 파일명과 경로"]
npx babel app.js --out-file dist/app.js
```

### babel 모듈 시스템 변환 ES5

```sh
npm install @babel/core @babel/cli @babel/plugin-transform-modules-commonjs
npx babel server.js --out-file dist/server.js
```

### JSX 문법 변환

```sh
npm install @babel/core @babel/cli @babel/preset-env @babel/preset-react
npx babel app.js --out-file dist/app.js
```

# webpack

## 모듈 번들러

- 웹을 구성할때 다양한 파일과 기능을 우리가 작성하면 파일들과 기능들을 가지고 웹페이지를 그리는데 필요한 최소한의 파일만 가지고 컴파일 해준다.(웹페이지의 로딩속도를 개선)

- 모듈 : 프로그렘을 구성하는데 구성요소, 사용하는 데이터들와 함수를 하나로 묶은 단위
- 번들러 : 의존성이 있는 모듈 코드들을 파일로 만들어주는 도구 예) 컨트롤러가 여러개 파일들을 하나로 묶어주는 역활 이라고 보면 된다.

- 쉽게 node 환겨에서 실행이 되는데 파일을 뽑아주는 역활
- 뽑아주는 파일은 우리가 작성한 코드들을 하나로 통합 뭉쳐주는 역활을 하는 도구

## webpack의 속성

1. entry : 진입점을 지정, 시작점으로 사용할 모듈을 webpack에 알려줌.
2. output : 내보내는 번들링 방법을 결정. 생성한 번들링 파일 위치, 파일의 이름
3. loaders : 번들링 중에 모듈의 소스 코드에 적용되는 자바스크립트나 css 이미지 파일을 처리
4. plugins : 추가로 사용할 플러그인들 번들 최적화, html파일 생성, 환경번수 사용 등등

## webpack 실행

```sh
    npm install webpack webpack-cli
    npx webpack
```

## style 설정

```sh
    npm install webpack webpack-cli css-loader style-loader
```

## plugin 설정

```sh
    npm install webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin react react-dom
```

### react 설치 명령어

```sh
npx create-react-app "설치하는 폴더 이름"
```
