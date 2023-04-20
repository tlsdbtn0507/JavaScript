'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//global Functions
const filterFunc =(userName)=>{
    return ids.filter(e=>{
        return e.id === userName
    });
};

const addAll = (arr) => {
    return arr.reduce((a,b)=>a+b,0);
};

const totalAmount = labelBalance;

let sorting = true;

const showingTotalBalance = (num) => {
    return num.toLocaleString('en-US') + '$';
};

const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    return `${year}/${month}/${day}`
}

const getDate = (date) => {
    const gettingdate = new Date();
    const year = gettingdate.getFullYear();
    const month = gettingdate.getMonth()+1;
    const day = gettingdate.getDate();

    const date1 = new Date(date);
    const today = new Date(`${year}/${month}/${day}`);

    const timeDif = today.getTime() - date1.getTime();

    const dif = Math.abs(timeDif/ (1000 * 60 * 60 * 24));

    if(date === ''){
        return 'LONG TIME AGO'
    }else if(dif === 0){
        return 'TODAY'
    }else if(dif < 3){
        return `${dif} DAYS AGO`
    }else if(dif > 3){
        return date
    }

};

const moneys = (arr) => {
    const allMoney = [];
    for(let i = 0; i < arr.length; i++){
        let moneys = arr[i].movements;
        allMoney.push(moneys)
    }
    return allMoney
}

const checkingIdPw = (user,pw) => {
    if(user === undefined){
        alert('please check id');
        return false;
    } 
    else if(user !== undefined && Number(pw) !== user.pw){
        alert('please check pw');
        return false;
    }
    else if(user !== undefined && Number(pw) === user.pw){
        return user
    }
};


//login
const ids = [];
const currentAccount = new Array(0);

const makeIds = (arr)=>{
    arr.forEach(id => {
        const [firstN,lastN] = id.owner.split(" ")
        const fullNameId = {
            id:firstN[0].toLowerCase()+lastN[0].toLowerCase(),
            pw: id.pin,
        };
        ids.push(fullNameId)
    });
}
makeIds(accounts);

const organizeMovements = (arr) => {
    arr.forEach(e=>{
        const length = e.movements.length;
        const moves = e.movements;
        e.movements = [];
    
        for(let i = 0; i < length; i++){
            e.movements.push({
                date:'',
                movements:moves[i]
            })
        };

    })
};
organizeMovements(accounts)

//click login
btnLogin.addEventListener('click',function(event){
    const userName = inputLoginUsername.value;
    const userPd = inputLoginPin.value;

    const [result] = filterFunc(userName);

    if(!result){
        alert("there's no user who you assigned")
    }
    else if(checkingIdPw(result,userPd)){
        loginDone(result);
    }

    inputLoginUsername.value = null;
    inputLoginPin.value = null;
    event.preventDefault();
})

const greeting = (time)=>{
    const good = 'Good';
    let greeting
    
    if( time < 12 && time >=6 ){
        greeting = `${good} Morning`
    } else if( time >= 12 && time < 18){
        greeting = `${good} AfterNoon`
    } else if( time >= 18 && time < 22 ){
        greeting = `${good} Evening`
    } else if( time > 22 && time < 6 ){
        greeting = `${good} Night`
    }
    return greeting
};

//after login
const loginDone = (obj)=>{
    const whosId = accounts.find(e=> Number(obj.pw) === e.pin) 
    currentAccount[0] = whosId;
    currentAccount[0].id = obj.id;

    const time = new Date().getHours();

    labelWelcome.innerHTML = `${greeting(time)}, ${currentAccount[0].owner.split(" ")[0]}!`;
    containerApp.style.opacity = 1;


    moveList(currentAccount[0].movements);
    showingCurBal(currentAccount[0]);
    showingInOut(currentAccount[0].movements);

    timer();
};

