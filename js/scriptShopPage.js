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

        var count_product = parseInt(document.getElementById("inp").value );
        if(count_product > 0 ){
    
    var cookieString = document.cookie;
            var splited = cookieString.split('=')
            let hash = splited[1]//берём хэшик из печеньки

    var prod_name = document.getElementById("product_name").textContent
            //---------------------------------------------отправка зпроса серверу, чтобы сохранить инфу в бд
        let cur_order = JSON.stringify({prod_name : prod_name, hash : hash, count_product : count_product});
        var request = new XMLHttpRequest();
        request.open('POST', "/addToCard",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
        //TODO:обновить ярлычок на корзинке
        calculateNumOfGoods()
        }
        )
        request.send(cur_order);
            //-------------------------------------------------------------------------------------------------
        }
        else{
            alert('Ошибка при указании количества товара')
        }
}
else{
    alert('Пожалуйста авторизуйтесь')
}
}
    );

function funcOnLoad(){
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