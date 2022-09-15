'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`); //해당 주소의 api에서 겟
  request.send('');
  //send할때는 변수선언 불가 왜냐하면 비동기화로 값이 안오기 때문

  request.addEventListener('load', function () {
    //data가 send로 들어오면 실행
    //console.log(this.responseText); //요청한 데이터가 'load'되어야만 쓸수잇음 eventlistener밖에 있으면 실행 x
    //갓 들어온 this.responseText을 js로 쓰기위해 오브잭트화 해주는 것이 JSON.parse
    const [data] = JSON.parse(this.responseText);
    // JSOn.parse가 넘어온 것이 오브젝트 이므로 data를 배열괄호를 씌움

    const html = `
     <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>;
            </div>
          </article>
          `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('korea (Republic of)');
getCountryData('germany');
getCountryData('usa'); //순서가 살짝 다를 수 있는데 그 이유는 api에서 데이터가 올때 시간이 달라서 그럼
