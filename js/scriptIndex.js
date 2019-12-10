document.getElementById("kekButton").addEventListener("click", function (e) {
    e.preventDefault();
    
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
        

        function funcOnLoad(){

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
                for (let i = 0; i < 8; i++){
                    let param_name='item'+i
                    document.getElementById(param_name).style.display = "initial"
                document.getElementById(param_name + '_text').textContent=recieved2[i]["additional_params"];
                document.getElementById(param_name + '_text2').textContent=recieved2[i]["short_name"];
                document.getElementById(param_name +'_pic').src=recieved2[i]["picture1"];
                document.getElementById(param_name +'_cost').textContent=recieved2[i]["current_cost"] + '₽';
                if(recieved2[i]["current_cost"] === recieved2[i]["old_cost"]){
                    document.getElementById(param_name+'_discount').textContent=''
                }
                else{
                    let percent = Math.trunc((1 - (recieved2[i]["current_cost"] / recieved2[i]["old_cost"]))*100)
                    document.getElementById(param_name+'_discount').textContent='-'+percent +'%';
                }
            }
            })
            request.send(cur_category);
            //console.log(recieved);
            
            getUserName();

        };

        document.getElementById("waffles").addEventListener("click", function (e) {//выбор категории вафли
            e.preventDefault();
            
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
                            let i =0
                            while((i<8) &&(i<recieved2.length)){

                                let param_name='item'+i
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
                        if(i!=8){
                            for(let k = i; k < 8;k++){
                                let param_name2='item'+k
                                document.getElementById(param_name2).style.display = "none"
                                //document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                               // document.getElementById(param_name2 + '_text').textContent='none'
                               //  document.getElementById(param_name2 + '_text2').textContent='none'
                               // document.getElementById(param_name2+'_cost').textContent='none'
                               //     document.getElementById(param_name2+'_discount').textContent='';
                            }
                        }
                }
                    })
                    request.send(cur_category);
                });

            document.getElementById("marmalade").addEventListener("click", function (e) {//выбор категории вафли
                e.preventDefault();

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
                            let i =0
                            while((i<8) &&(i<recieved2.length)){

                                let param_name='item'+i
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
                        if(i!=8){
                            
                            for(let k = i; k < 8;k++){
                                let param_name2='item'+k
                                document.getElementById(param_name2).style.display = "none"
                                //document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                               // document.getElementById(param_name2 + '_text').textContent='none'
                               //  document.getElementById(param_name2 + '_text2').textContent='none'
                               // document.getElementById(param_name2+'_cost').textContent='none'
                               //     document.getElementById(param_name2+'_discount').textContent='';
                            }
                        }
                }
                    })
                    request.send(cur_category);
                });

                document.getElementById("croissants").addEventListener("click", function (e) {//выбор категории вафли
                    e.preventDefault();

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
                            let i =0
                            while((i<8) &&(i<recieved2.length)){

                                let param_name='item'+i
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
                        if(i!=8){
                            for(let k = i; k < 8;k++){
                                let param_name2='item'+k
                                document.getElementById(param_name2).style.display = "none"
                                //document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                               // document.getElementById(param_name2 + '_text').textContent='none'
                               //  document.getElementById(param_name2 + '_text2').textContent='none'
                               // document.getElementById(param_name2+'_cost').textContent='none'
                               //     document.getElementById(param_name2+'_discount').textContent='';
                            }
                        }
                }
                    })
                    request.send(cur_category);
                });

                    document.getElementById("all").addEventListener("click", function (e) {//выбор категории all
                        e.preventDefault();

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
                            let i =0
                            while((i<8) &&(i<recieved2.length)){

                                let param_name='item'+i
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
                        if(i!=8){
                            for(let k = i; k < 8;k++){
                                let param_name2='item'+k
                                document.getElementById(param_name2).style.display = "none"
                                //document.getElementById(param_name2 +'_pic').src='https://www.stihi.ru/pics/2011/02/12/1500.jpg'
                               // document.getElementById(param_name2 + '_text').textContent='none'
                               //  document.getElementById(param_name2 + '_text2').textContent='none'
                               // document.getElementById(param_name2+'_cost').textContent='none'
                               //     document.getElementById(param_name2+'_discount').textContent='';
                            }
                        }
                }
                    })
                    request.send(cur_category);
                });