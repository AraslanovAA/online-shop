/*
id = "picture1"
id="category"
id="new_item"
id="has_discount"
id="product_name" - вот это говно взяли чтоб сохранять в корзинку
id="description1"
id="description2"
id="picture2"
id="old_cost"
id="curr_cost"
    */

   document.getElementById("addToCard").addEventListener("click", function (e) {
    e.preventDefault();
    if( document.getElementById("auth").textContent !== 'Авторизация' ){

        let count_product0 = parseInt(document.getElementById("inp").value );
            let count_product = Number(count_product0)
            flag = true
            if(count_product ===''){
                showAlert('количество товаров не указано')
                flag = false
            }
            if(count_product == null){
                showAlert('некорректно указано количество товаров')
                flag = false
            }
            if(typeof count_product != 'number'){
                showAlert('некорректно указано количество товаров')
                flag = false
              }
            if(isNaN(count_product)){
                showAlert('некорректно указано количество товаров')
                flag = false
            }
            if((count_product > 0 )&&(flag ===true)){
    
            var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash = parsingArr[1]
                }
            }

    var prod_name = document.getElementById("product_name").textContent
            //---------------------------------------------отправка зпроса серверу, чтобы сохранить инфу в бд
        let cur_order = JSON.stringify({prod_name : prod_name, hash : hash, count_product : count_product});
        var request = new XMLHttpRequest();
        request.open('POST', "/addToCard",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
        calculateNumOfGoods()
        calculateNumOfGoods()
        }
        )
        request.send(cur_order);
            //-------------------------------------------------------------------------------------------------
        }
        else{
            showAlert('Ошибка при указании количества товара')
        }
}
else{
    showAlert('Пожалуйста авторизуйтесь')
}
}
    );

    function showAlert(text){
        document.getElementById('kekekkeke').style.display = 'initial'
        document.getElementById('buttClose').style.display = 'initial'
        document.getElementById('hideArea').style.display = 'initial'
        document.getElementById('buttClose').setAttribute('class', 'close')
        document.getElementById('buttClose').setAttribute('type', 'button')
         document.getElementById('classID').setAttribute('class' ,' pt-4')
                    document.getElementById('textAlert').textContent = text.toString()
                    window.scrollTo(0,0)
    }

function funcOnLoad(){

    var newDiv = document.createElement("div");   
    newDiv.innerHTML = "<br><br><br>"+
    "<div  id='alertDisplay' class='alert alert-warning alert-dismissible fade show' role='alert' style='text-align: center;'>"+
"<div id='textAlert'></div> "+
"<button id='buttClose' type='button' class='close'>"+
"<span id='hideArea' aria-hidden='true'>&times;</span>"+
"</button></div>"
    document.getElementById('createAlert').append(newDiv);
    newDiv.id='kekekkeke'

   document.getElementById('kekekkeke').style.display = 'none'
  document.getElementById('classID').setAttribute('class' ,'mt-5 pt-4')
    document.getElementById('buttClose').addEventListener("click", function (e) {
        e.preventDefault();

            document.getElementById('kekekkeke').style.display = 'none'   
            document.getElementById('classID').setAttribute('class' ,'mt-5 pt-4')
    })




    let index = window.location.href.indexOf('item')
    let numProduct = window.location.href.substring(index+4, window.location.href.length)
        let cur_id = JSON.stringify({IDProduct : numProduct});
        var request = new XMLHttpRequest();
        request.open('POST', "/allProductInfo",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
        let recieved = JSON.parse(request.response);
        let recieved2 = JSON.parse(recieved)
        document.getElementById('picture1').src=recieved2[0]["picture1"]
        document.getElementById('category').textContent=recieved2[0]["food_type"]
        //document.getElementById('new_item').textContent=recieved2[0]["picture1"]
        if(recieved2[0]["current_cost"]===recieved2[0]["old_cost"]){
            document.getElementById('has_discount').textContent= ''
            document.getElementById('old_cost').textContent=''
            document.getElementById('curr_cost').textContent= recieved2[0]["current_cost"]
        }
        else{
            document.getElementById('has_discount').textContent= 'хит продаж'
            document.getElementById('old_cost').textContent = recieved2[0]["old_cost"]
            document.getElementById('curr_cost').textContent= recieved2[0]["current_cost"]
        }
        document.getElementById('product_name').textContent=recieved2[0]["product_name"]
        document.getElementById('description1').textContent=recieved2[0]["description1"]
        document.getElementById('description2').textContent=recieved2[0]["description2"]
        document.getElementById('picture2').src=recieved2[0]["picture2"]
        }
        )
        request.send(cur_id);

        getUserName();
};