// 할인 함수를 가지고있는 객체의 형태 정의

interface Discount {
    // 할인 로직을 가지고있는 함수
    getDisCountPrice(price : number) : number
}

// 가격을 받아서 상품의 가격에서 가격을 빼주는 로직을 담당하는 클래스
class FlatDisCount implements Discount {
    private amount : number
    constructor(amount : number){
        this.amount = amount;
    }

    getDisCountPrice(price: number): number {
        return price - this.amount
    }
}

// 할인율로 가격 수정하는 로직을 담당하는 클래스
class PercentDisCount implements Discount {
    private amount : number
    constructor(amount : number){
        this.amount = amount
    }

    getDisCountPrice(price: number): number {
        return price * (1 - this.amount / 100)
    }
}

// 이벤트라서 할인 기능을 하나더 추가할수 없을까
// 가격을 깍고 할인율도 깍아서 가격 반환 로직 담당하는 클래스
class FlatPercentDisCount implements Discount {
    private flatAmount : number
    private percent : number
    constructor (flatAmount : number, percent : number){
        this.flatAmount = flatAmount;
        this.percent = percent
    }

    getDisCountPrice(price: number): number {
        const flatDisCountAmount = price - this.flatAmount;
        return flatDisCountAmount * (1 - this.percent / 100);
    }
}

// 상품의 클래스
class Product2 {
    private name : string
    private price : number
    constructor (name : string, price : number){
        this.name = name;
        this.price = price;
    }

    getName() : string {
        return this.name
    }

    getPrice() : number {
        return this.price
    }
}

// 상품 할인 서비스 로직을 담당하는 클래스
class ProductDisCount {
    private product : Product2
    private discount : Discount
    constructor(product : Product2, discount : Discount){
        this.product = product
        this.discount = discount
    }

    getPrice() : void {
        console.log(this.discount.getDisCountPrice(this.product.getPrice()))
    }
}

const _product = new Product2("비트코인" , 100000);
const _product2 = new Product2("이더리움", 20000);

const productDisCount = new FlatDisCount(10000);
const productDisCountPercent = new PercentDisCount(10);
const productDisCountFlatPercent = new FlatPercentDisCount(10000, 10);

const productServeice = new ProductDisCount(_product, productDisCountPercent);
productServeice.getPrice();

const productServeice2 = new ProductDisCount(_product2, productDisCount);
productServeice2.getPrice();

const productServeice3 = new ProductDisCount(_product2, productDisCountFlatPercent);
productServeice3.getPrice();