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

const loginDone = (obj)=>{
    const [whosId] = accounts.filter(e=>{
        return Number(obj.pw) === e.pin;
    }) 
    currentAccount[0] = whosId;
    currentAccount[0].id = obj.id;

    const time = new Date().getHours();

    labelWelcome.innerHTML = `${greeting(time)}, ${currentAccount[0].owner.split(" ")[0]}!`;
    containerApp.style.opacity = 1;

    showingCurBal(currentAccount[0]);
    showingInOut(currentAccount[0].movements);

    const length = currentAccount[0].movements.length;
    const moves = currentAccount[0].movements;
    currentAccount[0].movements = [];

    for(let i = 0; i < length; i++){
        currentAccount[0].movements.push({
            date:'',
            movements:moves[i]
        })
    };

    moveList(currentAccount[0].movements);

    timer();
};

//showing current Ballance
const showingCurBal = (account) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    labelDate.innerHTML =
    `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    totalAmount.innerHTML = `${showingTotalBalance(addAll(account.movements))}`
};

//showing in and out
const showingInOut = (arr) => {
    const income = [];
    const withdraw = [];

    arr.forEach(e=>{
        if(e>0) income.push(e)
        else withdraw.push(e)
    })

    labelSumIn.innerHTML = `${showingTotalBalance(addAll(income))}`;
    labelSumOut.innerHTML = `${showingTotalBalance(addAll(withdraw))}`;
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
    
    console.log(addAll(moneys(currentAccount[0].movements)))

    const currentAccountBalance = addAll(moneys(currentAccount[0].movements));

    console.log(currentAccount[0].movements)
    
    if(exceptionSend(money,currentAccountBalance,toWho)){
        const change = currentAccountBalance + money*-1
        totalAmount.innerHTML = `${showingTotalBalance(change)}`
        
        currentAccount[0].movements.push({
            date:`${getToday()}`,
            movements:-1*money
        });

        moveList(currentAccount[0].movements);
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

//coding Challenge
const data1 = {
    kate:[4, 1, 15, 8, 3],
    julia:[3, 5, 2, 12, 7]
}

const data2 = {
    kate:[10, 5, 6, 1, 4],
    julia:[9, 16, 6, 8, 3]
}

//1
const juliasCorrectData = [...data1.julia].splice(1,3)

//2
const totalData = [...juliasCorrectData,...data1.kate]
console.log(totalData)

//3
const checkDogs = (arr) => {
    arr.forEach((i,e)=>{
        console.log(`Dog number ${e+1} is  ${i > 3 ? `an adult and it's ${i}years old`:
        `is still a puppy, and it's ${i}years old`}`)
    })
}   
checkDogs(totalData)
console.log('------------------')
checkDogs([...data2.julia,...data2.kate])