//showing current Ballance
const showingCurBal = (account) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const moves = account.movements.map(e=> e.movements);

    labelDate.innerHTML =
    `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    totalAmount.innerHTML = `${showingTotalBalance(addAll(moves))}`
};

//showing in and out
const showingInOut = (arr) => {
    const income = [];
    const withdraw = [];

    const moves = arr.map(e=> e.movements);

    moves.forEach(e=>{
        if(e>0) income.push(e)
        else withdraw.push(e)
    })

    const interests = income.map(dep=>(dep*1.2)/100).filter(e=>e>=1).reduce((a,b)=> a+b,0);

    labelSumIn.innerHTML = `${showingTotalBalance(addAll(income))}`;
    labelSumOut.innerHTML = `${showingTotalBalance(addAll(withdraw))}`;
    labelSumInterest.textContent = `${interests}$`
};

//showing movements lists
const moveList = (arr) => {
    containerMovements.innerHTML = '';

    arr.forEach((mov,i)=>{


        const type = mov.movements > 0 ? 'deposit' : 'withdrawal';

        const date = getDate(mov.date);

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${date}</div>
          <div class="movements__value">${mov.movements}$</div>
        </div>
        ` ;

        containerMovements.insertAdjacentHTML('afterbegin',html)
    });
};


//transfer section
const sending = (e)=>{
    const to = inputTransferTo.value;
    const money = inputTransferAmount.value;
    
    const [toWho] = filterFunc(to);
    
    const currentAccountBalance = addAll(moneys(currentAccount[0].movements));

    if(exceptionSend(money,currentAccountBalance,toWho)){
        const change = currentAccountBalance + money*-1
        totalAmount.innerHTML = `${showingTotalBalance(change)}`
        
        const receiver = accounts.find(e => e.pin === toWho.pw)
        receiver.movements.push({
            date:`${getToday()}`,
            movements:money
        })

        currentAccount[0].movements.push({
            date:`${getToday()}`,
            movements:-1*money
        });

        moveList(currentAccount[0].movements);
        console.log(receiver)
    } 

    inputTransferTo.value = null;
    inputTransferAmount.value = null;


    e.preventDefault();
}

const exceptionSend = (money,total,who)=>{
    if(money > total){
        alert("you can't sand more money than you have");
        return false
    } else if(!who){
        alert("you can't send money who doesn't have account in Bankist");
        return false
    } else if(who.pw === currentAccount[0].pin){
        alert("you can't send your own money to yourself");
        return false
    } 
    else return true
}
btnTransfer.addEventListener('click',sending)

//loan section
const takeLoan = (e) => {
    const loan = Number(inputLoanAmount.value);

    currentAccount[0].movements.push({
        date:`${getToday()}`,
        movements:loan
    });

    moveList(currentAccount[0].movements);
    totalAmount.innerHTML = `${showingTotalBalance(addAll(moneys(currentAccount[0].movements)))}`
    inputLoanAmount.value = null;
    e.preventDefault();
};

btnLoan.addEventListener('click',takeLoan);

//close Account
const closing = (e) => {

    const closeId = inputCloseUsername.value;
    const closePw = inputClosePin.value;
    
    if(closeId === "" || closePw === ""){
        alert("please check your input")
    }else if(closeId !== currentAccount[0].id){
        alert("wrong id");
    }else if(Number(closePw) !== currentAccount[0].pin){
        alert("wrong pw");
    }else if(checkingIdPw(filterFunc(closeId)[0],closePw)){
        const check = confirm('Are you sure to delete your account?')
        if(check){
            deleteAccountFunction(closeId,closePw);
            labelWelcome.innerHTML = 'Log in to get started';
            containerApp.style.opacity = 0;
        }
    }
    
    inputCloseUsername.value = null;
    inputClosePin.value = null;
    e.preventDefault();
};

btnClose.addEventListener('click',closing);

