'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
     <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>;
            </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`); //해당 주소의 api에서 겟
//   request.send('');
//   //send할때는 변수선언 불가 왜냐하면 비동기화로 값이 안오기 때문

//   request.addEventListener('load', function () {
//     //data가 send로 들어오면 실행
//     //console.log(this.responseText); //요청한 데이터가 'load'되어야만 쓸수잇음 eventlistener밖에 있으면 실행 x
//     //갓 들어온 this.responseText을 js로 쓰기위해 오브잭트화 해주는 것이 JSON.parse
//     const [data] = JSON.parse(this.responseText);
//     // JSOn.parse가 넘어온 것이 오브젝트 이므로 data를 배열괄호를 씌움

//     const html = `
//      <article class="country">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>;
//             </div>
//           </article>
//           `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('korea (Republic of)');
// getCountryData('germany ');
// getCountryData('usa'); //순서가 살짝 다를 수 있는데 그 이유는 api에서 데이터가 올때 시간이 달라서 그럼

////////////////////////////////////////////////////////////////////////////////

//아래getCountryAndNeighbour에서 부른 국가 정보를 화면에 띄우는 기능

// //json따와서 자료형으로 변환하고 renderCountry를 콜백으로 가짐
// const getCountryAndNeighbour = function (country) {
//   //Ajax로 부른 자료
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`); //해당 주소의 api에서 겟
//   request.send('');
//   //send할때는 변수선언 불가 왜냐하면 비동기화로 값이 안오기 때문

//   //data가 send로 들어오면 실행
//   request.addEventListener('load', function () {
//     //요청한 데이터가 'load'되어야만 쓸수잇음 eventlistener밖에 있으면 실행 x
//     //갓 들어온 this.responseText을 js로 쓰기위해 오브잭트화 해주는 것이 JSON.parse
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // JSOn.parse가 넘어온 것이 배열 이므로 data를 배열괄호를 씌움

//     //Render로 부른 country/ 그 유명한 콜백 함수
//     renderCountry(data);

//     //neighbor country 얻기 위해 주변국 배열 수에 맞춰 랜덤
//     let neighNum = Math.floor(Math.random() * data.borders?.length);
//     console.log(neighNum);
//     const neighbour = data.borders?.[neighNum];
//     if (!neighbour) return;

//     //Ajax가 부르고 neighNum으로 뽑은 국가
//     //먼저 부른 request때문에 2을 붙여서 사용
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send('');

//     request2.addEventListener('load', function () {
//       //여기선 data2에 []을 안씌워도 되는데 그 이유는 api가 alpha로 바뀌면서 배열이 아닌 오브젝트로 왔기 때문
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       //콜백 함수. data가 먼저 순차적으로 실행하고 아래의 data2는
//       //그 다음에 실행. 실행할때 인자로 'neighbour'넣어서
//       //renderCountry 실행 할때 주변국은 살짝 작은 화면으로 표시
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// // 불러볼 국가들 'korea (Republic of)','germany ','usa'
// getCountryAndNeighbour('germany ');
// // getCountryAndNeighbour('korea (Republic of)');
// // getCountryAndNeighbour('usa');
// //순서가 살짝 다를 수 있는데 그 이유는 api에서 데이터가 올때 시간이 달라서 그럼

// //콜백의 콜백의 처럼 콜백이 중복되는 것이 콜백hell
// setTimeout(() => {
//   console.log('1 seconds passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// // Euro Museum
// // const EuroMus = function () {
// //   const requset = new XMLHttpRequest();
// //   requset.open('GET', 'https://api.europeana.eu/record/v2/opensearch.rss');
// //   requset.send('');

// //   requset.addEventListener('load', function () {
// //     const data = JSON.toString(this.responseText);
// //     console.log(data);
// //   });
// // };

// // EuroMus();
//----------------------------
//promise
//----------------------------

//promise를 쓰는 이유
//1.비동기화 결과를 다루기 위해 이벤트나 콜백에 의존할 필요가 사라짐
//2. 위에 코드 처럼 길고 긴 비동기화 구현을 하지 않고 체인 프로미스로 구현가능
//프로미스는 보류,대기 중 이라고 할수 있음 비동기 작업이 끝나야 작업이 실행
//작업이 실행 될때 fulfilled와 rejected로 나뉨
//fulfilled는 예를 들어 fetch로 api에서 데이터를 잘 받아옴 즉 작업이 잘됨을 의미
//rejected는 비동기 작업 중 에러가 있엇음을 의미 fetch api로 예를 들면 연결이 끊기거나 접속이 제한 걸릴때

//코드 설명 주석
//1.fetch 함수 뒤에 요청한 api의 정보요청이 성공이던 404던
//프라미스(비동기 작업들이 실행 및 완료하고)를 반환하고
//then은 fetch의 작업이 끝나면 실행

//2.response의 결과안에 원래 알아야할 국가의 정보가 담겨있지 않기 때문에
//fetch api를 통해서 받은 객채에 사용할 수 있는 함수인json함수를 실행
//json함수 역시 비동기 함수여서 실행시키고 리턴

//3.이웃나라를 구하기 위해 변수선언

//4.위에서 한거랑 똑같은 api에 fetch를 data 함수에 프라미스 적용 그러면
//data 함수에서 fetch까지 실행하고 그 뒤는 2.처럼 실행
//5. .then 함수를 fetch를 리턴하지 않고 fetch().then을 하는게 아니라 2.의 .then
//함수에 붙여야 함 2의 .then에 붙이면 그대로 콜백함수가 되어 가독성을 낮춤
//6. 프로미스가 오류(여기선 fetch가 인터넷 끊김으로 인한 오류)로 인해 reject될
//경우를 대비해 에러를 알려줌
//7. 6번 처럼 오류가 날 만한 곳에 handling error를 하지 말고 프로미스 체인의
//가장 마지막줄에 캐치문을 넣으면 프로미스 체인 어느곳에서 오류가 나던 간에 그것을
//캐치해 냄
//8.콘솔에 에러의 원인을 명시하고 renderError라는 html에 오류의 원인과 메세지를
//띄우는 함수를 실행시킴
//9. finally 함수는 then이나 catch처럼 프로미스가 fulfilled이나 rejected되
//던 간에 무조건 실행하는 함수로 꼭 써야하는 건 아님 보통 로딩 중을 띄울때 씀

// const getCountryData = function (country) {
//   //1.
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     //2.
//     .then(response => response.json() /*6.err => alert(err)*/)
//     .then(data => {
//       renderCountry(data[0]);
//       //3.
//       let neighNum = Math.floor(Math.random() * data[0].borders.length);
//       const neighbour = data[0].borders[neighNum];

//       if (!neighbour) return;
//       //4.
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     //5.
//     .then(response => response.json() /*6.,err => alert(err)*/)
//     .then(data => renderCountry(data, 'neighbour'))
//     //7.
//     .catch(err => {
//       console.error(`${err}`);
//       //8.
//       renderError(`Error is occured by:${err.message}.Try again`);
//     })
//     //9.
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // getCountryData('korea (Republic of)');
//   getCountryData('france');
// });

//Coding Challenge

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};

whereAmI(52.508, 13.381);
