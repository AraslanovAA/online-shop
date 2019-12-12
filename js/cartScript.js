function funcOnLoad(){
    //берём хэшик -> собираем CorzinaPACANA
// из неё создаём новый список с именами товаров
//его снова даём на сервер, получаем список что пиздец конечно
   // document.getElementById('tableID').style.display="initial"
    var flag = false
    var newDiv = document.createElement("tr");    
        newDiv.innerHTML = "<th>Товар</th><th>количество</th><th>Цена за штуку</th><th>Цена</th>";
        document.getElementById('tableID').append(newDiv);
        //my_div = document.getElementById("tableId");
        //document.body.appendChild( newDiv,my_div);

    var cookieString = document.cookie;
    var splited = cookieString.split('=')
    let hash = splited[1]
    let cur_hash = JSON.stringify({hash : hash});
    var request = new XMLHttpRequest();
    request.open('POST', "/giveThisUserCard",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function(){
        var CorzinaPACANA = request.response
        let recieved = JSON.parse(request.response);
        let recieved2 = JSON.parse(recieved)

        if(recieved.length !==2){
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
            console.log('row: ' + prodAddParam +';  ' + prodCount+';  ' + prodCost+';  ' + prodCost*prodCount)
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
                        var splited = cookieString.split('=')
                        let hash = splited[1]
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
    //TODO:что делать будем в случае если товаров корзинке нет? надо может показать пацану хоть что-нибудь ? но пока не до этого
}
    }
    )
    request.send(cur_hash);
   getUserName();    
}


   
