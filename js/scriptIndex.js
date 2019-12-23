function funcOnLoad(){
    createVkusDropDownFull()

    var newDiv = document.createElement("div");   
            newDiv.innerHTML = "<br><br><br>"+
            "<div  id='alertDisplay' class='alert alert-warning alert-dismissible fade show' role='alert' style='text-align: center;'>"+
  "<div id='textAlert'></div> "+
  "<button id='buttClose' type='button' class='close'>"+
    "<span id='hideArea' aria-hidden='true'>&times;</span>"+
  "</button></div>"
            document.getElementById('createAlert').append(newDiv);
            newDiv.id='kekekkeke'
            document.getElementById('kekContent2').style.display = 'initial'
            document.getElementById('kekContent3').style.display = 'initial'
            document.getElementById('kekContent4').style.display = 'initial'
           document.getElementById('kekekkeke').style.display = 'none'
            
            document.getElementById('buttClose').addEventListener("click", function (e) {
                e.preventDefault();
                if(document.getElementById('textAlert').textContent ==='Сайт использует ваши куки для корректной работы'){
                    document.cookie = "Cookie=da" 
                }
                document.getElementById('kekContent2').style.display = 'initial'
            document.getElementById('kekContent3').style.display = 'initial'
            document.getElementById('kekContent4').style.display = 'initial'
            document.getElementById('kekekkeke').style.display = 'none'   
            })

            let useCookie = 'net'
            let cookieString = document.cookie
            console.log(cookieString)
                var cookieSplited0 = cookieString.split(';')
                for(let i =0;i<cookieSplited0.length;i++){
                    if(cookieSplited0[i].indexOf('Cookie')!==-1){
                        var parsingArr = cookieSplited0[i].split('=')
                        if(parsingArr[1]!==''){
                            useCookie ='da'
                        }
                    }
                }
                if(useCookie ==='net'){
                    showAlert('Сайт использует ваши куки для корректной работы')
                }

    
    getUserName();

};
function showAlert(text){
    document.getElementById('kekekkeke').style.display = 'initial'
    document.getElementById('buttClose').style.display = 'initial'
    document.getElementById('hideArea').style.display = 'initial'
    document.getElementById('buttClose').setAttribute('class', 'close')
    document.getElementById('buttClose').setAttribute('type', 'button')
                document.getElementById('kekContent2').style.display = 'none'
                document.getElementById('kekContent3').style.display = 'none'
                document.getElementById('kekContent4').style.display = 'none' 
                document.getElementById('textAlert').textContent = text.toString()
                window.scrollTo(0,0)
}

document.getElementById("button_reset").addEventListener("click", function (e) {
    e.preventDefault();//чистим куки текущей выбранной категории, вызываем без фильтров
    document.querySelector('#input_minimum').value = ''.toString()
    document.querySelector('#input_maximum').value = ''.toString()
    if(document.getElementById('all_class').getAttribute('class') ==='nav-item active'){
        document.cookie = "Amin="
        document.cookie = "Amax="
        document.cookie = "Arder="
        document.cookie = "Avkus="
        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            var res1 = res.split(';')
            for(let i=0;i<Number(res1[3]);i++){
                let curr_name = 'menu2_itemAll'+i.toString() 
                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                }
            document.getElementById('menu2_itemAllAny').setAttribute('class','dropdown-item active')
            showAll(1)
        })
        request.send();

    }
    if(document.getElementById('waffles_class').getAttribute('class') ==='nav-item active'){
        document.cookie = "Wmin="
        document.cookie = "Wmax="
        document.cookie = "Wrder="
        document.cookie = "Wvkus="
        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            var res1 = res.split(';')
            for(let i=0;i<Number(res1[0]);i++){
                let curr_name = 'menu2_itemWaff'+i.toString() 
                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                }
            document.getElementById('menu2_itemWaffAny').setAttribute('class','dropdown-item active')
            showWaffles(1)
        })
        request.send();

        
    }
    if(document.getElementById('marmalade_class').getAttribute('class') ==='nav-item active'){
        document.cookie = "Mmin="
        document.cookie = "Mmax="
        document.cookie = "Mrder="
        document.cookie = "Mvkus="
        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            var res1 = res.split(';')
            for(let i=0;i<Number(res1[1]);i++){
                let curr_name = 'menu2_itemMarm'+i.toString() 
                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                }
            document.getElementById('menu2_itemMarmAny').setAttribute('class','dropdown-item active')
            showMarmalade(1)
        })
        request.send();

        
    }
    if(document.getElementById('croissants_class').getAttribute('class') ==='nav-item active'){
        document.cookie = "Cmin="
        document.cookie = "Cmax="
        document.cookie = "Crder="
        document.cookie = "Cvkus="
        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            var res1 = res.split(';')
            for(let i=0;i<Number(res1[2]);i++){
                let curr_name = 'menu2_itemCrois'+i.toString() 
                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                }
            document.getElementById('menu2_itemCroisAny').setAttribute('class','dropdown-item active')
            showCroissants(1)
        })
        request.send();


        
    }

        });

     
//navbar-light green
       



