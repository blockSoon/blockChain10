// 전역상태를 관리하는 인스턴스 생성
// store 전역상태 관리 인스턴스

import { createStore } from "redux";
import { reducer } from "../reducer";

// store 인스턴스 생성
// createStore메서드의 첫번째 매개변수로 reducer함수를 작성해서 전달.
// 가게 만듬

export const store = createStore(reducer);
