// 자바스크립트에서 변수를 선언하던 방식과 타입스크립트에서 타입 정의 변수 선언하는 방식
let num = 20;
const str = "javascript";
const nan = NaN;
const infinity = Infinity;
const bool = true;
const nullValue = null;
const undefinedValue = undefined;

const obj = {};
const arr = [];

// const fn = (a) => {
//     console.log(a);
// }

// const sum = (a,b) =>{
//     return a+b;
// }

const any = "";
const unknown = "";

// typescript 문법

// 변수명 : 타입 = 초기값
let num2 : number = 20;
const str2 : string = "typescript";
const nan2 : number = NaN;
const infinity2 : number = infinity;
const bool2 : boolean = true;
const nullValue2 : null = null;
const undefinedValue2 : undefined = undefined;

const obj2 : object = {};
// 제네릭 문법 요소가 어떤 타입을 가질지
// 이 배열은 어떤 타입을 가지고 있는 요소들이 포함 될건지.
// 숫자 타입을 가지고있는 요소들을 담을수 있는 배열
const arr2 : Array<number> = [1,2];
// 두가지 이상의 타입이 들어갈경우에 어떻게 해야하지?..
const arr3 : Array<number | string> = [1,"2"];

// typescript의 함수
// 이 함수에서 사용하는 매개변수의 타입정의가 필요하고 반환되는 값의 타입도 지정해야한다. 지정하지 않으면 디폴트로 void
const fn2 = (a:number) : void =>{
    console.log(a);
}

const sum2 = (a : number, b : number) : number => {
    return a + b;
}

// any : 타입은 어떤 타입이든 할당이 가능하다.
// any 타입을 남발하면 typescript 왜씀?
// any라는 타입이 있구나 라고 알고있고 최대한 사용을 하면 안된다.
const any2 : any = "";
console.log(any2.length);

// unknown 타입은 어떤 타입이든 할당이 가능하다.
// 어떤 타입이든 할당이 가능한데 타입의 안전성을 보장 검증 조건이 필요하다.

const unknown2 : unknown = "";

if(typeof unknown2 === "string")
console.log(unknown2.length);