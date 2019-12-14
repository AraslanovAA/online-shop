function funcOnLoad(){
    createProizvoditelDropDownFull()
    showAll(1)
    getUserName();
};
/*

*/
document.getElementById('button_accept').addEventListener("click", function (e) {
    e.preventDefault();
    
    //document.getElementById('button_general_color')
    alert(document.getElementById('menu2').getElementsByTagName('div').length)
}
    );
    

    for (let i = 0; i < 8; i++){//обработка нажатия на элемент, отправляем серверу запрос получаем id продукта его пихаем url чтоб потом знать какую загрузить страницу
        let item_name = 'item'+i
    document.getElementById(item_name).addEventListener("click", function (e) {
        e.preventDefault();
        let item_additional_param = document.getElementById(item_name+'_text').textContent
        let cur_name = JSON.stringify({cur_additional_param : item_additional_param});
        var request = new XMLHttpRequest();
        request.open('POST', "/giveIdProduct",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            let recieved = JSON.parse(request.response);
            let recieved2 = JSON.parse(recieved)
        console.log('получили от сервереа id продукта: ' + recieved2[0]["id_product"]);
        document.location.href = '/item'+recieved2[0]["id_product"];
        }
        )
        request.send(cur_name);
    }
        );

}

document.getElementById("all").addEventListener("click", function (e) {//выбор категории all
    e.preventDefault();
    showAll(1)    
});
document.getElementById("waffles").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
        showWaffles(1)
        });

document.getElementById("marmalade").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
    showMarmalade(1)
    });