//delete from account, ids array
const deleteAccountFunction = (id,pw) => {
    const deleteAccount = accounts.findIndex(e=>{
        return e.pin === Number(pw)
    });
    const deleteId = ids.findIndex(e=>{
        return e.id === id;
    })
    for(let i = 0; i < accounts.length; i++){
        if(i === deleteAccount){
            accounts.splice(i,1)
        }
    };
    for(let i = 0; i < ids.length; i ++){
        if(i === deleteId){
            ids.splice(i,1)
        }
    }
};

//timer
const timer = () => {
    let limit = 300;
    let min = 0;
    let sec = 0;

    const x = setInterval(function(){
        min = parseInt(limit/60);
        sec = limit%60;

        labelTimer.innerHTML = `0${min}:${sec < 10 ? '0'+sec : sec}`;
        limit--;

        if(limit<0){
            clearInterval(x);
            labelWelcome.innerHTML = 'Log in to get started';
            containerApp.style.opacity = 0;
            currentAccount[0] = null;
        }
    },1000)
};

//sorting arr by deposit or withdraw
const sortFunc = () => {
    
    sorting = !sorting;
    const arr = currentAccount[0].movements;

    if(sorting){
        moveList(arr)
    } else {
        const copying = [...arr] 
        copying.sort((a,b)=>{
            if(a.movements > b.movements) return 1;
            else if(a.movements < b.movements) return -1;
            else return 0
        })
        moveList(copying)
    }
}

btnSort.addEventListener('click', sortFunc);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//slice와 splice의 차이 : slice는 기존 배열을 mutate 하지 않지만 splice는 배열이 mutate됨
//reverse도 원래 배열을 mutate함
//es2022 at : 배열에 원하는 위치의 요소를 가져옴 마지막 가져올때 (-1)로 쉽게 가져올 수 잇고 str도 사용가능

//map 함수(배열 메서드)
//forEach와 다르게 map함수는 모든 요소에 원하는 작업을 하는 건 같지만 map은 새로운 배열을 만든다는 것이 차이

//coding Challenge
const data1 = {
    kate:[4, 1, 15, 8, 3],
    julia:[3, 5, 2, 12, 7]
};

const data2 = {
    kate:[10, 5, 6, 1, 4],
    julia:[9, 16, 6, 8, 3]
};

//1
const juliasCorrectData = [...data1.julia].splice(1,3);

//2
const totalData = [...juliasCorrectData,...data1.kate];
console.log(totalData);

//3
const checkDogs = (arr) => {
    arr.forEach((i,e)=>{
        console.log(`Dog number ${e+1} is  ${i > 3 ? `an adult and it's ${i}years old`:
        `is still a puppy, and it's ${i}years old`}`);
    })
}   
checkDogs(totalData);
console.log('------------------');
checkDogs([...data2.julia,...data2.kate]);

//challenge2
const Data1 =[5,2,4,1,15,8,3]; 
const Data2 =[16,6,10,5,6,1,4];

const calcAverageHumanAge = (arr) => {
    const beforeFilter =  arr.map(e=>e > 2 ? 16+e*4 : e*2).filter(e => e>=18 );
    // const result = beforeFilter.reduce((a,b,i,arr)=> a+b/arr.length,0);
    const result = beforeFilter.reduce((a,b)=> a+b,0)/beforeFilter.length;
    return result;
}
console.log(calcAverageHumanAge(Data1));
console.log(calcAverageHumanAge(Data2));

//challenge3
const data3 = [5,2,4,1,15,8,3];
const data4 = [16,6,10,5,6,1,4];

const calcAverageHumanAge2 = (arr)=> {
    const result = arr.map(e=> e > 2 ? 16+e*4 : e*2)
    .filter(e => e >=18)
    .reduce((a,b,i,arr)=> a+b/arr.length,0);
    return result
}

console.log(calcAverageHumanAge2(data3));
console.log(calcAverageHumanAge2(data4));

//.find
//filter처럼 콜백 함수를 받고 말 그대로 find 기능을 하지만 filter와 다른건 검색 조건이 같은 하나의 요소만 반환