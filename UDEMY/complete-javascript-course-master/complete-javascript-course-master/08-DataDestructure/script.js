'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    mon: {
      open: 12,
      close: 22,
    },
    tue: {
      open: 12,
      close: 22,
    },
    wed: {
      open: 12,
      close: 22,
    },
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
    sun: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function(firstIndex, secondIndex){
    return [this.starterMenu(firstIndex),this.mainMenu(secondIndex)];
  },
  whatOrdered: function (ind1,ind2,ind3,ind4){
    return `you have ordered ${ind1},${ind2},${ind3},and${ind4}`
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const {name, openingHours, categories} = restaurant
console.log(name, openingHours, categories);

const {name:restaurantName, openingHours:hours, categories:tag} = restaurant
console.log( 'rename Destructure', 'restaurantName:',restaurantName, 'hours:',hours, 'tag:',tag);

//미리 구조분해 할 객체의 이름에 디폴트값 선언 가능
const { menu = {}} = restaurant
console.log(menu)

//변수 변경 하는 법
let a = 111;
let b = 222;

const obj = {a:1,b:2};

({a,b} = obj);
console.log(a,b)

//중첩객체 구조분헤
const {fri:{open,close}} = restaurant.openingHours;
const {fri} = restaurant.openingHours;
console.log(fri)
console.log(open,close);

//spread operator
const arr = [4,5,6];
const newArr = [1,2,...arr]

console.log(newArr)

//copying array (swallow copy)
const menus = [...restaurant.mainMenu];
const allMenus = [...restaurant.starterMenu,...restaurant.mainMenu]

console.log(...allMenus)

//얇은 복사는 배열, 문자열, 맵, set이 가능하지만 객체는 안됨
const str = 'starbucks';
console.log(...str)
console.log(str.length)
for(let i = 0; i < str.length; i++){
  console.log(`all letters :${str[i]}`)
}

// const orders = [
//   prompt('order1'),
//   prompt('order2'),
//   prompt('order3'),
//   prompt('order4'),
// ]

// console.log(restaurant.whatOrdered(...orders))

// 객체 복사
const newRes = {...restaurant, founder:'shin', foundedIn:1997};
newRes.name = 'wow';

console.log(newRes.name === restaurant.name)
//name은 다른 str을 지정 해서 다르지만
console.log(newRes.location === restaurant.location)
//location은 따로 지정을 안했기에 true

//rest parameter(보통 함수의 parameter로 사용)
//rest는 spread와 다르게 ...을 =의 오른쪽에 써서 새로운 객체 나 배열에 담는 것
const { sat, sun, ...weekdays} = restaurant.openingHours;
console.log(weekdays, sat,sun)

//rest와 spread의 함수 사용 예제
const add =  function(...numbers){
  let sum = 0;
  for(let i = 0; i<numbers.length; i++) sum += numbers[i];
  console.log(sum);
}

const xArr = [1,2,3,4,5,6,7,8,9]
add(...xArr);

const gettingOrder = function(){
  const temps = prompt('welcome to my restaurant. how can i help you?');
  if(temps === null){
    alert('okay, bye');
    return
  } else if(temps === ''){
    gettingOrder();
  } else if(temps !=='') {
    getStarterOrder(restaurant.starterMenu)
  }
}

const getStarterOrder = function(...menus){
  const check = confirm(`we have startmenus like ${menus}. which one would you like?`)
  if(check){
    const orders = prompt('order1');
    getMainOrder(orders,restaurant.mainMenu)
  } else{
    alert('okay bye')
  }
}

const getMainOrder = function(prevOrder, ...menus){
  const check = confirm(`okay, you have ordered ${prevOrder} as starter, how about main?`);
  if(check){
    const order = [prompt(`we have ${menus} as main dish, what would you like?`)];
    lastCheck(order,prevOrder)
  }
}

const lastCheck = function(order,prevOrder){
  // const total = [......order,...prevOrder]
  console.log(order,prevOrder)
  // alert(`okay, you have ordered ${total}. have a nice time`)
}
// gettingOrder()

// js에서 ||는 모든 데이터 타입에 쓸 수 있고 모든 데이터 타입을 반환하는데
// 먼저 ||의 왼쪽 값을 판별하고 거짓이면 그 다음으로 넘어가는데 가는 도중 true값이 걸리면 도중에 멈추고 
// true값을 반환함 또한 계속 왼쪽으로 넘어가다 끝까지 false일 경우 마지막 값을 return

// 반대로 &&은 왼쪽 값이 거짓으로 판별 되면 그 값을 반환하고
// 참일 경우 계속 넘어가다가 마지막 역시 true라면 마지막 값을 return

console.log(`---------OR-----------`)
console.log(true||0)
console.log(''||0)
console.log(undefined||null)
console.log(undefined||null||''||0||false)
console.log(undefined||null|| 'hi' ||''||0||false)

console.log(`---------AND-----------`)
console.log(true&&0)
console.log(''&&0)
console.log(undefined&&null)
console.log(undefined&&null&&''&&0&&false)
console.log(undefined&&null&& 'hi' &&''&&0&&false)
console.log('hi' && 1 && 100 && true && 'shin')

//삼항 연산자를 쓰는 것 보다 ||를 써서 코드를 간결하게 할 수 있음
const guest1 = restaurant.guests ? restaurant.guests : 10;
const guset2 = restaurant.guests || 10;
console.log(guest1,guset2)

//if를 쓰는 것 보다 &&를 써서 코드를 좀 더 간결하게 쓸 수 있음
if(restaurant.orderPizza){
  restaurant.orderPizza('mushrooms','spinach')
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms','spinach');

// &&와 || 둘다 간결하게 짤 수는 있어도 가독성은 떨어 트릴 수 있으니 적당히 쓰자
// ||과 비슷하게 ??가 있는데 차이점은 ||은 거짓값 전체를 체크하지만 
// ??은 nullish(null or undefined)를 체크함
// ??와 비슷 하게 

