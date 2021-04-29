
let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPass = document.getElementById('signupPass');
// let signupBtn = document.getElementById('signupBtn');
let emailExitMsg = document.getElementById('emailExitMsg');

let loginEmail = document.getElementById('loginEmail');
let loginPass = document.getElementById('loginPass');
let loginBtn = document.getElementById('loginBtn');
let logAlert = document.getElementById('logAlert');

let userWelcome = document.getElementById('userWelcome');

let usersArr = [];
let emailsArr = [];

if (localStorage.getItem("userLogedData") != null && userWelcome != null) {
    let userLoged = JSON.parse(localStorage.getItem("userLogedData"));
    // console.log(loginEmail);
    userWelcome.innerHTML = userLoged.name;
}

if(localStorage.getItem("usersData") != null){
    usersArr = JSON.parse(localStorage.getItem("usersData"));
}

for (let i = 0; i < usersArr.length; i++){
    emailsArr[i] = usersArr[i].email;
}

// console.log(usersArr[usersArr.length-1]);



class user {
    constructor(name, email, pass) {
        this.name = name;
        this.email = email; 
        this.pass = pass;
    }
}

function signUpFun() {

    // console.log("welocme");

    if (signUpVerification()) {
        let Newuser = new user(signupName.value, signupEmail.value, signupPass.value);
   
        usersArr.push(Newuser);       
        emailsArr.push(signupEmail.value);
        console.log(Newuser.pass);
        localStorage.setItem("usersData", JSON.stringify(usersArr));
    }
}

function signUpVerification() {
    if (signupName.value == "" || signupEmail.value == "" || signupPass.value == "") {
        emailExitMsg.innerHTML = `<span class="text-danger">All inputs is required</span>` ;
        return false;
    }else if (emailsArr.indexOf(signupEmail.value) != -1) {
        emailExitMsg.innerHTML = `<span class="text-danger">email already exists</span>` ;
        return false;
    } else {
        // emailExitMsg.classList.add('d-none');
        emailExitMsg.innerHTML = `<span class="text-success">succes</span>`;
        return true;
    }
}

function loginFun() {

    let logValue = loginVerification();
    console.log(logValue);

    if (loginVerification() != -1) {
        console.log(logValue);
        console.log(usersArr[logValue].name);
        localStorage.setItem("userLogedData", JSON.stringify(usersArr[logValue]));
        loginBtn.setAttribute('href', 'home.html');
        // userWelcome.innerHTML = usersArr[logValue].name;   
    } else {
        console.log("False Login");       
    }
}

function loginVerification() {

    if (loginEmail.value == "" || loginPass.value == "") {
        logAlert.innerHTML = `<span class="text-danger">All inputs is required</span>` ;
        return -1;
    } 
    for (let i = 0; i < usersArr.length; i++){
        if (usersArr[i].email == loginEmail.value && usersArr[i].pass == loginPass.value) {
            console.log(i);
            logAlert.innerHTML = "";
            console.log(i);
            return i;
        }
    }
    logAlert.innerHTML = `<span class="text-danger">incorrect email or password</span>` ;
    return -1;
}



