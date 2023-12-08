# redux

- props 드릴링을 해소하기 위해

- 스토어, 액션, 리듀서

- flux

```sh
npm install redux react-redux
```

```sh
npm i styled-components
```

# react 전역 상태 관리

- react 전역 상태 관리로 redux의 사용자가 많았고
- 거의 사용을 안하는 추세..
- 최근에는 recoil을 사용한다.

# react recoil의 장점

- react 라이브러리를 개발한 MEAT에서 만든 라이브러리
- hook사용했던 개발자들이 진입하기가 쉬웠다.

# 상태 관리(one way data binding)

- react는 단방향성 바인딩을 하는 라이브러리
- 부모 -> 자식 state를 전달하고 props
- 자식 -> 부모 불가능 ㅠㅠ..

# 상태를 끌어올려서

- 1. 부모의 상태를 변경할수있는 setState 메서드를 자식에게 props로 전달해서 변경을 했다.
- 2. 이런 경우 상태를 관리하기 너무 힘들었고 그래서 전역상태를 사용하게 되었다.(redux, recoil)

# redux는 flux 아키택처를 따라간 구현체

redux : 스토어 생성 -> 리듀서 생성 -> 액션 설정 -> 디스패치(액션) 호출

- 하지만 하나의 상태를 관리해도 많은 코드가 필요했다 action과 reducer의 코드들을 작성해야하고(보일러플레이트 코드가 길어지는 단점)

# recoil 출시

recoil : 스토어 생성 -> 호출

- redux의 내용을 단시간에 배우기엔 복잡도가 높아서 어려움이 있었고 사용의 만족도도 많이 낮았다.
- hook을 경험해본 react 개발자들은 전역 state의 개념만 가지고 있다면 사용성에 어려움이 많이없다.
- hook 메서드를 사용해서 상태를 관리하기 때문에 간결하고 직관적인 코드를 작성할수 있다.
- 별도의 라이브러리 필요없이 비동기 처리가 가능

```sh
npm install recoil
```

# recoil 사용방법

- recoil의 루트를 설정 부모컴포넌트를 RecoilRoot의 자식으로 작성

```javascript
import { RecoilRoot } from "recoil";
import { Login } from "./page/Login";
const App = () => {
  return (
    <RecoilRoot>
      <Login />
    </RecoilRoot>
  );
};
```

# Recoil Atom

- Atom은 state 루트 컴포넌트의 모든 자식 컴포넌트에서 상태를 참조하고 업데이트할수 있다.
- redux에서 사용했던 store와 유사한 개념의 상태의 단위
- atom의 상태가 변경되면 atom을 참조하고 있던 컴포넌트들은 리렌더링 된다.
- 고유한 id인 key로 구분된다.

```javascript
import { atom } from "recoil";

// 스토어 생성
export const contentState = atom({
  key: "content", // 고유 식별자 이름
  default: {
    // default 초기 상태 값
    name: "test",
    status: "테스트중",
    message: "테스트 메시지",
    pageIndex: 0,
  },
});
```

# recoil 전역 상태 호출

```javascript
import { useRecoilState } from "recoil";
import { contentState } from "./recoil/atom";
const Login = () => {
  // useRecoilState hook 전역상태중 어떤 스토어를 호출할건지 매개변수로 전달.
  const [content, setContent] = useRecoilState(contentState);
  const contentHandler = () => {
    setContent({ ...content, status: "테스트 끝" });
  };
  return (
    <>
      {content.name}
      {content.status}
      {content.message}
    </>
  );
};
```

# recoil Selector

- recoil에서 파생된 상태의 계산을 위해 사용
- 하나 이상의 Atom의 값으로 새로운 값을 연산할때 전역상태로 호출해야할경우

```javascript
export const pagination = selector({
  key: "pagination", // 고유 식별자 이름
  // selector
  // 다른 스토어에있는 상태가 변경되면 값을 업데이트 해주자
  // hook으로 전역 상태를 호출한 경우 pagination을 호출한 경우
  // {} 객체를 매개변수로 받을수 있고 {get, set}
  get: ({ get }) => {
    // 다른 atom에 있는 상태를 호출해준다 get
    const { pageIndex } = get(contentState);
    const { data } = axios.get(`/post/list/${pageIndex}`);
    // data.list 반환한 값이 전역 상태로 유지된다.
    return data.list;
  },

  set: ({ set }, newState) => {
    // set 전역 상태를 업데이트 해주는 메서드
    // contentState 값을 변경해줄때
    set(contentState, newState);
  },
});
```

# useRecoilvalue

- Recoil의 상태의 값을 반환한다.
- value 값이 필요할때 사용하는 hook
  (읽기 전용)

# useSetRecoilState

- Recoil의 상태의 값을 업데이트 하기위해 사용
- set메서드가 필요한 경우 사용하는 hook
  (쓰기 전용)

# useRecoilState

- value set메서드 둘다 필요한 경우
  (읽기 쓰기 가능)

# useResetRecoilState

- atom이나 selector의 값을 초기화 하고싶을때
- 예 ) 설문지 조사 입력 폼을 창을 껐다가 켰을때 유지를 안시키고싶으면 초기화시키고 싶으면
  (초기화 전용)

# useRecoilStateLoadable

- 배열로 인자를 받고 첫번째 값을 호출하는 인자
- 두번째 값을 요청하는 인자
- set, get 메서드 호출
- 비동기 처리 함수인 경우에 loadable 객체를 반환 [{상태, 값}] 성공, 로딩, 실패
  (값을 읽기 쓰기)

# useRecoilValueLoadable

- get 메서드 호출
- 비동기 처리 할때 값만 호출할 경우 객체를 반환 [{상태, 값}] 성공, 로딩, 실패
  (읽기 전용)

# React 비동기처리

```javascript
import { Suspense } from "react";
import { Login } from "./page/Login";
const App = () => {
  return (
    <RecoilRoot>
      fallback 로딩중일 경우 전달한 props의 컴포넌트 혹은 태그 같은 로딩중일때 보여주고 싶은 내용을 전달
      <Suspense fallback={<div>로딩중 일때</div>}>
        chilren으로 전달한 컴포넌트가 비동기처리가 끝나면 반환해준다.
        <Login />
      </Suspense>
    </RecoilRoot>
  );
};
```

# Recoil의 Loadable

```javascript
export const Login = selector({
  key: "Login", // 고유 식별자 이름
  // selector
  // 다른 스토어에있는 상태가 변경되면 값을 업데이트 해주자
  // hook으로 전역 상태를 호출한 경우 pagination을 호출한 경우
  // {} 객체를 매개변수로 받을수 있고 {get, set}
  get: async ({ get }) => {
    // 다른 atom에 있는 상태를 호출해준다 get
    const { pageIndex } = get(contentState);
    const { data } = axios.get(`/post/list/${pageIndex}`);
    // data.list 반환한 값이 전역 상태로 유지된다.
    return data.list;
  },
});

import { useRecoilValueLoadable } from "recoil";
const App = () => {
  const UserState = () => {
    const loadable = useRecoilValueLoadable(Login);
    // 최초에 응답을 받지 못한경우 loadable 로딩 상태가 반환된다.
    // 상태의 값은 hasValue, loading, hasError
    switch (loadable[0].state) {
      case "hasValue":
        return <div>성공</div>;
      case "loading" :
        return <div>로딩중</div>;
      case "hasError" :
        return <div>오류남<div>;
    }
  };
    return <>
        <UserState />
    </>
};
```