document.getElementById('button_accept').addEventListener("click", function (e) {
    e.preventDefault();
    
    //document.getElementById('button_general_color')
    //alert(document.getElementById('menu2').getElementsByTagName('div').length)
    //alert(document.querySelector('#input_minimum').value)
    var textMin = document.querySelector('#input_minimum').value
    var numTextMin = Number(textMin)
    var textMax = document.querySelector('#input_maximum').value
    var numTextMax = Number(textMax)
    let flag = true
    if(numTextMin ===''){
        showAlert('min - введена пустая строка')
        flag = false
    }
    if(numTextMin == null){
        showAlert('min - введёно не число')
        flag = false
    }
    if(typeof numTextMin != 'number'){
        showAlert('min - введено не число')
        flag = false
      }
    if(isNaN(numTextMin)){
        showAlert('min - введено не число')
        flag = false
    }
    if(numTextMax ===''){
        showAlert('max - введена пустая строка')
        flag = false
    }
    if(numTextMax == null){
        showAlert('max - введёно не число')
        flag = false
    }
    if(typeof numTextMax != 'number'){
        showAlert('max - введено не число')
        flag = false
      }
    if(isNaN(numTextMax)){
        showAlert('max - введено не число')
        flag = false
    }
    if(numTextMin < 0 ){
        showAlert('Указано недопустимое значение  минимальной цены')
        flag = false
    }
    if(numTextMax < 0 ){
        showAlert('Указано недопустимое значение  максимальной цены')
        flag = false
    }
    if(flag === true){
        
        if(numTextMax === 0 ){
            numTextMax = 99999
        }
        if(numTextMax < numTextMin){
            document.querySelector('#input_maximum').value = numTextMin.toString()
            numTextMax = numTextMin
        }
        let category = ''
        if(document.getElementById('all_class').getAttribute('class') ==='nav-item active'){
            category = 'all'
        }
        if(document.getElementById('waffles_class').getAttribute('class') ==='nav-item active'){
            category = 'вафли'
        }
        if(document.getElementById('marmalade_class').getAttribute('class') ==='nav-item active'){
            category = 'мармелад'
        }
        if(document.getElementById('croissants_class').getAttribute('class') ==='nav-item active'){
            category = 'круасаны'
        }
        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            var res1 = res.split(';')
            let numVkus = 0
            let activeNameVkus = ''
            if(category==='вафли'){
                numVkus = res1[0]
                for(let i =0;i <numVkus;i++){
                    let name = 'menu2_itemWaff'+i.toString()
                    if(document.getElementById(name).getAttribute('class')==='dropdown-item active'){
                        activeNameVkus = document.getElementById(name).textContent
                    }
                }
                if(document.getElementById('menu2_itemWaffAny').getAttribute('class') ==='dropdown-item active'){
                    activeNameVkus ='-'
                }
            }
            if(category==='мармелад'){
                numVkus = res1[1]
                for(let i =0;i <numVkus;i++){
                    let name = 'menu2_itemMarm'+i.toString()
                    if(document.getElementById(name).getAttribute('class')==='dropdown-item active'){
                        activeNameVkus = document.getElementById(name).textContent
                    }
                }
                if(document.getElementById('menu2_itemMarmAny').getAttribute('class') ==='dropdown-item active'){
                    activeNameVkus ='-'
                }
            }
            if(category==='круасаны'){
                numVkus = res1[2]
                for(let i =0;i <numVkus;i++){
                    let name = 'menu2_itemCrois'+i.toString()
                    if(document.getElementById(name).getAttribute('class')==='dropdown-item active'){
                        activeNameVkus = document.getElementById(name).textContent
                    }
                }
                if(document.getElementById('menu2_itemCroisAny').getAttribute('class') ==='dropdown-item active'){
                    activeNameVkus ='-'
                }
            }
            if(category==='all'){
                numVkus = res1[3]
                for(let i =0;i <numVkus;i++){
                    let name = 'menu2_itemAll'+i.toString()
                    if(document.getElementById(name).getAttribute('class')==='dropdown-item active'){
                        activeNameVkus = document.getElementById(name).textContent
                    }
                }
                if(document.getElementById('menu2_itemAllAny').getAttribute('class') ==='dropdown-item active'){
                    activeNameVkus ='-'
                }
            }
            let sortCost = ''
            if(document.getElementById('ASC').getAttribute('class') ==='dropdown-item active'){
                sortCost = 'ASC'
            }
            else{
                sortCost = 'DESC'
            }
            
            
            if(category ==='вафли'){
                
                document.cookie = "Wmin=" + numTextMin.toString();
                document.cookie = "Wmax=" + numTextMax.toString();
                document.cookie = "Wrder=" + sortCost;
                document.cookie = "Wvkus=" + activeNameVkus;
                showWaffles(numPage = 1)
            }
            if(category ==='мармелад'){
                document.cookie = "Mmin=" + numTextMin.toString();
                document.cookie = "Mmax=" + numTextMax.toString();
                document.cookie = "Mrder=" + sortCost;
                document.cookie = "Mvkus=" + activeNameVkus;
                showMarmalade(numPage = 1)
            }
            if(category ==='круасаны'){
                document.cookie = "Cmin=" + numTextMin.toString();
                document.cookie = "Cmax=" + numTextMax.toString();
                document.cookie = "Crder=" + sortCost;
                document.cookie = "Cvkus=" + activeNameVkus;
                showCroissants(numPage = 1)
            }
            if(category ==='all'){
                document.cookie = "Amin=" + numTextMin.toString();
                document.cookie = "Amax=" + numTextMax.toString();
                document.cookie = "Arder=" + sortCost;
                document.cookie = "Avkus=" + activeNameVkus;

                showAll(numPage = 1)
            }
        }
        )
        request.send();
    }
}
    );

    for (let i = 0; i < 8; i++){//обработка нажатия на элемент, отправляем серверу запрос получаем id продукта его пихаем url чтоб потом знать какую загрузить страницу
        let item_name = 'item'+i
        let pressed_item = 'item'+i.toString()+'_img'
    document.getElementById(pressed_item).addEventListener("click", function (e) {
        e.preventDefault();
        let item_additional_param = document.getElementById(item_name+'_text').textContent
        let cur_name = JSON.stringify({cur_additional_param : item_additional_param});
        var request = new XMLHttpRequest();
        request.open('POST', "/giveIdProduct",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            let recieved = JSON.parse(request.response);
            let recieved2 = JSON.parse(recieved)
        document.location.href = '/item'+recieved2[0]["id_product"];
        }
        )
        request.send(cur_name);
    }
        );

}

for(let i=0;i<8;i++){//обработка нажатия на элемент, отправляем серверу запрос получаем id продукта его пихаем url чтоб потом знать какую загрузить страницу
    let item_name='item'+i.toString()
    let pressed_item = 'item'+i.toString()+'_description'
    document.getElementById(pressed_item).addEventListener("click", function (e) {
        e.preventDefault();
        let item_additional_param = document.getElementById(item_name+'_text').textContent
        let cur_name = JSON.stringify({cur_additional_param : item_additional_param});
        var request = new XMLHttpRequest();
        request.open('POST', "/giveIdProduct",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            let recieved = JSON.parse(request.response);
            let recieved2 = JSON.parse(recieved)
        document.location.href = '/item'+recieved2[0]["id_product"];
        }
        )
        request.send(cur_name);
    }
        );
}

