'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let markerOn = true;

const workOutsArr = [];
let index = 0;

class coordsCl{
    constructor(lat,lng){
        this.lat = lat
        this.lng = lng
    }
    get coord(){
        return [this.lat,this.lng]
    }
    clickMarker(){
        return L.marker(this.coord)
    }
}

class workouts extends coordsCl{
    constructor(lat,lng,type,dis,dur,cad,elev){
        super(lat,lng)
        this.type = type 
        this.dis = dis 
        this.dur = dur 
        this.type === 'running' ? this.other = cad : this.other = elev
    }

    get popUpMessage (){

        const type = this.type.slice(0,1).toUpperCase() + this.type.slice(1)
        const month = months[new Date().getMonth()];
        const day = new Date().getDate();
        return `${type} on ${month} ${day}`
    }

    get popUp(){
        const pop = L.popup()
        .setLatLng(this.coord)
        .setContent(this.popUpMessage);

        return pop
    }

}



navigator.geolocation.getCurrentPosition(function(pos){
    const {latitude,longitude} = pos.coords;

    const coords = [latitude,longitude];

    const map = L.map('map').setView(coords, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click',function(mapEvent){

        form.classList.remove('hidden');
        
        const {lat,lng} = mapEvent.latlng;
        const coord = new coordsCl(lat,lng)
        
        const clickMarker = L.marker(coord.coord);
        console.log(coord.clickMarker())
        if(markerOn === true){
          coord.clickMarker().addTo(map);
          markerOn = false;
        } else return

        document.addEventListener('keydown',function(e){

            if(e.code === 'Enter' && markerOn === false){

                const workout = new workouts(lat,lng,inputType.value,inputDistance.value,inputDuration.value,inputCadence.value,inputElevation.value)

                workOutsArr.push(workout);

                localStorage.setItem(`workouts`, JSON.stringify(workOutsArr));

                console.log(workout)

                workout.clickMarker()
                .bindPopup(`${workout.popUpMessage}`)
                .openPopup();

                // workout.clickMarker()
                workout.popUp.openOn(map);

                markerOn = true;

                form.classList.add('hidden');
                
                containerWorkouts.insertAdjacentHTML('beforeend',workoutLi(index++,workout));
                nullMaker([inputDistance,inputDuration,inputCadence,inputElevation]);
                e.preventDefault();
            }
        })

    })
        
},function(){
    alert("Can't get your position");
});

const nullMaker = (arr) => {
    arr.forEach(e => e.value = null);
}

const objMaker = (a,b,c,d,e)=> {
    const obj = { type:a,dis:b,dur:c,cad:d,elev:e }
    return obj
}

const workoutLi = (index,obj) => {
return    `<li class="workout workout--${obj.type}" data-id="${index}">
<h2 class="workout__title">${obj.popUpMessage}</h2>
<div class="workout__details">
  <span class="workout__icon">${obj.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
  <span class="workout__value">${obj.dis}</span>
  <span class="workout__unit">km</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⏱</span>
  <span class="workout__value">${obj.dur}</span>
  <span class="workout__unit">min</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⚡️</span>
  <span class="workout__value">${Math.trunc(obj.dis/obj.dur)}</span>
  <span class="workout__unit">${obj.type === 'running' ? 'km/min' : 'km/h'}</span>
</div>
<div class="workout__details">
  <span class="workout__icon">${obj.type === 'running' ? '🦶🏼' : '⛰'}</span>
  <span class="workout__value">${obj.other}</span>
  <span class="workout__unit">${obj.type === 'running' ? 'spm' : 'm'}</span>
</div>
</li>`
}