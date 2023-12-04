# react custom hook

# react children props

# react hook

    - react useMemo
    - react useContext
    - react useCallback
    - react useReducer

# react custom hook

- react로 개발을 할때 자주 사용하는 기능을 hook으로 작성해서 정리 해놓고 재사용성을 높히자.

# react useMemo

- useMemo 리액트의 컴포넌트의 성능을 최적화 시키자.
- 메모이제이션 Memo가 뜻하는것. 동일한 연산을 반복해야할 경우 이전에 연산한 값을 메모리에 저장해놓고 동일한 연산이 반복되면 연산을 다시 하지않고 값을 참조하는 내용.

- 부모 컴포넌트가 리렌더링되면 자식 컴포넌트들이 모두 리렌더링이 되어버려서... ㅠ

- 불필요한 연산을 줄이자. 부모만 상태변수가 변했으면 자식이 리렌더링 될 필요가 없다.
- 게시판을 예) 아이템이 100개의 컴포넌트

# react useContext

- 공식문서에서도 context를 사용하면 props를 전달 하지 않아도 된다. 전역상태 변수를 사용할수있다.

- 전역 상태
- 부모 -> 자식 -> 자식 -> 자식
- 객체인데 참조를 부모에서 주입시켜준 자식들을 어디서든 접근이 가능하다 편하게 사용가능
- createCountext로 context 객체를 만들고
- Provider : context 객체를 하위 자식 컴포넌트들에게 값을 전달해주는 역활을 한다.

# react useReducer

- useState를 대체할수있는 hook 함수
- 여러개의 상태를 구분지어서 사용하기가 편하다. 가독성도 업!
- 비동기처리도 가독성이 좋다.

1. state
   - 사용할 상태
2. dispatch
   - reducer 함수 (메뉴판) 실행시킨다. (전달한 문자열을 보고 어떤 메뉴시켰니?)
   - 현재 state, action 객체를 받아서 action 객체의 내용은 전달할 매개변수 상태를 업데이트할때 실행시킨다.
3. initialState
   - 초기값을 전달(object 객체)

- reducer는 이전의 상태와 action객체의 내용을 합쳐서 {...state, {id : action.payload.id}}
- useState를 사용할때보다 더 복잡한 프로세스를 가독성이 좋게 처리할수있다.

```js
// type : 어떤 case 문을 실행시킬건지.
// payload : 상태를 업데이트할때 필요한 매개변수를 객체로 전달하고
<button onClick={() => dispatch({ type: "김치볶음밥", payload })} />
```

# useReducer 가게 모양만 틀을 잡아놓고 reducer 함수를 만들어서 전달 (매뉴판) dispatch 함수 (손님이 주문을 넣음)

```js
const reducer = (state, action) => {
  // state : 현재 상태를 매개변수로 받고
  // action = { type: "김치볶음밥", payload };
  // 상태가 전환된다는 얘기는 새로운 주소가 들어왔을때
  // 값만 변했다고 이게 변한거임? 얘는 바보다.
  // 주소가 다른 새로운 객체를 반환해야 상태가 변했다고 알아들음.
  const { type, payload } = action;
  switch (type) {
    case "김치볶음밥":
      return { id: state.id + payload.id };
    default : {...state};
  }
};
```
