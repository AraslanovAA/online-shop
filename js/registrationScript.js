/*
id="signInUsername"
id="signInPassword"
id="signIn"
id="forgotPassword"
id="signUpFirstName"
id="signUpSecondName"
id="signUpEmail"
id="signUpPassword"
id="signUp"
*/

function CheckEmptySignUp(){
    let signUpFirstName = document.getElementById("signUpFirstName").value
    if(signUpFirstName ===''){return false}
    let signUpSecondName = document.getElementById("signUpSecondName").value
    if(signUpSecondName ===''){return false }
    let signUpEmail = document.getElementById("signUpEmail").value
    if(signUpEmail ===''){return false}
    let signUpPassword = document.getElementById("signUpPassword").value
    if(signUpPassword ===''){return false}
    return true
}

document.getElementById("signUp").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
    if(CheckEmptySignUp()){
        var r = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!r.test(document.getElementById("signUpEmail").value)) {
            alert("E-mail некорректен")
        }
        else{
                let cur_email = document.getElementById("signUpEmail").value
                let trynna_email = JSON.stringify({email: cur_email});
                var request = new XMLHttpRequest();
                request.open('POST', "/checkRegistratedEmail",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    let res = JSON.parse(request.response)
                    if(res === 'true'){
                            //отправляем запрос на добавление юзера в бд
                            let user = {     
                                firstname: document.getElementById("signUpFirstName").value,  
                                secondName: document.getElementById("signUpSecondName").value,
                                email: document.getElementById("signUpEmail").value,
                                password: document.getElementById("signUpPassword").value,
                                    };
                            let cur_user = JSON.stringify({user: user});
                            var req = new XMLHttpRequest();
                            let recieved = ''
                            req.open('POST', "/registrationUser",true);
                            req.setRequestHeader("Content-Type", "application/json");
                            req.addEventListener("load", function(){
                                let recieved = JSON.parse(req.response);
                                console.log(recieved)//вывожу в консоль id пользователя, зачем информация утеряна конечно
                                alert("Новый пользователь появился? рил?")
                                document.cookie = "outhNShop=" + user.password;
                                document.location.href = '/'
                                })
                            req.send(cur_user);
                                
                        }
                        else{
                            alert("ЪУЪ УУУ СУКА БУБУН не трожь мыло занято")
                            }
                })
                request.send(trynna_email);
    }//законили проверку корректности email
}//закончили проверку пустых полей
else{
    alert('заполните все поля')
}
});
    
function CheckEmptySignIn(){
    let signInUsername = document.getElementById("signInUsername").value
    if(signInUsername ===''){return false}
    let signInPassword = document.getElementById("signInPassword").value
    if(signInPassword ===''){return false}
    return true
}

document.getElementById("signIn").addEventListener("click", function (e) {
    e.preventDefault();
    if(CheckEmptySignIn()){
        console.log("данные клиента вроде как не пустые")
        //------------------------------------------------проверка, что пацан есть в базе
                let cur_email = document.getElementById("signInUsername").value
                let signInPassword = document.getElementById("signInPassword").value
                let trynna_user = JSON.stringify({email: cur_email, password: signInPassword});
                var request = new XMLHttpRequest();
                request.open('POST', "/author",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    var recievedSHIT = JSON.parse(request.response);
                    if(recievedSHIT ==="true"){
                        document.cookie = "outhNShop=" + signInPassword+';';
                        console.log(request.response)
                        document.location.href = '/'
                    }
                    else{
                        alert("Авторизация не пройдена, попробуйте снова")
                    }
                })
                request.send(trynna_user);
        //------------------------------------------------
    }
    else{
        alert('заполните все поля')
    }
    
});