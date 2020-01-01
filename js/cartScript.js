function funcOnLoad(){
    //берём хэшик -> собираем CorzinaPACANA
// из неё создаём новый список с именами товаров
//его снова даём на сервер, получаем список что пиздец конечно
   // document.getElementById('tableID').style.display="initial"
    //подписываем - здравствуй пацан
    var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash2=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash2 = parsingArr[1]
                }
            }
            //----------------------подгружаем имя поцикаА
            if(( typeof hash2 === 'string')&&(hash2 != '')){
                document.getElementById('author').style.display = 'initial'
                document.getElementById('auth').textContent = 'Выйти'
                if(hash2[hash2.length-1]===';'){
                    hash2 = hash2.substring(0,hash2.length-1)
                }
                
            let cur_hash = JSON.stringify({hash : hash2});
            var request6 = new XMLHttpRequest();
            request6.open('POST', "/giveNameByHash",true);
            request6.setRequestHeader("Content-Type", "application/json");
            request6.addEventListener("load", function(){
                var a = request6.response

                if((typeof a === 'string')&&(a !=='')){
                let recieved3 = JSON.parse(request6.response);
                let recieved4 = JSON.parse(recieved3)
                var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row  justify-content-center ')
            newDiv.innerHTML = '<div class='+"'"+' text-center '+"'"+'>'+
            '<h4 class='+"'"+'my-4 h4'+"'"+'>Здравствуйте, '+recieved4[0]["first_name"].toString()+'!</h4>' +
            '</div>'
            document.getElementById('helloUser').append(newDiv);
            }
            }
            )
            request6.send(cur_hash);
        }
        else{
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row d-flex justify-content-center wow slideInLeft')
            newDiv.setAttribute('style','visibility: visible; animation-name: slideInLeft;')
            newDiv.innerHTML = '<div class='+"'"+'col-md-6 text-center wow slideInLeft'+"'"+'>'+
            '<h4 class='+"'"+'my-4 h4'+"'"+'>Мы ещё не знакомы, пожалуйста авторизуйтесь.'+'</h4>' +
            '</div>'
            document.getElementById('helloUser').append(newDiv);
        }


   //подписали, здравствуй, пацан
    var flag = false
        var cookieString = document.cookie;
        var cookieParsed = cookieString.split(';')
        let hash=''
        for(let i =0;i<cookieParsed.length;i++){
            if(cookieParsed[i].indexOf('outhNShop')!==-1){
                var parsingArr = cookieParsed[i].split('=')
                hash = parsingArr[1]
            }
        }

    let cur_hash = JSON.stringify({hash : hash});
    var request = new XMLHttpRequest();
    request.open('POST', "/giveThisUserCard",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function(){
        var CorzinaPACANA = request.response
        let recieved = JSON.parse(request.response);
        let recieved2 = JSON.parse(recieved)

        if(recieved.length !==2){
            document.getElementById('header').style.visibility = 'visible'
            var newDiv = document.createElement("tr");    
        newDiv.innerHTML = "<th>Товар</th><th>количество</th><th>Цена за штуку</th><th>Цена</th>";
        document.getElementById('tableID').append(newDiv);

        let k = 0;
        var listProductName = ''
        while(recieved2[k]!= null){
            listProductName+= recieved2[k]["product_description"]+';'
            k++;
        }
        listProductName = listProductName.substring(0, listProductName.length - 1)//собрали список с наименованиями товаров
        let productList = JSON.stringify({listProductName : listProductName});
    var request2 = new XMLHttpRequest();
    request2.open('POST', "/giveTableInfo",true);
    request2.setRequestHeader("Content-Type", "application/json");
    request2.addEventListener("load", function(){
        //теперь ищем соответствие между recieved2 и тем что получаем из бд => считаем цену за строку таблицы, добавляем строку таблицы
        recieved3 = JSON.parse(request2.response)
        recieved4 = JSON.parse(recieved3)
        var tableContent = ''
        var u = 0
        var summCost = 0;
        while(recieved4[u]!= null){
            let prodName = recieved4[u]["product_name"]
            let prodCost = recieved4[u]["current_cost"]
            let prodAddParam = recieved4[u]["additional_params"]
            let prodCount = 0
            let t = 0
            while(recieved2[t] !=null){
                if(prodName === recieved2[t]["product_description"]){
                    prodCount+=recieved2[t]["count_prod"]
                }
                t++
            }
            //можем формировать строку таблицы помоему?
            flag = true
            var newDiv = document.createElement("tr");   
                    let picID = 'pic' + u.toString()
                    let rowID = 'row' + u.toString()
                    let rowCost = 'rowCost' + u.toString()
                    let rowAddParam = 'rowAddParam' + u.toString()
                    summCost+=prodCost*prodCount;
                    newDiv.innerHTML = "<td id = "+"'"+rowAddParam+"'"+">"+prodAddParam+"</td><td>"+prodCount+
                    "</td><td>"+prodCost+"</td><td id ="+"'"+rowCost+"'"+">"+prodCost*prodCount+
                    "</td><td><img id = "+"'"+picID+"' "+"width="+"'"+"15"+"'"+"src="+"'"+"http://branto.ru/Emoji/8/769.png"+"'"+"></td>";
                    //my_div = document.getElementById("tableId");
                    newDiv.setAttribute('id',rowID)
                    document.getElementById('tableID').append(newDiv);
                    //document.body.appendChild( newDiv,my_div);
        //start eventListener            
                    document.getElementById(picID).addEventListener("click", function (e) {
                        e.preventDefault();
                        document.getElementById("summaryCostID").textContent = document.getElementById("summaryCostID").textContent - document.getElementById(rowCost).textContent
                        
                        //берём хешик пацана, берём addit_param 
                        var addName = document.getElementById(rowAddParam).textContent
                        var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash = parsingArr[1]
                }
            }
                        let forDeleteInfo = JSON.stringify({hash : hash,addName:addName});
                        var request = new XMLHttpRequest();
                        request.open('POST', "/deleteCartItem",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                            var a = JSON.parse(request.response)
                            if(a==="true"){
                                calculateNumOfGoods()
                            }
                            calculateNumOfGoods()
                        }
                        )
                        request.send(forDeleteInfo);
                            
                        //
                        document.getElementById(rowID).style.display = "none"
                    }
                        );
        ////end eventListener            
            u++
        }
                    var newDiv = document.createElement("tr");   
                    newDiv.innerHTML = "<td>"+"</td><td>"+
                    "</td><td>"+'Итого:'+"</td><td id = "+"'"+"summaryCostID"+"'"+">"+summCost+"</td>";
                    //document.getElementById('tableID').append(newDiv);
                    my_div = document.getElementById("tableId");
                    document.getElementById('tableID').append(newDiv);
    }
    )
    request2.send(productList);
}else{
//-------------------------------------------------------------


    //TODO:что делать будем в случае если товаров корзинке нет? надо может показать пацану хоть что-нибудь ? но пока не до этого
    var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row d-flex justify-content-center wow slideInLeft')
            newDiv.setAttribute('style','visibility: visible; animation-name: slideInLeft;')
            newDiv.innerHTML = '<div class='+"'"+'col-md-6 text-center wow slideInLeft'+"'"+'>'+
            '<h4 class='+"'"+'my-4 h4'+"'"+'>Ой, кажется ваша корзина пуста.'+'</h4>' +
            '<p >Выберите интересующие вас товары и они появятся здесь.'+'</p></div>'
            document.getElementById('emptyCart').append(newDiv);
    //------------------------------------------------------------
}
    }
    )
    request.send(cur_hash);


   getUserName();    
}


   
