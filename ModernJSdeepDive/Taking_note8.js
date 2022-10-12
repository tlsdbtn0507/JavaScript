//
//15 let, const 키워드와 블록 레벨 스코프
//

//15-1 var 키워드로 선언한 변수의 문제점
//1.변수 중복 선언 허용: var의 변수 중복 허용은 의도치 않은 오류를 발생시킴
//2.함수 레벨 스코프: var로 생성된 변수는 무조건 함수의 코드블록만을 지역 스코프로 인정해서 if같은 다른 코드블록에 선언해도 모두 전역변수가 된다
//3.변수 호이스팅: var로 생성된 변수는 변수 호이스팅에 의해 변수 선언문이 스코프 선두로 끌어 올려진듯 동작해서 선언문 이전에 참조 할수 있다

//15-2 let 키워드

//15-2-1 변수 중복선언 금지
//let은 이름이 같은 변수를 중복 선언하면 문법에러가 발생한다

//15-2-2 블록 레벨 스코프
//let은 블록문{}로 된 모든 코드블록문을 지역스코프를 인정하고 레벨 스코프로 따른다

//15-2-3 변수 호이스팅
//let으로 선언된 변수는 선언과 초기화 단계가 분리되어 진행된다 만약 초기화 전에 변수에 접근하려하면 undefined가 뜨는 var와 달리 참조 에러가
//발생한다 let은 스코프 시작 지점 부터 초기화 단게 시작, 즉 변수 선언까지 변수를 참조 할 수 없고 이를 일시적 사각지대라고 한다
//이는 let이 변수 호이스팅이 없는것 처럼 보이지만 실제론 있다

//15-2-4 전역 객체와 let
//let으로 선언된 전역변수는 전역객체의 프로퍼티가 아니라 window.foo처럼 접근 할 수 없고
//let 전역 변수는 보이지 않는 개념적인 블록내에 존재하게 된다

//15-3 const

//15-3-1 선언과 초기화
//const로 선언한 변수는 반드시 선언과 동시에 초기화 된다
const foo = 1; //은 가능한데 const foo; 하면 오류가 난다

//또 const는 let과 마찬 가지로 블록레벨 스코프를 따르고 변수 호이스팅을 거치지 않는 것처럼 보인다

//15-3-2 재할당 금지
//var let과 달리 const는 재할당이 안된다

//15-3-3 상수
//변수의 상대 개념인 상수는 재할당이 금지된 변수를 뜻하므로 상태유지와 가독성, 유지보수의 편의를 위해 적극적으로 쓰자

let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + preTaxPrice * 0.1;
console.log(afterTaxPrice);
//이렇게 쓰면 0.1이 어떤의미로 쓰인건지 명확히 알기가 어려워서 가독성이 좋지 않다
// 0.1을 고정으로 쓸것이기에 변경 할수 없고 재할당이 안되는 const에 넣어야 좋다

const TaxRate = 0.1; // const변수를 상수로 쓰려면 이름을 전부 대문자로 하고 스네이크 케이스를 쓰는 게 좋다 TAX_RATE
preTaxPrice = 100;
afterTaxPrice = preTaxPrice + preTaxPrice * TaxRate;
console.log(afterTaxPrice);

//15-3-4 const 키워드와 객체
//원래 const는 재할당이나 변경이 안되지만 객체를 선언했다면 값을 변경할 수 있따
const person = {
  name: "lee",
};
person.name = "kim";
console.log(person); //=> {name:"kim"}
//이처럼 const는 재할당을 금지 할 뿐 불변은 아니다

//15-4 var let const
//*ES6를 쓴다면 var는 쓰지 말자
//*재할당이 필요할 경우를 한정해 let을 쓰고 쓸 때 변수의 스코프는 최대한 작게 만들자
//*변경이 없고 읽기 전용일 원시 값과 객체는 const를 쓰자 이는 let var보다 안전하다

//
//16 프로퍼티 어트리뷰트
//

//16-1 내부슬롯과 내부 메서드
//ECMAScript 사양에 등장하는 이중 대괄호([[...]])로 감싸진 이름들이 내부 슬롯과 내부 메서드이다
//이는 개발자가 직접 접근 할 수 있는 객체의 프로퍼티가 아니고 JS엔진의 내부 로직이므로 원칙적으론 내부 슬롯과 내부 메서드에
//직접적으로 접근하거나 호출할 수 있는 방법을 제공하진 않는다

//16-2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
//JS엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다
//그 상태에는 값, 값 갱신 가능여부, 열거 가능 여부, 재정의 기능여부가 있다

//16-3 데이터 프로퍼티와 접근자 프로퍼티
//데이터 프로퍼티: 키와 값으로 구서오딘 일반적인 프로퍼티. 지금 까지 본 모든 프로퍼티가 데이터 프로퍼티이다
//접근자 프로퍼티: 접근자 프로퍼티 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때
//                호출되는 접근자 함수로 구성된 프로퍼티