document.getElementById("croissants").addEventListener("click", function (e) {//выбор категории вафли
    e.preventDefault();
     showCroissants(1)
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
    function createProizvoditelDropDownFull(){
        //let cur_category = JSON.stringify({category: category});
        var request = new XMLHttpRequest();
        request.open('POST', "/loadProizvoditelPerCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            let recieved5 = JSON.parse(request.response);
            console.log(request.response)
            //заполняем производителей вафель
            let waffNums = 0
            for(let i =0;i<recieved5.length;i++){
                if(recieved5[i]["food_type"]==='вафли'){

                    var newDiv = document.createElement("div");   
                    let idName = 'menu1_itemWaff'+waffNums.toString() 
                newDiv.id=idName
                newDiv.setAttribute('class','dropdown-item')
                newDiv.innerHTML = recieved5[i]["proizvoditel"];
                newDiv.setAttribute('style','cursor: pointer;')
                document.getElementById('menu1').append(newDiv);
                waffNums++;
                //обработчик нажатия на вафельку то есть меняем active class
                    document.getElementById(idName).addEventListener("click", function (e) {
                        e.preventDefault();
                    //спрашиваем а сколько всего элментов этого типа
                        var request = new XMLHttpRequest();
                        request.open('POST', "/fabricNumsEachCategory",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                           var res = request.response
                           res  = res.substring(1,res.length-1)
                          var res1 = res.split(';')
                            for(let i=0;i<Number(res1[0]);i++){
                                let curr_name = 'menu1_itemWaff'+i.toString() 
                                document.getElementById(curr_name).setAttribute('class','dropdown-item')
                            }
                            document.getElementById('menu1_itemWaffAny').setAttribute('class','dropdown-item')
                            document.getElementById(idName).setAttribute('class','dropdown-item active')
                        })
                         request.send();
                    })
                }
            }

            var newDiv = document.createElement("div");    
                newDiv.id='menu1_itemWaffLine'
                newDiv.setAttribute('class','dropdown-divider')
                document.getElementById('menu1').append(newDiv);

            var newDiv = document.createElement("div");    
            newDiv.id='menu1_itemWaffAny'
            newDiv.setAttribute('class','dropdown-item active')
            newDiv.innerHTML = 'Любой'
            newDiv.setAttribute('style','cursor: pointer;')
            document.getElementById('menu1').append(newDiv);

            document.getElementById('menu1_itemWaffAny').addEventListener("click", function (e) {
                e.preventDefault();
            //спрашиваем а сколько всего элментов этого типа
                var request = new XMLHttpRequest();
                request.open('POST', "/fabricNumsEachCategory",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                   var res = request.response
                   res  = res.substring(1,res.length-1)
                  var res1 = res.split(';')
                    for(let i=0;i<Number(res1[0]);i++){
                        let curr_name = 'menu1_itemWaff'+i.toString() 
                        document.getElementById(curr_name).setAttribute('class','dropdown-item')
                    }
                    document.getElementById('menu1_itemWaffAny').setAttribute('class','dropdown-item active')
                })
                 request.send();
            })
        //заполняем производителей мармелада
        let marmNums = 0
            for(let i =0;i<recieved5.length;i++){
                if(recieved5[i]["food_type"]==='мармелад'){

                    var newDiv = document.createElement("div");   
                    let idName = 'menu1_itemMarm'+marmNums.toString() 
                newDiv.id=idName
                newDiv.setAttribute('class','dropdown-item')
                newDiv.innerHTML = recieved5[i]["proizvoditel"];
                newDiv.setAttribute('style','cursor: pointer;')
                document.getElementById('menu1').append(newDiv);
                marmNums++;

                document.getElementById(idName).addEventListener("click", function (e) {
                    e.preventDefault();
                //спрашиваем а сколько всего элментов этого типа
                    var request = new XMLHttpRequest();
                    request.open('POST', "/fabricNumsEachCategory",true);
                    request.setRequestHeader("Content-Type", "application/json");
                    request.addEventListener("load", function(){
                       var res = request.response
                       res  = res.substring(1,res.length-1)
                      var res1 = res.split(';')
                        for(let i=0;i<Number(res1[1]);i++){
                            let curr_name = 'menu1_itemMarm'+i.toString() 
                            document.getElementById(curr_name).setAttribute('class','dropdown-item')
                        }
                        document.getElementById('menu1_itemMarmAny').setAttribute('class','dropdown-item')
                        document.getElementById(idName).setAttribute('class','dropdown-item active')
                    })
                     request.send();
                })

                }
            }

            var newDiv = document.createElement("div");    
                newDiv.id='menu1_itemMarmLine'
                newDiv.setAttribute('class','dropdown-divider')
                document.getElementById('menu1').append(newDiv);

            var newDiv = document.createElement("div");    
            newDiv.id='menu1_itemMarmAny'
            newDiv.setAttribute('class','dropdown-item active')
            newDiv.innerHTML = 'Любой'
            newDiv.setAttribute('style','cursor: pointer;')
            document.getElementById('menu1').append(newDiv);

            document.getElementById('menu1_itemMarmAny').addEventListener("click", function (e) {
                e.preventDefault();
            //спрашиваем а сколько всего элментов этого типа
                var request = new XMLHttpRequest();
                request.open('POST', "/fabricNumsEachCategory",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                   var res = request.response
                   res  = res.substring(1,res.length-1)
                  var res1 = res.split(';')
                    for(let i=0;i<Number(res1[1]);i++){
                        let curr_name = 'menu1_itemMarm'+i.toString() 
                        document.getElementById(curr_name).setAttribute('class','dropdown-item')
                    }
                    document.getElementById('menu1_itemMarmAny').setAttribute('class','dropdown-item active')
                })
                 request.send();
            })

        //заполняем производителей круасанов
        let croisNums = 0
            for(let i =0;i<recieved5.length;i++){
                if(recieved5[i]["food_type"]==='круасаны'){

                    var newDiv = document.createElement("div");   
                    let idName = 'menu1_itemCrois'+croisNums.toString() 
                newDiv.id=idName
                newDiv.setAttribute('class','dropdown-item')
                newDiv.innerHTML = recieved5[i]["proizvoditel"];
                newDiv.setAttribute('style','cursor: pointer;')
                document.getElementById('menu1').append(newDiv);
                croisNums++;

                document.getElementById(idName).addEventListener("click", function (e) {
                    e.preventDefault();
                //спрашиваем а сколько всего элментов этого типа
                    var request = new XMLHttpRequest();
                    request.open('POST', "/fabricNumsEachCategory",true);
                    request.setRequestHeader("Content-Type", "application/json");
                    request.addEventListener("load", function(){
                       var res = request.response
                       res  = res.substring(1,res.length-1)
                      var res1 = res.split(';')
                        for(let i=0;i<Number(res1[2]);i++){
                            let curr_name = 'menu1_itemCrois'+i.toString() 
                            document.getElementById(curr_name).setAttribute('class','dropdown-item')
                        }
                        document.getElementById('menu1_itemCroisAny').setAttribute('class','dropdown-item')
                        document.getElementById(idName).setAttribute('class','dropdown-item active')
                    })
                     request.send();
                })

                }
            }

            var newDiv = document.createElement("div");    
                newDiv.id='menu1_itemCroisLine'
                newDiv.setAttribute('class','dropdown-divider')
                document.getElementById('menu1').append(newDiv);

            var newDiv = document.createElement("div");    
            newDiv.id='menu1_itemCroisAny'
            newDiv.setAttribute('class','dropdown-item active')
            newDiv.innerHTML = 'Любой'
            newDiv.setAttribute('style','cursor: pointer;')
            document.getElementById('menu1').append(newDiv);

            document.getElementById('menu1_itemCroisAny').addEventListener("click", function (e) {
                e.preventDefault();
            //спрашиваем а сколько всего элментов этого типа
                var request = new XMLHttpRequest();
                request.open('POST', "/fabricNumsEachCategory",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                   var res = request.response
                   res  = res.substring(1,res.length-1)
                  var res1 = res.split(';')
                    for(let i=0;i<Number(res1[2]);i++){
                        let curr_name = 'menu1_itemCrois'+i.toString() 
                        document.getElementById(curr_name).setAttribute('class','dropdown-item')
                    }
                    document.getElementById('menu1_itemCroisAny').setAttribute('class','dropdown-item active')
                })
                 request.send();
            })


        //заполняем производителей для всех категорий, избавляемся от повторяющихся ъуъ
        let str = ''
        for(let i=0;i<recieved5.length;i++){
            str+=recieved5[i]["proizvoditel"]+';'
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
            let idName = 'menu1_itemAll'+allNum.toString() 
        newDiv.id=idName
        newDiv.setAttribute('class','dropdown-item')
        newDiv.innerHTML = result[i]
        newDiv.setAttribute('style','cursor: pointer;')
        document.getElementById('menu1').append(newDiv);
        allNum++;

        document.getElementById(idName).addEventListener("click", function (e) {
            e.preventDefault();
        //спрашиваем а сколько всего элментов этого типа
            var request = new XMLHttpRequest();
            request.open('POST', "/fabricNumsEachCategory",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
               var res = request.response
               res  = res.substring(1,res.length-1)
              var res1 = res.split(';')
                for(let i=0;i<Number(res1[3]);i++){
                    let curr_name = 'menu1_itemAll'+i.toString() 
                    document.getElementById(curr_name).setAttribute('class','dropdown-item')
                }
                document.getElementById('menu1_itemAllAny').setAttribute('class','dropdown-item')
                document.getElementById(idName).setAttribute('class','dropdown-item active')
            })
             request.send();
        })

        }

        var newDiv = document.createElement("div");    
                newDiv.id='menu1_itemAllLine'
                newDiv.setAttribute('class','dropdown-divider')
                document.getElementById('menu1').append(newDiv);

            var newDiv = document.createElement("div");    
            newDiv.id='menu1_itemAllAny'
            newDiv.setAttribute('class','dropdown-item active')
            newDiv.innerHTML = 'Любой'
            newDiv.setAttribute('style','cursor: pointer;')
            document.getElementById('menu1').append(newDiv);


            document.getElementById('menu1_itemAllAny').addEventListener("click", function (e) {
                e.preventDefault();
            //спрашиваем а сколько всего элментов этого типа
                var request = new XMLHttpRequest();
                request.open('POST', "/fabricNumsEachCategory",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                   var res = request.response
                   res  = res.substring(1,res.length-1)
                  var res1 = res.split(';')
                    for(let i=0;i<Number(res1[3]);i++){
                        let curr_name = 'menu1_itemAll'+i.toString() 
                        document.getElementById(curr_name).setAttribute('class','dropdown-item')
                    }
                    document.getElementById('menu1_itemAllAny').setAttribute('class','dropdown-item active')
                })
                 request.send();
            })

        })
        request.send();
    }

    function createFabricatorDropDown1(category){

        var request = new XMLHttpRequest();
        request.open('POST', "/fabricNumsEachCategory",true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function(){
            var res = request.response
            res  = res.substring(1,res.length-1)
            //во-первых, убираем отображение всех элементов
            var res1 = res.split(';')

            for(let i=0;i<Number(res1[0]);i++){
                let nameWaff = 'menu1_itemWaff' + i.toString()
                document.getElementById(nameWaff).style.display = 'none'
            }
            for(let i=0;i<Number(res1[1]);i++){
                let nameMarm = 'menu1_itemMarm' + i.toString()
                document.getElementById(nameMarm).style.display = 'none'
            }
            for(let i=0;i<Number(res1[2]);i++){
                let nameCrois = 'menu1_itemCrois' + i.toString()
                document.getElementById(nameCrois).style.display = 'none'
            }
            for(let i=0;i<Number(res1[3]);i++){
                let nameAll = 'menu1_itemAll' + i.toString()
                document.getElementById(nameAll).style.display = 'none'
            }
            document.getElementById('menu1_itemWaffLine').style.display = 'none'
            document.getElementById('menu1_itemWaffAny').style.display = 'none'
            document.getElementById('menu1_itemMarmLine').style.display = 'none'
            document.getElementById('menu1_itemMarmAny').style.display = 'none'
            document.getElementById('menu1_itemCroisLine').style.display = 'none'
            document.getElementById('menu1_itemCroisAny').style.display = 'none'
            document.getElementById('menu1_itemAllLine').style.display = 'none'
            document.getElementById('menu1_itemAllAny').style.display = 'none'
            //а теперь полетели отобразим те элементы которые нам нужны в данный момент
            if(category ==='вафли'){
                for(let i = 0;i< Number(res1[0]);i++){
                    let currName = 'menu1_itemWaff' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu1_itemWaffLine').style.display = 'initial'
                document.getElementById('menu1_itemWaffAny').style.display = 'initial'
                document.getElementById('menu1_itemWaffLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu1_itemWaffAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='мармелад'){
                for(let i = 0;i< Number(res1[1]);i++){
                    let currName = 'menu1_itemMarm' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu1_itemMarmLine').style.display = 'initial'
                document.getElementById('menu1_itemMarmAny').style.display = 'initial'
                document.getElementById('menu1_itemMarmLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu1_itemMarmAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='круасаны'){
                for(let i = 0;i< Number(res1[2]);i++){
                    let currName = 'menu1_itemCrois' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu1_itemCroisLine').style.display = 'initial'
                document.getElementById('menu1_itemCroisAny').style.display = 'initial'
                document.getElementById('menu1_itemCroisLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu1_itemCroisAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='круасаны'){
                for(let i = 0;i< Number(res1[2]);i++){
                    let currName = 'menu1_itemCrois' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu1_itemCroisLine').style.display = 'initial'
                document.getElementById('menu1_itemCroisAny').style.display = 'initial'
                document.getElementById('menu1_itemCroisLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu1_itemCroisAny').setAttribute('style','width=100%;cursor: pointer;')
            }
            if(category ==='all'){
                for(let i = 0;i< Number(res1[3]);i++){
                    let currName = 'menu1_itemAll' + i.toString()
                    document.getElementById(currName).style.display = 'initial'
                    document.getElementById(currName).setAttribute('style','width=100%;cursor: pointer;')
                }
                document.getElementById('menu1_itemAllLine').style.display = 'initial'
                document.getElementById('menu1_itemAllAny').style.display = 'initial'
                document.getElementById('menu1_itemAllLine').setAttribute('style','width=100%;cursor: pointer;')
                document.getElementById('menu1_itemAllAny').setAttribute('style','width=100%;cursor: pointer;')
            }
        })
        request.send();
    }



    function createVkusDropDown(category){

                let cur_category = JSON.stringify({category: category});
                        var request = new XMLHttpRequest();
                        request.open('POST', "/vkusLoad",true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.addEventListener("load", function(){
                            let recieved5 = JSON.parse(request.response);
                            //console.log('vkus1: '+request.response)
                            //console.log('vkus2: '+recieved5)

                            //удаляем из менюхи итемы если они там уже были
                            if(document.getElementById('menu2').getElementsByTagName('div').length !== 0){
                                let q = document.getElementById('menu2').getElementsByTagName('div').length-2
                                for(let u=0;u < q;u++){
                                    let nameForNone = 'menu2_item' +u.toString()
                                    var el = document.getElementById(nameForNone)
                                    el.parentNode.removeChild(el);
                                }
                                var el = document.getElementById('menu2_itemLine')
                                    el.parentNode.removeChild(el);
                                    var el = document.getElementById('menu2_itemAny')
                                    el.parentNode.removeChild(el);                                
                            }

                            //создаём новые итемы и добавляем им обработчики
                            for(let i=0;i<recieved5.length;i++){
                                var newDiv = document.createElement("div");   
                                let idName = 'menu2_item'+i.toString() 
                                newDiv.id=idName
                                newDiv.setAttribute('class','dropdown-item')
                                newDiv.innerHTML = recieved5[i]["vkus"];
                                newDiv.setAttribute('style','cursor: pointer;')
                                document.getElementById('menu2').append(newDiv);

                                document.getElementById(idName).addEventListener("click", function (e) {
                                    e.preventDefault();
            for(let k=0;k< document.getElementById('menu2').getElementsByTagName('div').length -2;k++){
                let idCurrName = 'menu2_item'+k.toString() 
                document.getElementById(idCurrName).setAttribute('class','dropdown-item')
            }
            document.getElementById('menu2_itemAny').setAttribute('class','dropdown-item')
            document.getElementById(idName).setAttribute('class', 'dropdown-item active')
                                });
                            }
                            var newDiv = document.createElement("div");    
                                newDiv.id='menu2_itemLine'
                                newDiv.setAttribute('class','dropdown-divider')
                                document.getElementById('menu2').append(newDiv);
                                var newDiv = document.createElement("div");    

                                newDiv.id='menu2_itemAny'
                                newDiv.setAttribute('class','dropdown-item active')
                                newDiv.innerHTML = 'Любой'
                                newDiv.setAttribute('style','cursor: pointer;')
                                document.getElementById('menu2').append(newDiv);
document.getElementById('menu2_itemAny').addEventListener("click", function (e) {
 e.preventDefault();
     for(let k=0;k< document.getElementById('menu2').getElementsByTagName('div').length -2;k++){
         let idCurrName = 'menu2_item'+k.toString() 
         document.getElementById(idCurrName).setAttribute('class','dropdown-item')
         }
document.getElementById('menu2_itemAny').setAttribute('class','dropdown-item active')
 });

                           
                        })
                        request.send(cur_category);
    }

    function showWaffles(numPage){
        document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
        document.getElementById('croissants_class').setAttribute('class', 'nav-item')
        document.getElementById('all_class').setAttribute('class', 'nav-item')
        document.getElementById('waffles_class').setAttribute('class', 'nav-item active')

        let category= 'вафли'
        let cur_category = JSON.stringify({category: category});
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
                            document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                            document.getElementById(param_name2 + '_text').textContent='none'
                             document.getElementById(param_name2 + '_text2').textContent='none'
                            document.getElementById(param_name2+'_cost').textContent='none'
                                document.getElementById(param_name2+'_discount').textContent='';
                        }
                        alert('товаров не найдено')
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
            createVkusDropDown(category)
            createFabricatorDropDown1(category)
                })
                request.send(cur_category);
    }

        

        function showMarmalade(numPage){
            document.getElementById('croissants_class').setAttribute('class', 'nav-item')
            document.getElementById('all_class').setAttribute('class', 'nav-item')
            document.getElementById('waffles_class').setAttribute('class', 'nav-item')
            document.getElementById('marmalade_class').setAttribute('class', 'nav-item active')

            let category= 'мармелад'
            let cur_category = JSON.stringify({category: category});
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
                            document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                            document.getElementById(param_name2 + '_text').textContent='none'
                             document.getElementById(param_name2 + '_text2').textContent='none'
                            document.getElementById(param_name2+'_cost').textContent='none'
                                document.getElementById(param_name2+'_discount').textContent='';
                        }
                        alert('товаров не найдено')
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
            createVkusDropDown(category)
            createFabricatorDropDown1(category)
                })
                request.send(cur_category);
    }

            function showCroissants(numPage){
                document.getElementById('all_class').setAttribute('class', 'nav-item')
                document.getElementById('waffles_class').setAttribute('class', 'nav-item')
                document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
                document.getElementById('croissants_class').setAttribute('class', 'nav-item active')
               
                let category= 'круасаны'
                let cur_category = JSON.stringify({category: category});
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
                            document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                            document.getElementById(param_name2 + '_text').textContent='none'
                             document.getElementById(param_name2 + '_text2').textContent='none'
                            document.getElementById(param_name2+'_cost').textContent='none'
                                document.getElementById(param_name2+'_discount').textContent='';
                        }
                        alert('товаров не найдено')
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
            createVkusDropDown(category)
            createFabricatorDropDown1(category)
                })
                request.send(cur_category);
    }

    function showAll(numPage){
        document.getElementById('waffles_class').setAttribute('class', 'nav-item')
        document.getElementById('marmalade_class').setAttribute('class', 'nav-item')
        document.getElementById('croissants_class').setAttribute('class', 'nav-item')
        document.getElementById('all_class').setAttribute('class', 'nav-item active')

        let category= 'all'
        let cur_category = JSON.stringify({category: category});
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
                            document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                            document.getElementById(param_name2 + '_text').textContent='none'
                             document.getElementById(param_name2 + '_text2').textContent='none'
                            document.getElementById(param_name2+'_cost').textContent='none'
                                document.getElementById(param_name2+'_discount').textContent='';
                        }
                        alert('товаров не найдено')
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
            
            createFabricatorDropDown1(category)
            //createVkusDropDown(category)
            
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

