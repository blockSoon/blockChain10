// typescript를 사용하면서 제일 많이 작성하게될 문법

// 토이 블록체인을 배울때 블록을 객체로 정의 한다고 가정하고
// 블록에 객체의 내용을 정의 형태를 정의 하고 class에 상속해서 사용

interface IBlock {
    id : number
    title : string
    content : string
    date : number
    like : number
    // 객체의 구조에서 hit값은 있을수도 없을수도 있다 라고 정의 하고싶을경우
    hit?: number
}

// Block 객체를 선언할때 이 객체의 형태가 구조가 IBlock
// 타입정의했던 구문처럼 작성을 하면된다
// 변수명 : 타입 = 초기값
// Block : IBlock = {}
const Block : IBlock = {
    id : 0,
    title : "",
    content : "",
    date : 1,
    like : 0,
    hit : 0
}

const Block2 : IBlock = {
    id : 0,
    title : "",
    content : "",
    date : 1,
    like : 1
}

// BlockClass가 IBlock의 객체의 형태 구조를 가지게 하고싶다.
class BlockClass1 {

}

// 부모클래스를 상속 받았을 경우 동적할당했을때 객체에는 부모클래스의 내용과 자식클래스의 내용 포함된 객체가 생성
class BlockClass extends BlockClass1{

}

// 클래스에 객체의 구조 형태만 상속을 받아서 사용하고싶은 경우
// implements 객체의 구조 형태만 상속을 받아서 사용
class BlockClass3 implements IBlock {
    id: number = 1
    content: string = ""
    date: number = 1
    like: number = 1
    title: string = ""
}

const a = new BlockClass3();

const fn = (a : IBlock) =>{

}