//16-3-1 데이터 프러퍼티
// 프러퍼티 어트리뷰트/프로퍼티 디스크립터 객체의 프로퍼티
// [[Value]] / value : 프로퍼티 기를 통해 값에 전근하면 반환되는 값. 변경하면 [[Value]]에 재할당
// [[Writable]] / writable : 프로퍼티값의 변경 가능여부로 불리언값 이게 false면 해당 프로퍼티의 [[Value]]는 읽기전용 프로퍼티가 됨
// [[Enumerable]] / Enumerable : 프로퍼티의 열거기능 여부로 불리언값 이게 false면 해당 프로퍼티는 for 나 특정 메서드로 열거 불가
// [[Configurable]] / Configurable : 프로퍼티의 개정의 가능여부로 불리언 값 이게 false면 해당 프로퍼티의 삭제 값 변경 불가
//                                   단, [[Writable]]가 true면 [[Value]]의 변경과 [[Writable]]을 false로 바꿀 수 있음

//16-3-2 접근자 프러퍼티
// 프러퍼티 어트리뷰트/프로퍼티 디스크립터 객체의 프로퍼티
// [[Get]] / get : 접근자 프로퍼티를 통해 데.프의 값을 읽을 떄 호출되는 접근자 함수
// [[Set]] / set : 접.프를 통해 데.프의 값을 저장할 때 호출되는 접근자 함수
// [[Enumerable]] / Enumerable : 데.프의 [[Enumerable]]와 같다
// [[Configurable]] / Configurable : 데.프의 [[Configurable]]와 같다

//*프로토타입*: 프로토 타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속
//상속받은 하위 객체는 상속받은 걸 자신의 것 처럼 자유롭게 쓸 수 있다

//*프로토타입 체인*: 프로토 타입이 단방향 링크드 리스트 형태로 연결된 상속 구조 객채의 프로퍼티나 메서드가 접근 할때
// 해당 객체에 접근하려는 프로퍼티 혹은 메서드가 없으면 체인을 따라 프로토 타입의 프로퍼ㅣ나 메서드를 사례대로 검색함

//16-4 객체 변경 방지
//16-4-1 객체 확장 금지: Object.preventExtesions로 객체의 확장을 금치하고 이는 프로퍼티 추가가 금지됨을 의미 이는 읽기와 쓰기만 가능
//16-4-2 객체 밀봉: Object.seal로 객체를 밀봉함 이는 프로퍼티 추가 및 삭제와 어트리뷰트 재정의 금지로 읽기와쓰기만 가능
//16-4-3 객체 동결: Object.freeze로 객체를 동결 이는 객체 밀봉에서 프로퍼티 값 갱신 금지를 더하고 읽기만 가능하다
//16-4-4 불변 객체: 위 메서드들은 얕은 변경방지로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지 않는다

//
//17 생성자 함수에 의한 객체 생성
//

//다양한 객체 생성 방식 중 생성자 함수를 사용해 객체를 생성하는 방법이 있다
//17-1 Object생성자 함수
//new연산자와 함계 object 생성자 함수를 호출하면 빈 객체를 생성한다 그후 프로퍼티 혹은 메서드를 추가해서 객체를 완성할 수 있다
//생성자 함수는 new연산자와 함깨 호출되 객체를 생성하는 함수고 생성자 함수에 의해 생성된 객체를 인스턴스라고 한다

//17-2 생성자 함수
//17-2-1 객체 리터럴에 의한 객체 생성방식의 문제점
//객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체를 생성해서 동일한 프로퍼티의 객체를 여러 개 생성할 경우 비효율적이다

//17-2-2 생성자 함수에 의한 객체 생성방식의 장점
//객체를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 쓰기 대문에 프로퍼티 구조가 동일한 객체 여러개를 간편하게 생성할 수 있다
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);
console.log(circle1.getDiameter(), circle2.getDiameter()); //=>10,20

//*this*: 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조변수 this바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
// 함수 호출 방식    /  this가 가리키는 값(바인딩)
// 일반 함수로 호출   전역객체
// 메서드로 호출      메서드를 호출한 객체(마침표 앞의 객체)
// 생성자 함수로 호출   생성자 함수가 나중에 생성할 인스턴스

//자바와 달리 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다
const circle3 = Circle(15);
console.log(circle3, radius); //=> undefined,15

//17-2-3 생성자 함수의 인스턴스 생성과정
//생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)로 동작하여 인스턴스를 생성하고
//생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것이다

