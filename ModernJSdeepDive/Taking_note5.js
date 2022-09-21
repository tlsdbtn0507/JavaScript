"use strict";

//
// 5. 제어문
//

//5-1 블록문이란?
//블록문이란 0개 이상의 문이 {}로 묶여진 것을 의미 하고 블록문 끝에 ;을 붙여야함
//ex) 블록문
{
  var fo = 10;
}
//제어문
let y = 1;
if (y < 10) {
  x++;
}
//함수 선언문
function sum(a, b) {
  return a + b;
}

//5-2 조건문이란?
//주어진 조건식(불리언 값으로 평가될 수 있는 표현식)에 따라 블록문의 실행을 결정함
//자바스크립트에서 조건문은 if else 와 switch가 있따

//5-2-1 if else 문
//조건식의 평가 결과에 따라 참일 경우 if문의 블록문이 실행하고 아닐 경우 else의 블록문 실행
if (조건식) {
  //조건식이 트루면 해당 블록문 실행
} else {
  //조건식이 거짓이면 해당 블록문 실행
}
// 만약 저 위에 조건식이 불리언이 아닌 값이여도 자바스크립트의 암묵적 타입변환에 의해
//자동으로 불리언 타입의 값을 갖게된다

//또한 코드블록안에 문이 하나만 있으면 {}를 생략할 수 있다

var number = 2;
var kind;
if (number > 0) kind = "양수";
if (number < 0) kind = "음수";
console.log(kind); // 양수

//대부분의 if else문은 삼항연산자로 대체가능하다
// var x= 2
//var result;
//if(x%2) result = '짝수'
//else result = '홀수'; => 이 4줄을

var z = 2;
var reslt = z % 2 ? "짝수" : "홀수"; //z%2의 값 0은 false로 암묵적 타입변환 반대로 1은 true

// var num = 2;
// var kind = num ? (num>0 ? '양수':'영') : '음수'
//cnosole.log(kind) => 양수 num이 2이고 0이 아니기 때문에 트루, 양수가 출력
// 가독성과 편리함은 삼항 연산자가 더 낫지만 실행해야하는 내용이 복잡하고 여러줄의 문이 필
//요하면 if else가 낫다

//5-2-2 switch문
//주어진 표현식을 평가해 그 값과 일치하는 표현식을 가진 case 문으로 실행을 옮기고
//case문은 상황을 의미하는 표현식을 지정하고 콜론을 찍는다
//switch문의 표현식과 일치하는 case문이 없다면 실행 순서는 default로 간다
//ex
// switch(표현식){
//     case 표현식1:
//         switch 문의 표현식과 표현식1이 일지하면 실행;
//         break;
//     case 표현식2:
//         switch 문의 표현식과 표현식2이 일지하면 실행;
//         break;
//     default:
//         switch 문과 일치하는 case문이 없을 때 실행 break 생략
// }
// if else 문의 조건식은 불리언 값으로 평가되어야 하지만 switch문의 표현식은 문자열이나
//숫자 값인 경우가 많다 즉,
//if else는 논리적 참, 거짓으로 실행할 코드블록을 결정하고
//switch는 논리적 참, 거짓 보다 다양한 상황(case)에 따라 실행할 코드블록 결정
//switch에서 표현식의 평가 결과가 case문을 통과해 실행하지만 switch문을 탈출하지 않고
//switch 문이 끝날 때까지 모든 case문과 default까지 실행 한 것을 폴 스루(fall through) 라고함
//case에 break를 쓰지 않으면 폴 스루의 결과가 나옴 break가 없다면 case의 표현식이 일치하지
//않아도 실행 흐름이 다음 case문으로 이동한다

var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "Jan";
    break;
  case 2:
    monthName = "Feb";
    break;
  case 3:
    monthName = "Mar";
    break;
  case 4:
    monthName = "Apr";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "Jun";
    break;
  case 7:
    monthName = "Jul";
    break;
  case 8:
    monthName = "Aug";
    break;
  case 9:
    monthName = "Sep";
    break;
  case 10:
    monthName = "Oct";
    break;
  case 11:
    monthName = "Nov";
    break;
  case 12:
    monthName = "Dec";
    break;
  default:
    monthName = "Invalid month";
}
console.log(monthName);

