# 오늘의 내용은

1. 타입스크립트을 사용하는 이유
2. 타입스크립트 문법
3. 타입스크립트 node 런타임환경 실행
4. 타입스크립트 tsconfig 설정
5. 타입스크립트 빌드

# typescript란

## javascript 에서 타입의 정의가 추가된 언어

- 우리가 typescript를 사용하는 이유
- javascript가 있는데? 왜 굳이 typescript를 사용해야하나...

# javascript vs typescript

- javascript는 무척 편하고 심플한 언어였다(타입의 제한이 없고 편하게 개발에 사용가능한 코드를 작성) 웹개발을 할때 무척 많이 사용했고 심지어 nodejs에서도 사용이되는 언어

- 하지만... javascript는 작업을 할때 모호함을 예측할수 없는 오류가 발생하는 경우가 번번 했고 대규모 프로젝트를 작업을 하면서 코드의량이 증가하여 이런 번번히 발생하는 오류를 실행 환경에서 찾기에는 무리가 있다... 팀원들이 코드를 수정할때 고생하는 번거로움을 줄이기 위해서

# typescript는 javascript의 확장된 언어

- typescript는 javascript의 상위 집합 슈퍼셋(상위 확장)으로서 대형 프로젝트를 진행할때 어느정도 오류를 잡는데 도움을 준다.

# c++, c# 등 객체지향 프로그래밍을 지원해준다

- typescript는 객체지향 프로그래밍에 특화된 언어이다.
- 클래스
- 상속
- 캡슐화
- 다형성
- 추상화

# 추상화 현실에 있는 내용을 바탕으로 프로그래밍에서 쉽게 다룰 수 있도록 만들어 보는것.

- 추상 클래스와 인터페이스를 통해 구현을 한다.

```js
// 닭이라는 객체가 하나 있다고 가정하고
// 닭--추상화-->새--추상화-->동물--추상화-->생물

class 생물 {
  state = () => console.log("살아있다");
}

class 동물 extends 생물 {
  move = () => console.log("움직인다");
}

class 새 extends 동물 {
  wing = () => console.log("날개가 있음");
}

class 닭 extends 새 {
  sing = () => console.log("운다 꼭꼭꼭");
}
class 비둘기 extends 새 {}
class 참새 extends 새 {}

const 황금올리브 = new 닭();
황금올리브{
    state = () => console.log("살아있다");
    move = () => console.log("움직인다");
    wing = () => console.log("날개가 있음");
    sing = () => console.log("운다 꼭꼭꼭");
}
```

- 추상이라는 것은 구체적인 실제의 것에서 생각 시작 -> 불필요한 요소를 X(제거)

- 추상화라는것은 특징 분석해서 핵심의 요소를 가지고 구조화를 시키시는것.
- 하지만 점점 추상화가 될수록 위에서 볼때 닭의 특징이 점점 사라지는게 보일수 있는데.
- 과한 추상화는 독이 될수 있다. (가독성이 떨어진다..)

- 프로그래밍적으로 추상화 개념을 사용하는 이유
- 유지보수 및 개발 속도 향상
- 개발할때 필요한 객체의 내용을 추상화 클래스로 정의를 해서 상위 요소부터 개발을 한다.
- 하위 요소들에게 추상화한 상위 요소를 상속

# typescript를 사용해서 타입 검사와 추론의 기능을 사용해보자

- typescript를 우리가 지금 배우는 이유는 이후에 토이 블록체인을 배울건데 typescript사용해서 진행해보려고 합니다.
- javascript로도 가능은 하지만.. 토이 블록체인이라도 코드량이 많아져서 작업을 할때 예측할수 없는 오류를 방지하고자 배우는 내용
- 마침 취업시장에서도 typescript가 우대사항에 포함되는 겸사겸사 같이 수업을 진행할 예정

# typescript는 런타임 환경이 없다..

- 컴파일 언어 컴파일러가 존재
- typescript => javascript

## 가이드

- javascript는 타입이 정해져있지 않고 자동완성이 미리 뜨지않아서 어떤 내용이 포함되어야하는 객체인지 모름.. 일일히 확인하면서 타이핑을 해야함.
- typescript로 작업을 할때 경로 변수처럼 별칭을 정해서 사용을 할수 있다.
- typescript로 작성한 코드는 브라우저에서 해석할 수 있는 javascript 코드로 변환을 해서 사용(컴파일)

# typescript 설치

```sh
# 개발 단계에서 사용할거니까
# -D => --save-dev
npm install -D typescript

# 설치가 잘되었는지 버전 확인
npx tsc --version
```

# 초기 세팅이 중요!

- 설정 파일이 있다는 것.
- tsconfig.json

```sh
# tsconfig.json 생성 명령어
npx tsc --init
```

// 2024.01.05

1. javascript에서 타입정의 없이 선언 => typescript문법으로 작성 === 자료형

2. typescript interface 정의

3. auth 로그인 로직 타입스크립트 클래스 문법으로 작성

4. 간단한 상품 구매 할때 로직 클래스 문법으로 작성