//1. 인스턴스 생성과 this 바인딩 => 암묵적으로 빈객체가 생성되고 이는 생성자 함수가 만든 인스턴스이고 이 인스턴스는 this에 바인딩 된다
//*바인딩* 식별자와 값을 연결하는 과정
//2. 인스턴스 초기화 => 생성자 함수에 적힌 코드가 한 줄씩 실행 되어 this에 바인딩 된 인스턴스를 초기화 한다
//3. 인스턴스 반환 => 생성자 함수 내부의 모든 처리가 끝나면 바인딩된 this로 암묵적 변환한다
//                   만약 this가 아닌 다른 객체를 명시적 반환을 하면 this가 아닌 return문에 명시한 객체가 반환된다
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  return {};
}
const circle = new Circle(1);
console.log(circle); //=> {} 빈객체가 나옴 만약 return으로 100을 줬다면 Circle{radius:1,getDiameter:f}를 반환한다
//그러므로 꼭 생성자 함수 내부에선 리턴을 쓰지 말자

//17-2-4 내부 메서드[[call]]과 [[construct]]
//함수는 객체이지만 호출할 수 없는 일반 객체와 다르게 함수는 호출 할 수 있다 모든 함수 객체는 callable하지만 모든 함수 객체가 constructor는 아니다

//17-2-5 constructor와 non-constructor의 구분
//constructor: 함수 선언문, 표현식 혹은 클래스(클래스도 함수)
//non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수
//이는 함수가 어디에 할당됐는지가 아니라 정의 방식에 따라 구분되어 진다 일반 함수로 호출하면 [[call]]이 호출되고 new연산자로 생성자 함수를
//호출하면 내부 매서드는 [[construct]]을 호출한다

//17-2-6 new연산자
//일반, 생성자 함수와 특별한 형식적 차이는 없지만 new로 함수를 호출하면 해당 함수는 생성자 함수로 동작한다
//단 new 연산자로 호출한 함수는 [[construct]]이여야 한다
//반대로 new없이 생성자 함수를 호출하면 일반 함수로 호출되어 [[call]]이 호출된다

//17-2-7 new.target
//construct인 모든 함수 내부에서 암죽적인 지역변수와 같이 사용되고 메타 프로퍼티라고 불린다. 함수 내부에 new.target을 사용하면
//new로 생성자 함수를 호출했는지 확인 할 수 있다. new와 함께 생성자로 호출되면 함수 내부의 new.target은 자기 자신을 가리킨다 new없이
//일반 함수로서 호출된 함수 내부의 new.target은 undefined이다
function Circle(radius) {
  //이 함수가 new와 호출되지 않으면 new.target은 undefined이다
  if (!new.target) {
    //new와 생성자 함수를 재귀호출 하여 생성된 인스턴스 반환
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
//new 없어도 new.target을 통해 생성자 함수로서 호출
const circle4 = circle(4);
console.log(circle.getDiameter());

//참고로 대부분의 빌트인 생성자 함수는 new와 호출되었는지 확인후 적절한 값을 반환한다

//
//18함수와 일급객체
//

//18-1일급객체
//일급 객체는 무명의 리터럴로 생성 즉런타임에 생성 가능하고
const increase = function (num) {
  return ++num;
};
//변수나 자료구조(객체, 배열등)에 저장 할 수 있고
const decrease = function (num) {
  return --num;
};

const auxs = { increase, decrease };

//함수의 반환값으로 사용할 수 있다
function makeCounter(aux) {
  let num = 0;
  return function () {
    num = aux(num);
    return num;
  };
}
//함수의 매개변수에 전달 될 수 있으며
const increaser = makeCounter(auxs.increase);
console.log(increaser()); //=>1
console.log(increaser()); //=>2

const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); //=>-1
console.log(decreaser()); //=>-2

//18-2 함수 객체의 프로퍼티
//함수는 객체라서 프로퍼티를 가질 수 있고 이는 console.dir로 확인이 가능하고 내부를 볼수 있다

//18-2-1 arguments프로퍼티
//함수 객체의 arguments프로퍼티 값은 arguments객체이다 이는 함수 호출시 전달된 인수들의 정보를 담은 순회 가능한 유사배열 객체이며
//함수 내부에선 지역 변수처럼 사용해서 외부에서 참조할 수 없다
//arguments객체는 인수를 프로퍼티 값으로 소유하고 프로퍼티 키는 인수의 순서를 나타낸다 그리고 매개변수 개수를
//확정할 수 없는 가변 인자 함수를 구현할 때 유용하다

//유사배열 객체는 배열이 아니여서 배열 메서드를 사용하면 에러가 발생한다 그래서 배열메서드를 쓰려면 간접 호출을 해야하는
//번거로움이 생기는데 이를 해결하는데 rest파라미터가 생겼다

function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 3)); //=>3
console.log(sum(1, 2, 3, 4, 5)); //=>15

//18-2-2 length 프로퍼티
//이는 함수의 매개변수 개수를 가리킨다

//18-2-3 name 프로퍼티
// ES5와 ES6에서 동작이 다른데 익명함수 표현식의 경우 ES5엣 name프로퍼티는 빈 문자열을 값으로 갖지만
//ES6에서 name는 함수 객체를 가리키는 식별자를 값으로 갖는다
