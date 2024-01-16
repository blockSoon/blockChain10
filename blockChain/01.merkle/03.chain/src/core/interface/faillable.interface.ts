// 결과의 내용을 포함할 객체 모양 정의

// 결과를 반환하는데 성공
// 제네릭 문법으로 어떤 타입이 정의될지 동적으로 설정
export interface Result<R> {
    isError : false;
    value : R;
} 

// 타입을 매개변수처럼 전달이 가능하다
// Result<string>
// {isError : false, value : "원하는 문자열"};
// 선언 당시에 타입을 지정할수있는 장점

// 결과를 반환하는데 실패
// 제네릭 문법으로 어떤 타입이 정의될지 동적으로 설정
export interface Faillure<E> {
    isError : true;
    value : E;
}

export type Faillable<R, E> = Result<R> | Faillure<E>;