//5-3 반복문
//조건식의 결과가 참인 경우 블록문을 실행하고 계속 조건식을 평가해서 결과가 거짓일 때 까지
//블록문을 반복한다 자바스크립트에 반복문은 for /while / do...while이 있다

//5-3-1 for문
//조건식이 거짓으로 평가 될때까지 블록문을 반복한다
//for(1.변수 선언문or 할당문 ; 2.조건식 ; 3.증감식){
//   조건식이 참인 경우 반복될 문
// }
// 1.변수 선언문은 단 한번만 실행된다
// 2.변수 선언문이 완료되면 그 옆에 조건식을 실행한다
// 조건식이 참일 경우 옆에 증감식을 거치는게 아님 블록문으로 실행 흐름이 이어진다
// 3. 블록문의 실행이 종료되면 증감식을 거쳐서 변수의 값이 증가한다
// 계속 반복하다 조건식이 거짓일 경우 반복문은 종료된다

//이중 중첩 for문 => 두 눈의 합이 6이 되는 모든 경우의 수 출력
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i},${j}]`);
  }
}

//5-3-2 while문
//while문은 조건식의 평가가 참이면 블록문을 반복실행 for문은 주로 반복횟수가 명확할 때,
//while문은 반복횟수가 불명확 할때 쓴다 또한 조건문의 평가가 거짓이면 탈출한다

var count = 0;
while (count < 6) {
  console.log(count); // 0 1 2 3 4 5
  count++;
}

var count = 0;
while (true) {
  count++;
  console.log(count);
  if (count === 3) break; // if의 break가 없었다면 무한 루프
}

//5-3-3 do...while문
//do...while문은 블록문을 먼저 실행 하고 조건식을 평가 한 다음 반복

var count = 0;

do {
  console.log(count); // 0 1 2 3
  count++;
} while (count < 4);

// do {
//   count++;
//   console.log(count); // 1 2 3 4
// } while (count < 4);

//5-4 break문
// 앞서 살펴 본 듯 break문은 블록문을 탈출함 정확히는 레이블 문, 반복문 switch문을 탈출한다
//저 3문 외에 break문을 쓰면 문법에러가 발생한다
// if(true){
//   break; // => uncaught syntaxerror
// }
//참고로 레이블 문이란 식별자가 붙은 문 ex) foo:console.log('foo');
//레이블 문은 프로그램의 실행순서를 제어하는데 쓰인다 그래서 switch의 case, default 문도
//레이블문 이다 레이블 문을 탈출하기 위해 break에 레이블 식별자를 지정한다

foo: {
  console.log(1); // 1만 출력
  break foo;
  console.log(2);
}
//중첩 for문의 내부 for문에서 break를 실행하면 내부 for문을 탈출해 외부 for로 진입 하지만
// 내부 for 가 아닌 외부 for로 나가려면 레이블 문을 쓰면 된다

outer: for (let x = 0; x < 3; x++) {
  for (let i = 0; i < 3; i++) {
    if (x + i === 3) break outer; // x나 i가 2,1 1,2 인 경우를 제외하고 전부 출력
    console.log(`inner ${x},${i}`);
  }
}
//이 레이블문은 중첩 for문을 탈출할때는 용이하지만 그외에는 사용 x 하지만 break문은
//반복문 switch문에서 사용 가능

var string = "hello world";
var search = "l";
var count;

for (let i = 0; i < string.length; i++) {
  if (string[i] === search) {
    count = i;
    break; // 배열의 2번째 자리에 l이 있어서 탈출
  }
}
console.log(count);

//5-5 continue문
//continue문은 반복문의 블록문 실행을 해당 지점에서 중단하고 반복문의 증감식으로 실행 흐름
//을 이동하고 break와 달리 반복문을 탈출하지 않음

var string = "hello world";
var search = "l";
var count = 0;

for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동
  if (string[i] !== search) continue;
  count++;
}
console.log(count);

const regexp = new RegExp(search, "g");
console.log(string.match(regexp).length); //위에 ㅣ개수 찾는 문과 동일한 기능