for(let i=0;i<8;i++){
    let item_name='item'+i.toString()
    let pressed_item = 'addToCard'+i.toString()
    let inp ='inp'+i.toString()

    document.getElementById(pressed_item).addEventListener("click", function (e) {
        e.preventDefault();
        if( document.getElementById("auth").textContent !== 'Авторизация' ){
    
            let count_product0 = parseInt(document.getElementById(inp).value );
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
    
        let prod_name = document.getElementById(item_name+'_text').textContent
        let additParam = JSON.stringify({prod_name : prod_name});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveFoolName",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                let recieved = JSON.parse(request.response);
                console.log(recieved)
                if(recieved !==''){
            //TODO обработать получить prod_name Нормальный

//---------------------------------------------отправка зпроса серверу, чтобы сохранить инфу в бд

let cur_order = JSON.stringify({prod_name : recieved, hash : hash, count_product : count_product});
var request2 = new XMLHttpRequest();
request2.open('POST', "/addToCard",true);
request2.setRequestHeader("Content-Type", "application/json");
request2.addEventListener("load", function(){
    console.log(request2.response)
    let res2 = JSON.parse(request2.response)
    console.log(res2)
calculateNumOfGoods()
calculateNumOfGoods()
}
)
request2.send(cur_order);
    //-------------------------------------------------------------------------------------------------

}


            }
            )
            request.send(additParam);
                
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



}




document.getElementById("ASC").addEventListener("click", function (e) {//выбор категории all
    e.preventDefault();
    document.getElementById('DESC').setAttribute('class', 'dropdown-item')
    document.getElementById('ASC').setAttribute('class', 'dropdown-item active')
    
});


document.getElementById("DESC").addEventListener("click", function (e) {//выбор категории all
    e.preventDefault();
    document.getElementById('ASC').setAttribute('class', 'dropdown-item')
    document.getElementById('DESC').setAttribute('class', 'dropdown-item active')
    
    
});


document.getElementById("all").addEventListener("click", function (e) {//выбор категории all
    e.preventDefault();
    let minCost = 0
    let maxCost = 99999
    let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Amin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                minCost = parsingArr[1]
            }
            if(cookieSplited0[i].indexOf('Amax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                maxCost = parsingArr[1]
            }
        }
        if(Number(maxCost) !== 99999){
            document.querySelector('#input_maximum').value = maxCost.toString()
        }
        else{
            document.querySelector('#input_maximum').value = ''
        }
        if(Number(minCost)!== 0){
            document.querySelector('#input_minimum').value = minCost.toString()
        }
        else{
            document.querySelector('#input_minimum').value = ''.toString()
        }
    
                showAll(numPage = 1)
});
document.getElementById("waffles").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
    let minCost = 0
    let maxCost = 99999
    let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Wmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                minCost = parsingArr[1]
            }
            if(cookieSplited0[i].indexOf('Wmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                maxCost = parsingArr[1]
            }
        }
        if(Number(maxCost) !== 99999){
            document.querySelector('#input_maximum').value = maxCost.toString()
        }
        else{
            document.querySelector('#input_maximum').value = ''
        }
        if(Number(minCost)!== 0){
            document.querySelector('#input_minimum').value = minCost.toString()
        }
        else{
            document.querySelector('#input_minimum').value = ''.toString()
        }

    showWaffles(numPage = 1)
        });

document.getElementById("marmalade").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
    let minCost = 0
    let maxCost = 99999
    let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Mmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                minCost = parsingArr[1]
            }
            if(cookieSplited0[i].indexOf('Mmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                maxCost = parsingArr[1]
            }
        }
        if(Number(maxCost) !== 99999){
            document.querySelector('#input_maximum').value = maxCost.toString()
        }
        else{
            document.querySelector('#input_maximum').value = ''
        }
        if(Number(minCost)!== 0){
            document.querySelector('#input_minimum').value = minCost.toString()
        }
        else{
            document.querySelector('#input_minimum').value = ''.toString()
        }

                showMarmalade(numPage = 1)
    });
document.getElementById("croissants").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
    let minCost = 0
    let maxCost = 99999
    let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Cmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                minCost = parsingArr[1]
            }
            if(cookieSplited0[i].indexOf('Cmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                maxCost = parsingArr[1]
            }
        }
        if(Number(maxCost) !== 99999){
            document.querySelector('#input_maximum').value = maxCost.toString()
        }
        else{
            document.querySelector('#input_maximum').value = ''
        }
        if(Number(minCost)!== 0){
            document.querySelector('#input_minimum').value = minCost.toString()
        }
        else{
            document.querySelector('#input_minimum').value = ''.toString()
        }

    showCroissants(numPage = 1)
    });

// обработчики кнопок страниц товаров
document.getElementById("buttonPrevLi").addEventListener("click", function (e) {
    e.preventDefault();
    if(document.getElementById('waffles_class').getAttribute('class') === "nav-item active"){
        showWaffles(1)
    }
    if(document.getElementById('all_class').getAttribute('class') === "nav-item active"){
        if(document.getElementById('buttonPageLi3').getAttribute('class') === "page-item active"){
            showAll(2)
        }
        else{
        showAll(1)
        }
    }
}
    );
document.getElementById("buttonPageLi1").addEventListener("click", function (e) {
    e.preventDefault();
    if(document.getElementById('waffles_class').getAttribute('class') === "nav-item active"){
        showWaffles(1)
    }
    if(document.getElementById('all_class').getAttribute('class') === "nav-item active"){
        showAll(1)
    }
}
    );

document.getElementById("buttonPageLi2").addEventListener("click", function (e) {
    e.preventDefault();
    if(document.getElementById('waffles_class').getAttribute('class') === "nav-item active"){
        showWaffles(2)
    }
    if(document.getElementById('all_class').getAttribute('class') === "nav-item active"){
        showAll(2)
    }});

document.getElementById("buttonPageLi3").addEventListener("click", function (e) {
        e.preventDefault();
        if(document.getElementById('all_class').getAttribute('class') === "nav-item active"){
            showAll(3)
        }});
