// 리듀서 함수
// 전역상태 초기값
// init
const init = {
  count: 0,
  user: {
    uid: "",
    upw: "",
    age: 0,
    name: "",
  },
  isLogin: false,
};

// 메뉴판
// state 값이 있으면 전달한 값으로 호출 하는거고
// state 값이 없으면 init을 전달
// store에 init의 초기값을 상태로 가지게 된다. 초기에
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  // 새로운 객체를 만들어서 return해줘야 상태가 변한지 알아듣는다.
  switch (type) {
    case "김치볶음밥":
      return { ...state, count: state.count + payload.count, isLogin: true };
    case "계란볶음밥":
      return { ...state, count: state.count - payload.count, isLogin: false };
    default:
      return state;
  }
};
