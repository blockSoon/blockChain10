// 상품의 결제 및 가격 및 정보를 정의한 클래스

// 상품의 객체의 구조 정의
interface IProduct {
    name : string
    price : number
}

class Product {
    // 상품의 이름
    private name : string
    // 상품의 가격
    private price : number
    // 상품의 할인율
    private discountAmount : number
    constructor(name : string, price : number){
        this.name = name;
        this.price = price;
        this.discountAmount = 0;
    }

    getName() : string {
        return this.name;
    }

    getPrice() : number {
        return this.price - this.discountAmount
    }

    getProduct() : IProduct {
        return {name : this.name, price : this.getPrice()}
    }

    // 상품의 할인가를 조정
    setDiscountAmount (amount : number) : void {
        this.discountAmount = amount
    }
}


const product = new Product("비트코인", 1000);
console.log(product.getProduct());
product.setDiscountAmount(200);
console.log(product.getProduct());

// 전략패턴
// 클래스가 가지는 역활이 명확하게 정해져있다 기능 단위

// 1. 할인 
// 2. 퍼센트할인
// 3. 특가할인