document.getElementById("buttonNextLi").addEventListener("click", function (e) {
            e.preventDefault();
if(document.getElementById('waffles_class').getAttribute('class') === "nav-item active"){
                showWaffles(2)
    }
if(document.getElementById('all_class').getAttribute('class') === "nav-item active"){
    if(document.getElementById('buttonPageLi1').getAttribute('class') === "page-item active"){
                    showAll(2)
                }
                else{
                showAll(3)
                }
            }
        }
            );


            function createVkusDropDownFull(){
                //let cur_category = JSON.stringify({category: category});
                var request = new XMLHttpRequest();
                request.open('POST', "/loadVkusPerCategory",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    let recieved5 = JSON.parse(request.response);
                    //заполняем производителей вафель
                    let waffNums = 0
                    for(let i =0;i<recieved5.length;i++){
                        if(recieved5[i]["food_type"]==='вафли'){
        
                            var newDiv = document.createElement("div");   
                            let idName = 'menu2_itemWaff'+waffNums.toString() 
                        newDiv.id=idName
                        newDiv.setAttribute('class','dropdown-item')
                        newDiv.innerHTML = recieved5[i]["vkus"];
                        newDiv.setAttribute('style','cursor: pointer;')
                        document.getElementById('menu2').append(newDiv);
                        waffNums++;
                        //обработчик нажатия на вафельку то есть меняем active class
                            document.getElementById(idName).addEventListener("click", function (e) {
                                e.preventDefault();
                            //спрашиваем а сколько всего элментов этого типа
                                var request = new XMLHttpRequest();
                                request.open('POST', "/tasteNumsEachCategory",true);
                                request.setRequestHeader("Content-Type", "application/json");
                                request.addEventListener("load", function(){
                                   var res = request.response
                                   res  = res.substring(1,res.length-1)
                                  var res1 = res.split(';')
                                    for(let i=0;i<Number(res1[0]);i++){
                                        let curr_name = 'menu2_itemWaff'+i.toString() 
                                        document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                    }
                                    document.getElementById('menu2_itemWaffAny').setAttribute('class','dropdown-item')
                                    document.getElementById(idName).setAttribute('class','dropdown-item active')
                                })
                                 request.send();
                            })
                        }
                    }
        
                    var newDiv = document.createElement("div");    
                        newDiv.id='menu2_itemWaffLine'
                        newDiv.setAttribute('class','dropdown-divider')
                        document.getElementById('menu2').append(newDiv);
        
                    var newDiv = document.createElement("div");    
                    newDiv.id='menu2_itemWaffAny'
                    newDiv.setAttribute('class','dropdown-item active')
                    newDiv.innerHTML = 'Любой'
                    newDiv.setAttribute('style','cursor: pointer;')
                    document.getElementById('menu2').append(newDiv);
        
                    document.getElementById('menu2_itemWaffAny').addEventListener("click", function (e) {
                        e.preventDefault();
                    //спрашиваем а сколько всего элментов этого типа
                        var request = new XMLHttpRequest();
                        request.open('POST', "/tasteNumsEachCategory",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                           var res = request.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                            for(let i=0;i<Number(res1[0]);i++){
                                let curr_name = 'menu2_itemWaff'+i.toString() 
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                            }
                            document.getElementById('menu2_itemWaffAny').setAttribute('class','dropdown-item active')
                        })
                         request.send();
                    })
                //заполняем производителей мармелада
                let marmNums = 0
                    for(let i =0;i<recieved5.length;i++){
                        if(recieved5[i]["food_type"]==='мармелад'){
        
                            var newDiv = document.createElement("div");   
                            let idName = 'menu2_itemMarm'+marmNums.toString() 
                        newDiv.id=idName
                        newDiv.setAttribute('class','dropdown-item')
                        newDiv.innerHTML = recieved5[i]["vkus"];
                        newDiv.setAttribute('style','cursor: pointer;')
                        document.getElementById('menu2').append(newDiv);
                        marmNums++;
        
                        document.getElementById(idName).addEventListener("click", function (e) {
                            e.preventDefault();
                        //спрашиваем а сколько всего элментов этого типа
                            var request = new XMLHttpRequest();
                            request.open('POST', "/tasteNumsEachCategory",true);
                            request.setRequestHeader("Content-Type", "application/json");
                            request.addEventListener("load", function(){
                               var res = request.response
                               res  = res.substring(1,res.length-1)
                              var res1 = res.split(';')
                                for(let i=0;i<Number(res1[1]);i++){
                                    let curr_name = 'menu2_itemMarm'+i.toString() 
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }
                                document.getElementById('menu2_itemMarmAny').setAttribute('class','dropdown-item')
                                document.getElementById(idName).setAttribute('class','dropdown-item active')
                            })
                             request.send();
                        })
        
                        }
                    }
        
                    var newDiv = document.createElement("div");    
                        newDiv.id='menu2_itemMarmLine'
                        newDiv.setAttribute('class','dropdown-divider')
                        document.getElementById('menu2').append(newDiv);
        
                    var newDiv = document.createElement("div");    
                    newDiv.id='menu2_itemMarmAny'
                    newDiv.setAttribute('class','dropdown-item active')
                    newDiv.innerHTML = 'Любой'
                    newDiv.setAttribute('style','cursor: pointer;')
                    document.getElementById('menu2').append(newDiv);
        
                    document.getElementById('menu2_itemMarmAny').addEventListener("click", function (e) {
                        e.preventDefault();
                    //спрашиваем а сколько всего элментов этого типа
                        var request = new XMLHttpRequest();
                        request.open('POST', "/tasteNumsEachCategory",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                           var res = request.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                            for(let i=0;i<Number(res1[1]);i++){
                                let curr_name = 'menu2_itemMarm'+i.toString() 
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                            }
                            document.getElementById('menu2_itemMarmAny').setAttribute('class','dropdown-item active')
                        })
                         request.send();
                    })
        
                //заполняем производителей круасанов
                let croisNums = 0
                    for(let i =0;i<recieved5.length;i++){
                        if(recieved5[i]["food_type"]==='круасаны'){
        
                            var newDiv = document.createElement("div");   
                            let idName = 'menu2_itemCrois'+croisNums.toString() 
                        newDiv.id=idName
                        newDiv.setAttribute('class','dropdown-item')
                        newDiv.innerHTML = recieved5[i]["vkus"];
                        newDiv.setAttribute('style','cursor: pointer;')
                        document.getElementById('menu2').append(newDiv);
                        croisNums++;
        
                        document.getElementById(idName).addEventListener("click", function (e) {
                            e.preventDefault();
                        //спрашиваем а сколько всего элментов этого типа
                            var request = new XMLHttpRequest();
                            request.open('POST', "/tasteNumsEachCategory",true);
                            request.setRequestHeader("Content-Type", "application/json");
                            request.addEventListener("load", function(){
                               var res = request.response
                               res  = res.substring(1,res.length-1)
                              var res1 = res.split(';')
                                for(let i=0;i<Number(res1[2]);i++){
                                    let curr_name = 'menu2_itemCrois'+i.toString() 
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }
                                document.getElementById('menu2_itemCroisAny').setAttribute('class','dropdown-item')
                                document.getElementById(idName).setAttribute('class','dropdown-item active')
                            })
                             request.send();
                        })
        
                        }
                    }
        
                    var newDiv = document.createElement("div");    
                        newDiv.id='menu2_itemCroisLine'
                        newDiv.setAttribute('class','dropdown-divider')
                        document.getElementById('menu2').append(newDiv);
        
                    var newDiv = document.createElement("div");    
                    newDiv.id='menu2_itemCroisAny'
                    newDiv.setAttribute('class','dropdown-item active')
                    newDiv.innerHTML = 'Любой'
                    newDiv.setAttribute('style','cursor: pointer;')
                    document.getElementById('menu2').append(newDiv);
        
                    document.getElementById('menu2_itemCroisAny').addEventListener("click", function (e) {
                        e.preventDefault();
                    //спрашиваем а сколько всего элментов этого типа
                        var request = new XMLHttpRequest();
                        request.open('POST', "/tasteNumsEachCategory",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                           var res = request.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                            for(let i=0;i<Number(res1[2]);i++){
                                let curr_name = 'menu2_itemCrois'+i.toString() 
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                            }
                            document.getElementById('menu2_itemCroisAny').setAttribute('class','dropdown-item active')
                        })
                         request.send();
                    })
        
                //заполняем производителей для всех категорий, избавляемся от повторяющихся ъуъ
                let str = ''
                for(let i=0;i<recieved5.length;i++){
                    str+=recieved5[i]["vkus"]+';'
                }
                str = str.substring(0,str.length-1)
                var arr = str.split(';')
                let result = [];
        
                 for (let str1 of arr) {
                    if (!result.includes(str1)) {
                    result.push(str1);
                    }
                }
                let allNum = 0;
                for(let i =0;i<result.length;i++){//основной цикл заполнения all
                    var newDiv = document.createElement("div");   
                    let idName = 'menu2_itemAll'+allNum.toString() 
                newDiv.id=idName
                newDiv.setAttribute('class','dropdown-item')
                newDiv.innerHTML = result[i]
                newDiv.setAttribute('style','cursor: pointer;')
                document.getElementById('menu2').append(newDiv);
                allNum++;
        
                document.getElementById(idName).addEventListener("click", function (e) {
                    e.preventDefault();
                //спрашиваем а сколько всего элментов этого типа
                    var request = new XMLHttpRequest();
                    request.open('POST', "/tasteNumsEachCategory",true);
                    request.setRequestHeader("Content-Type", "application/json");
                    request.addEventListener("load", function(){
                       var res = request.response
                       res  = res.substring(1,res.length-1)
                      var res1 = res.split(';')
                        for(let i=0;i<Number(res1[3]);i++){
                            let curr_name = 'menu2_itemAll'+i.toString() 
                            document.getElementById(curr_name).setAttribute('class','dropdown-item')
                        }
                        document.getElementById('menu2_itemAllAny').setAttribute('class','dropdown-item')
                        document.getElementById(idName).setAttribute('class','dropdown-item active')
                    })
                     request.send();
                })
        
                }
        
                var newDiv = document.createElement("div");    
                        newDiv.id='menu2_itemAllLine'
                        newDiv.setAttribute('class','dropdown-divider')
                        document.getElementById('menu2').append(newDiv);
        
                    var newDiv = document.createElement("div");    
                    newDiv.id='menu2_itemAllAny'
                    newDiv.setAttribute('class','dropdown-item active')
                    newDiv.innerHTML = 'Любой'
                    newDiv.setAttribute('style','cursor: pointer;')
                    document.getElementById('menu2').append(newDiv);
        
                    document.getElementById('menu2_itemAllAny').addEventListener("click", function (e) {
                        e.preventDefault();
                    //спрашиваем а сколько всего элментов этого типа
                        var request = new XMLHttpRequest();
                        request.open('POST', "/tasteNumsEachCategory",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                           var res = request.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                            for(let i=0;i<Number(res1[3]);i++){
                                let curr_name = 'menu2_itemAll'+i.toString() 
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                            }
                            document.getElementById('menu2_itemAllAny').setAttribute('class','dropdown-item active')
                        })
                         request.send();
                    })


                    let cookieString = document.cookie
                        let Amin_start = 0
                        let Amax_start = 99999
                        let Avkus_start = '-'

                        let Wvkus_start = '-'

                        let Mvkus_start = '-'

                        let Cvkus_start = '-'
                        var cookieSplited0 = cookieString.split(';')
                        for(let i =0;i<cookieSplited0.length;i++){
                            if(cookieSplited0[i].indexOf('Amin')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Amin_start = parsingArr[1]
                                }
                            }
                            if(cookieSplited0[i].indexOf('Amax')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Amax_start = parsingArr[1]
                                }
                            }
                            if(cookieSplited0[i].indexOf('Avkus')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Avkus_start = parsingArr[1]
                                }
                            }

                            if(cookieSplited0[i].indexOf('Wvkus')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Wvkus_start = parsingArr[1]
                                }
                            }

                            if(cookieSplited0[i].indexOf('Mvkus')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Mvkus_start = parsingArr[1]
                                }
                            }

                            if(cookieSplited0[i].indexOf('Cvkus')!==-1){
                                var parsingArr = cookieSplited0[i].split('=')
                                if(parsingArr[1]!==''){
                                    Cvkus_start = parsingArr[1]
                                }
                            }

                        }
                    if(Number(Amin_start) !== 0){
                    document.querySelector('#input_minimum').value = Amin_start.toString()
                    }
                    if(Number(Amax_start) !== 99999){
                    document.querySelector('#input_maximum').value = Amax_start.toString()
                    }
                    //let curr_name = 'menu2_itemCrois'+i.toString() 
                    var request3 = new XMLHttpRequest();
                        request3.open('POST', "/tasteNumsEachCategory",true);
                        request3.setRequestHeader("Content-Type", "application/json");
                        request3.addEventListener("load", function(){
                           var res = request3.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                          if(Avkus_start !=='-'){
                            for(let i=0;i<Number(res1[3]);i++){
                                let curr_name = 'menu2_itemAll'+i.toString() 
                                if(document.getElementById(curr_name).textContent !== Avkus_start){
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }else{
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item active')
                                }
                            }
                            document.getElementById('menu2_itemAllAny').setAttribute('class','dropdown-item')
                        }

                        if(Wvkus_start !=='-'){
                            for(let i=0;i<Number(res1[0]);i++){
                                let curr_name = 'menu2_itemWaff'+i.toString() 
                                if(document.getElementById(curr_name).textContent !== Wvkus_start){
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }else{
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item active')
                                }
                            }
                            document.getElementById('menu2_itemWaffAny').setAttribute('class','dropdown-item')
                        }

                        if(Mvkus_start !=='-'){
                            for(let i=0;i<Number(res1[1]);i++){
                                let curr_name = 'menu2_itemMarm'+i.toString() 
                                if(document.getElementById(curr_name).textContent !== Mvkus_start){
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }else{
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item active')
                                }
                            }
                            document.getElementById('menu2_itemMarmAny').setAttribute('class','dropdown-item')
                        }


                        if(Cvkus_start !=='-'){
                            for(let i=0;i<Number(res1[2]);i++){
                                let curr_name = 'menu2_itemCrois'+i.toString() 
                                if(document.getElementById(curr_name).textContent !== Cvkus_start){
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                                }else{
                                    document.getElementById(curr_name).setAttribute('class','dropdown-item active')
                                }
                            }
                            document.getElementById('menu2_itemCroisAny').setAttribute('class','dropdown-item')
                        }
                        showAll(1)
                        })
                         request3.send();
                    
                })
                request.send();
            }
        


    function createTastesDropDown1(category){

        var request = new XMLHttpRequest();
        request.open('POST', "/tasteNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            //во-первых, убираем отображение всех элементов
            var res1 = res.split(';')

            for(let i=0;i<Number(res1[0]);i++){
                let nameWaff = 'menu2_itemWaff' + i.toString()
                document.getElementById(nameWaff).style.display = 'none'
            }
            for(let i=0;i<Number(res1[1]);i++){
                let nameMarm = 'menu2_itemMarm' + i.toString()
                document.getElementById(nameMarm).style.display = 'none'
            }
            for(let i=0;i<Number(res1[2]);i++){
                let nameCrois = 'menu2_itemCrois' + i.toString()
                document.getElementById(nameCrois).style.display = 'none'
            }
            for(let i=0;i<Number(res1[3]);i++){
                let nameAll = 'menu2_itemAll' + i.toString()
                document.getElementById(nameAll).style.display = 'none'
            }
            document.getElementById('menu2_itemWaffLine').style.display = 'none'
            document.getElementById('menu2_itemWaffAny').style.display = 'none'
            document.getElementById('menu2_itemMarmLine').style.display = 'none'
            document.getElementById('menu2_itemMarmAny').style.display = 'none'
            document.getElementById('menu2_itemCroisLine').style.display = 'none'
            document.getElementById('menu2_itemCroisAny').style.display = 'none'
            document.getElementById('menu2_itemAllLine').style.display = 'none'
            document.getElementById('menu2_itemAllAny').style.display = 'none'
            //а теперь полетели отобразим те элементы которые нам нужны в данный момент
            if(category ==='вафли'){
                for(let i = 0;i< Number(res1[0]);i++){
                    let currName = 'menu2_itemWaff' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu2_itemWaffLine').style.display = 'initial'
                document.getElementById('menu2_itemWaffAny').style.display = 'initial'
                document.getElementById('menu2_itemWaffLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu2_itemWaffAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='мармелад'){
                for(let i = 0;i< Number(res1[1]);i++){
                    let currName = 'menu2_itemMarm' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu2_itemMarmLine').style.display = 'initial'
                document.getElementById('menu2_itemMarmAny').style.display = 'initial'
                document.getElementById('menu2_itemMarmLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu2_itemMarmAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='круасаны'){
                for(let i = 0;i< Number(res1[2]);i++){
                    let currName = 'menu2_itemCrois' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu2_itemCroisLine').style.display = 'initial'
                document.getElementById('menu2_itemCroisAny').style.display = 'initial'
                document.getElementById('menu2_itemCroisLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu2_itemCroisAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='круасаны'){
                for(let i = 0;i< Number(res1[2]);i++){
                    let currName = 'menu2_itemCrois' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu2_itemCroisLine').style.display = 'initial'
                document.getElementById('menu2_itemCroisAny').style.display = 'initial'
                document.getElementById('menu2_itemCroisLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu2_itemCroisAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='all'){
                for(let i = 0;i< Number(res1[3]);i++){
                    let currName = 'menu2_itemAll' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu2_itemAllLine').style.display = 'initial'
                document.getElementById('menu2_itemAllAny').style.display = 'initial'
                document.getElementById('menu2_itemAllLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu2_itemAllAny').setAttribute('style','width=100%;cursor: pointer;')
            }
        })
        request.send();
    }

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------К-О-Н-Е-Ц---О-Б-Р-А-Б-О-Т-Ч-И-К-О-В-----Ф-И-Л-Ь-Т-Р-О-В------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
   

    function showWaffles(numPage){
        document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
        document.getElementById('croissants_class').setAttribute('class', 'nav-item')
        document.getElementById('all_class').setAttribute('class', 'nav-item')
        document.getElementById('waffles_class').setAttribute('class', 'nav-item active')

        let category= 'вафли'
        let minCost= 0
        let maxCost  =10000
        let sortOrder = 'ASC'
        let vkus = '-'
        let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Wmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                    minCost = parsingArr[1]
                }
                
            }
            if(cookieSplited0[i].indexOf('Wmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                maxCost = parsingArr[1]
                }
            }
            if(cookieSplited0[i].indexOf('Wrder')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                sortOrder = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Wvkus')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                vkus = parsingArr[1]
            }}
        }
        let cur_category = JSON.stringify({category: category, minCost : minCost, maxCost : maxCost, sortOrder : sortOrder, vkus : vkus});
                var request = new XMLHttpRequest();
                let recieved = ''
                request.open('POST', "/loadMainPage",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    let recieved = JSON.parse(request.response);
                    let recieved2 = JSON.parse(recieved)
                    
                    var pages = Math.trunc(recieved2.length/8)
                    if(recieved2.length > pages*8){
                        pages=pages+1
                    }
                    switchPage(numPage, pages)
                    if(recieved ==='false'){
                        for(let k = 0; k < 8;k++){
                            let param_name2='item'+k 
                            document.getElementById(param_name2).style.display = "none"
                        }
                        showAlert('товаров не найдено')
                    }
                    else{
                        let i =0 + (numPage-1)*8
                        while((i<8 +(numPage-1)*8) &&(i<recieved2.length)){

                            let param_name='item'+(i - (numPage-1)*8)
                            document.getElementById(param_name).style.display = "initial"
                        document.getElementById(param_name + '_text').textContent=recieved2[i]["additional_params"];
                        document.getElementById(param_name + '_text2').textContent=recieved2[i]["short_name"];
                        document.getElementById(param_name +'_pic').src=recieved2[i]["picture1"];
                        document.getElementById(param_name +'_cost').textContent=recieved2[i]["current_cost"] + '₽';
                        if(recieved2[i]["current_cost"] === recieved2[i]["old_cost"]){
                           document.getElementById(param_name+'_discount').textContent='';
                        }
                        else{
                      let percent = Math.trunc((1 - (recieved2[i]["current_cost"] / recieved2[i]["old_cost"]))*100)
                            document.getElementById(param_name+'_discount').textContent='-'+percent +'%';
                        }
                        i=i+1
                    }
                    if(i!=8+(numPage-1)*8){
                        for(let k = i - (numPage-1)*8; k < 8;k++){
                            let param_name2='item'+k
                            document.getElementById(param_name2).style.display = "none"
                        }
                    }
            }
            let cat = 'вафли'
            createTastesDropDown1(cat)
                })
                request.send(cur_category);
    }

        

        function showMarmalade(numPage){
            document.getElementById('croissants_class').setAttribute('class', 'nav-item')
            document.getElementById('all_class').setAttribute('class', 'nav-item')
            document.getElementById('waffles_class').setAttribute('class', 'nav-item')
            document.getElementById('marmalade_class').setAttribute('class', 'nav-item active')

            let category= 'мармелад'
            let minCost= 0
        let maxCost  =10000
        let sortOrder = 'ASC'
        let vkus = '-'
        let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Mmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                minCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Mmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                maxCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Mrder')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                sortOrder = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Mvkus')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                vkus = parsingArr[1]
            }}
        }
        let cur_category = JSON.stringify({category: category, minCost : minCost, maxCost : maxCost, sortOrder : sortOrder, vkus : vkus});
                var request = new XMLHttpRequest();
                let recieved = ''
                request.open('POST', "/loadMainPage",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    let recieved = JSON.parse(request.response);
                    let recieved2 = JSON.parse(recieved)
                    var pages = Math.trunc(recieved2.length/8)
                    if(recieved2.length > pages*8){
                        pages=pages+1
                    }
                    switchPage(numPage, pages)
                    if(recieved ==='false'){
                        for(let k = 0; k < 8;k++){
                            let param_name2='item'+k 
                            document.getElementById(param_name2).style.display = "none"
                        }
                        showAlert('товаров не найдено')
                    }
                    else{
                        let i =0 + (numPage-1)*8
                        while((i<8 +(numPage-1)*8) &&(i<recieved2.length)){

                            let param_name='item'+(i - (numPage-1)*8)
                            document.getElementById(param_name).style.display = "initial"
                        document.getElementById(param_name + '_text').textContent=recieved2[i]["additional_params"];
                        document.getElementById(param_name + '_text2').textContent=recieved2[i]["short_name"];
                        document.getElementById(param_name +'_pic').src=recieved2[i]["picture1"];
                        document.getElementById(param_name +'_cost').textContent=recieved2[i]["current_cost"] + '₽';
                        if(recieved2[i]["current_cost"] === recieved2[i]["old_cost"]){
                           document.getElementById(param_name+'_discount').textContent='';
                        }
                        else{
                      let percent = Math.trunc((1 - (recieved2[i]["current_cost"] / recieved2[i]["old_cost"]))*100)
                            document.getElementById(param_name+'_discount').textContent='-'+percent +'%';
                        }
                        i=i+1
                    }
                    if(i!=8+(numPage-1)*8){
                        for(let k = i - (numPage-1)*8; k < 8;k++){
                            let param_name2='item'+k
                            document.getElementById(param_name2).style.display = "none"
                        }
                    }
            }
            let cat= 'мармелад'
            createTastesDropDown1(cat)
                })
                request.send(cur_category);
    }

            function showCroissants(numPage){
                document.getElementById('all_class').setAttribute('class', 'nav-item')
                document.getElementById('waffles_class').setAttribute('class', 'nav-item')
                document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
                document.getElementById('croissants_class').setAttribute('class', 'nav-item active')
               
                let category= 'круасаны'
                let minCost= 0
        let maxCost  =10000
        let sortOrder = 'ASC'
        let vkus = '-'
        let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Cmin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                minCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Cmax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                maxCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Crder')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                sortOrder = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Cvkus')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                vkus = parsingArr[1]
            }}
        }
        let cur_category = JSON.stringify({category: category, minCost : minCost, maxCost : maxCost, sortOrder : sortOrder, vkus : vkus});
                var request = new XMLHttpRequest();
                let recieved = ''
                request.open('POST', "/loadMainPage",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                    let recieved = JSON.parse(request.response);
                    let recieved2 = JSON.parse(recieved)
                    var pages = Math.trunc(recieved2.length/8)
                    if(recieved2.length > pages*8){
                        pages=pages+1
                    }
                    switchPage(numPage, pages)
                    if(recieved ==='false'){
                        for(let k = 0; k < 8;k++){
                            let param_name2='item'+k 
                            document.getElementById(param_name2).style.display = "none"
                        }
                        showAlert('товаров не найдено')
                    }
                    else{
                        let i =0 + (numPage-1)*8
                        while((i<8 +(numPage-1)*8) &&(i<recieved2.length)){

                            let param_name='item'+(i - (numPage-1)*8)
                            document.getElementById(param_name).style.display = "initial"
                        document.getElementById(param_name + '_text').textContent=recieved2[i]["additional_params"];
                        document.getElementById(param_name + '_text2').textContent=recieved2[i]["short_name"];
                        document.getElementById(param_name +'_pic').src=recieved2[i]["picture1"];
                        document.getElementById(param_name +'_cost').textContent=recieved2[i]["current_cost"] + '₽';
                        if(recieved2[i]["current_cost"] === recieved2[i]["old_cost"]){
                           document.getElementById(param_name+'_discount').textContent='';
                        }
                        else{
                      let percent = Math.trunc((1 - (recieved2[i]["current_cost"] / recieved2[i]["old_cost"]))*100)
                            document.getElementById(param_name+'_discount').textContent='-'+percent +'%';
                        }
                        i=i+1
                    }
                    if(i!=8+(numPage-1)*8){
                        for(let k = i - (numPage-1)*8; k < 8;k++){
                            let param_name2='item'+k
                            document.getElementById(param_name2).style.display = "none"
                        }
                    }
            }
            let cat= 'круасаны'
            createTastesDropDown1(cat)
                })
                request.send(cur_category);
    }

    function showAll(numPage){
        document.getElementById('waffles_class').setAttribute('class', 'nav-item')
        document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
        document.getElementById('croissants_class').setAttribute('class', 'nav-item')
        document.getElementById('all_class').setAttribute('class', 'nav-item active')

        let category= 'all'
        let minCost= 0
        let maxCost  =10000
        let sortOrder = 'ASC'
        let vkus = '-'
        let cookieString = document.cookie
        var cookieSplited0 = cookieString.split(';')
        for(let i =0;i<cookieSplited0.length;i++){
            if(cookieSplited0[i].indexOf('Amin')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                minCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Amax')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                maxCost = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Arder')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                sortOrder = parsingArr[1]
            }}
            if(cookieSplited0[i].indexOf('Avkus')!==-1){
                var parsingArr = cookieSplited0[i].split('=')
                if(parsingArr[1]!==''){
                vkus = parsingArr[1]
            }}
        }
        /*
        console.log('minCost: '+minCost)
        console.log('maxCost: '+maxCost)
        console.log('sortOrder: '+sortOrder)
        console.log('vkus: '+vkus)
        */
        let cur_category = JSON.stringify({category: category, minCost : minCost, maxCost : maxCost, sortOrder : sortOrder, vkus : vkus});
    var request = new XMLHttpRequest();
    let recieved = ''
    request.open('POST', "/loadMainPage",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function(){
        let recieved = JSON.parse(request.response);
        let recieved2 = JSON.parse(recieved)
        var pages = Math.trunc(recieved2.length/8)
                    if(recieved2.length > pages*8){
                        pages=pages+1
                    }
                    switchPage(numPage, pages)
                    if(recieved ==='false'){
                        for(let k = 0; k < 8;k++){
                            let param_name2='item'+k 
                            document.getElementById(param_name2).style.display = "none"
                        }
                        showAlert('товаров не найдено')
                    }
                    else{
                        let i =0 + (numPage-1)*8
                        while((i<8 +(numPage-1)*8) &&(i<recieved2.length)){

                            let param_name='item'+(i - (numPage-1)*8)
                            document.getElementById(param_name).style.display = "initial"
                        document.getElementById(param_name + '_text').textContent=recieved2[i]["additional_params"];
                        document.getElementById(param_name + '_text2').textContent=recieved2[i]["short_name"];
                        document.getElementById(param_name +'_pic').src=recieved2[i]["picture1"];
                        document.getElementById(param_name +'_cost').textContent=recieved2[i]["current_cost"] + '₽';
                        if(recieved2[i]["current_cost"] === recieved2[i]["old_cost"]){
                           document.getElementById(param_name+'_discount').textContent='';
                        }
                        else{
                      let percent = Math.trunc((1 - (recieved2[i]["current_cost"] / recieved2[i]["old_cost"]))*100)
                            document.getElementById(param_name+'_discount').textContent='-'+percent +'%';
                        }
                        i=i+1
                    }
                    if(i!=8+(numPage-1)*8){
                        for(let k = i - (numPage-1)*8; k < 8;k++){
                            let param_name2='item'+k
                            document.getElementById(param_name2).style.display = "none"
                        }
                    }
            }
            let cat= 'all'
            createTastesDropDown1(category)
            
            
                })
                
                request.send(cur_category);
    }

                function switchPage(curentPage, numPages){
                    document.getElementById("buttonPageLi1").style.display = "initial"
                    if(numPages >= 2){
                        document.getElementById("buttonPageLi2").style.display = "initial"
                    }
                    else{
                        document.getElementById("buttonPageLi2").style.display = "none"
                    }
                    if(numPages>=3){
                        document.getElementById("buttonPageLi3").style.display = "initial"
                    }
                    else{
                        document.getElementById("buttonPageLi3").style.display = "none"
                    }
                    if(curentPage === numPages){
                        document.getElementById("buttonNextLi").setAttribute('class', 'page-item disabled')
                    }
                    else{
                        document.getElementById("buttonNextLi").setAttribute('class', 'page-item')
                    }
                    if(curentPage === 1){
                        document.getElementById("buttonPageLi1").setAttribute('class', 'page-item active')
                        document.getElementById("buttonPageLi2").setAttribute('class', 'page-item')
                        document.getElementById("buttonPageLi3").setAttribute('class', 'page-item')  
                        document.getElementById("buttonPrevLi").setAttribute('class', 'page-item disabled') 
                    }
                    else{
                        document.getElementById("buttonPrevLi").setAttribute('class', 'page-item')
                    }
                    if(curentPage === 2){
                        document.getElementById("buttonPageLi1").setAttribute('class', 'page-item')
                        document.getElementById("buttonPageLi2").setAttribute('class', 'page-item active')
                        document.getElementById("buttonPageLi3").setAttribute('class', 'page-item')   
                    }
                    if(curentPage === 3){
                        document.getElementById("buttonPageLi1").setAttribute('class', 'page-item')
                        document.getElementById("buttonPageLi2").setAttribute('class', 'page-item')   
                        document.getElementById("buttonPageLi3").setAttribute('class', 'page-item active')
                    }
                }

