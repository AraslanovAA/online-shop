const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 3000;
const fs = require('fs');

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('NOT FOUND 404\n');
}

var pgp = require('pg-promise')();
var cn = {host: 'localhost', port: 5432, database: 'postgres', user: 'postgres', password: '1'};
//var cn = { host: 'rc1a-2dvbvmj3xva9c5zg.mdb.yandexcloud.net',
//	   port: 6432,
//	   database: 'postgresDB',
//	   user: 'denis',
//	   password: 'Aezakmi100500984310'};
var db = pgp(cn); 

function sendFile(filename, res) {
    fs.readFile(filename, (err, data) => {
        if (err) {
            console.error(err);
            notFound(res);
            return
        }
        res.write(data);
        res.end();
    });
}

const server = http.createServer((req, res) => {
    if (req.method=='GET') {
        if(req.url.includes('.js')){
            res.setHeader('Content-Type','text/javascript');
            sendFile(__dirname + req.url,res)
        }else if (req.url.includes('.css')){
            res.setHeader('Content-Type','text/css');
            sendFile(__dirname + req.url,res)
        } else{if(req.url.indexOf('item')!==-1){
                if( Number(req.url.substr(req.url.lastIndexOf('item')+4,req.url.length))<23){
                    if(Number(req.url.substr(req.url.lastIndexOf('item')+4,req.url.length))>0){
                    sendFile(__dirname + '/shop-page.html', res);
                    }else{
                        notFound(res);
                    }
                }
                else{
                    notFound(res);
                }
        }else{
            switch(req.url){
                case "/": { sendFile(__dirname + '/index.html', res); break; }
                case "/auth": { sendFile(__dirname + '/registrandauth.html', res); break; }
                case "/cart": { sendFile(__dirname + '/cart.html', res); break; }
                case "/delivery": { sendFile(__dirname + '/delivery.html', res); break; }
                case "/polite": { sendFile(__dirname + '/polite.html', res); break; }
                case "/js/bootstrap.min.js.map": { sendFile(__dirname + '/js/bootstrap.min.js.map', res); break; }
                case "/css/bootstrap.min.css.map": { sendFile(__dirname + '/css/bootstrap.min.css.map', res); break; }
                case "/font/roboto/Roboto-Regular.woff": { res.setHeader('Content-Type', 'text/woff'); sendFile(__dirname + '/font/roboto/Roboto-Regular.woff', res); break; }
                case "/font/roboto/Roboto-Regular.woff2": { res.setHeader('Content-Type', 'text/woff2'); sendFile(__dirname + '/font/roboto/Roboto-Regular.woff2', res); break; }
                case "/font/roboto/Roboto-Bold.woff": { res.setHeader('Content-Type', 'text/woff'); sendFile(__dirname + '/font/roboto/Roboto-Bold.woff', res); break; }
                case "/font/roboto/Roboto-Bold.woff2": { res.setHeader('Content-Type', 'text/woff2'); sendFile(__dirname + '/font/roboto/Roboto-Bold.woff2', res); break; }
                case "/font/roboto/Roboto-Light.woff": { res.setHeader('Content-Type', 'text/woff'); sendFile(__dirname + '/font/roboto/Roboto-Light.woff', res); break; }
                case "/font/roboto/Roboto-Light.woff2": { res.setHeader('Content-Type', 'text/woff2'); sendFile(__dirname + '/font/roboto/Roboto-Light.woff2', res); break; }
                case "/font/roboto/Roboto-Medium.woff": { res.setHeader('Content-Type', 'text/woff'); sendFile(__dirname + '/font/roboto/Roboto-Medium.woff', res); break; }
                case "/font/roboto/Roboto-Medium.woff2": { res.setHeader('Content-Type', 'text/woff2'); sendFile(__dirname + '/font/roboto/Roboto-Medium.woff2', res); break; }
                
                default: { notFound(res); break;}
            }
        }
        }
 
    }
    if(req.method=='POST'){
        if(req.url ==='/loadProizvoditelPerCategory'){//спрашиваем у бд, а какие вообще есть производители у каждой категории
            let body = [];
                        req.on('data', function(chunk) {
                            body.push(chunk);
                        })
            req.on('end',function() {
                let inquiry = 'SELECT DISTINCT proizvoditel , food_type FROM gsd'
                db.any(inquiry).then(data => {
                    var thisUserCard = JSON.stringify(data)
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(thisUserCard);
                    }) 

            })
        }

        if(req.url ==='/loadVkusPerCategory'){//спрашиваем у бд, а какие вообще есть вкусы у каждой категории
            let body = [];
                        req.on('data', function(chunk) {
                            body.push(chunk);
                        })
            req.on('end',function() {
                
                let inquiry = 'SELECT DISTINCT vkus , food_type FROM gsd'
                db.any(inquiry).then(data => {
                    var thisUserCard = JSON.stringify(data)
                   
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(thisUserCard);
                    }) 

            })
        }
        

        if(req.url ==='/fabricNumsEachCategory'){//спрашиваем у бд, сколкьо произвоидетелй у каждой категории
            let body = [];
                        req.on('data', function(chunk) {
                            body.push(chunk);
                        })
            req.on('end',function() {
                
                let inquiry = 'SELECT DISTINCT proizvoditel , food_type FROM gsd'
                db.any(inquiry).then(data => {
                    var thisUserCard = JSON.stringify(data)
                    let numWaffs = 0
                    let numMarm = 0;
                    let numCrois = 0
                    let numAll = 0
                    for(let i =0;i<data.length;i++){
                        if(data[i]["food_type"] === 'вафли'){
                            numWaffs++
                        }
                        if(data[i]["food_type"] === 'мармелад'){
                            numMarm++
                        }
                        if(data[i]["food_type"] === 'круасаны'){
                            numCrois++
                        }
                    }
                    let str = ''
                    for(let i=0;i<data.length;i++){
                        str+=data[i]["proizvoditel"]+';'
                    }
                    str = str.substring(0,str.length-1)
                    var arr = str.split(';')
                    let result = [];
            
                     for (let str1 of arr) {
                        if (!result.includes(str1)) {
                        result.push(str1);
                        }
                    }
                    numAll = result.length
                    let numsEachCategory = numWaffs.toString()+';'+numMarm.toString()+';'+numCrois.toString()+';'+numAll.toString()
                    
                    let numsEachCategoryJSON = JSON.stringify(numsEachCategory)
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(numsEachCategoryJSON);
                    }) 

            })
        }


        if(req.url ==='/tasteNumsEachCategory'){//спрашиваем у бд, сколкьо вкусов у каждой категории
            let body = [];
                        req.on('data', function(chunk) {
                            body.push(chunk);
                        })
            req.on('end',function() {
          
                let inquiry = 'SELECT DISTINCT vkus , food_type FROM gsd'
                db.any(inquiry).then(data => {
                    var thisUserCard = JSON.stringify(data)
        let numWaffs = 0
        let numMarm = 0;
        let numCrois = 0
        let numAll = 0
        for(let i =0;i<data.length;i++){
            if(data[i]["food_type"] === 'вафли'){
                numWaffs++
            }
            if(data[i]["food_type"] === 'мармелад'){
                numMarm++
            }
            if(data[i]["food_type"] === 'круасаны'){
                numCrois++
            }
        }
        let str = ''
        for(let i=0;i<data.length;i++){
            str+=data[i]["vkus"]+';'
        }
        str = str.substring(0,str.length-1)
        var arr = str.split(';')
        let result = [];

         for (let str1 of arr) {
            if (!result.includes(str1)) {
            result.push(str1);
            }
        }
        numAll = result.length
        let numsEachCategory = numWaffs.toString()+';'+numMarm.toString()+';'+numCrois.toString()+';'+numAll.toString()
   
        let numsEachCategoryJSON = JSON.stringify(numsEachCategory)
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(numsEachCategoryJSON);
                    }) 

            })
        }


if(req.url ==='/vkusLoad'){//спрашиваем у бд, а какие вообще у текущей категории есть вкусы
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        
    let inquiry = ''
    if(JSON.parse(body).category ==='all'){
        inquiry = 'SELECT DISTINCT vkus FROM gsd'
    }
    else{
        inquiry = 'SELECT DISTINCT vkus FROM gsd where food_type = '+"'"+JSON.parse(body).category+"'"
    }
        db.any(inquiry).then(data => {
            var thisUserCard = JSON.stringify(data)
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(thisUserCard);
            }) 

    })
}


if(req.url ==='/giveThisUserDelivery'){//получаем все заказы пацана
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
      
    let inquiry = 'SELECT buyer_id, items, "when", address	FROM public.orders where buyer_id='+"'"+JSON.parse(body).hash+"'"
        db.any(inquiry).then(data => {
            var thisUserCard = JSON.stringify(data)
         
            let thisUserCardJSON = JSON.stringify(thisUserCard)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(thisUserCardJSON);
            }) 

    })
}



if(req.url ==='/makeOrder'){//добавляем заказ в таблицу заказов, попутно удаляя из таблицы корзина
    
    let body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    })
req.on('end',function() {

//взять количество товара из таблицы корзина, стоимость из таблицы товаров связанные по описание в таблицах
//  cоответствующие указанному хэшу в таблице корзины
//сформировать строку товаров для таблицы заказов и пополнить таблицу заказов
//удалить все товары пацана из таблицы корзина - самое изи конечно же

let inquiry = 'SELECT gsd.additional_params, card.count_prod, gsd.current_cost, '+
'card.count_prod *gsd.current_cost as multiply FROM card, gsd WHERE'+
' gsd.product_name = card.product_description AND card.user_h = '+"'" +JSON.parse(body).hash+"'"
db.any(inquiry).then(data => {
var thisUserCard = JSON.stringify(data)

var itemList= ''
var now = new Date();
var when = now.toString()
var address= JSON.parse(body).address
//TODO:убедиться что мы не идем доабвлять товары в заказы из корщины, когда корзинка то пуста
for (let i = 0; i < data.length; i++){
itemList = itemList + data[i]["additional_params"]+':'+ data[i]['count_prod']+':' +
data[i]['current_cost'] +':' + data[i]['multiply']+';'
}
let inquiry2 = 'INSERT INTO public.orders(buyer_id, items,  "when", address)'+
'VALUES ('+"'"+JSON.parse(body).hash+"'"+', '+"'"+itemList+"'"+', '+"'"+when+"'"+', '+"'"+address+"'"+');'
inquiry2 = inquiry2 + 'DELETE FROM public.card WHERE user_h = ' +"'"+JSON.parse(body).hash+"'"+';'
db.any(inquiry2).then(data2=> {
})

let thisUserCardJSON = JSON.stringify(thisUserCard)
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(thisUserCardJSON);
})

})
}


if(req.url ==='/giveThisUserCard'){//получаем корзину пацана по хэшу
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
      
    let inquiry = 'SELECT product_description, count_prod FROM card where user_h = ' + "'" +JSON.parse(body).hash+"'"
        db.any(inquiry).then(data => {
            var thisUserCard = JSON.stringify(data)
         
            let thisUserCardJSON = JSON.stringify(thisUserCard)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(thisUserCardJSON);
            }) 

    })
}



if(req.url ==='/deleteCartItem'){//удаляем строку из таблицы "корзина"
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        
    //в gcd по addit_param получаем product_name = product_description в card
    let inquiry = 'SELECT product_name FROM gsd where additional_params = ' + "'" +JSON.parse(body).addName+"'"
        db.any(inquiry).then(data => {
            var prodDescription = JSON.stringify(data)
        var delitingProdName = data[0]["product_name"]
        let inquiry2 = 'DELETE FROM public.card   WHERE  user_h = ' + "'" +JSON.parse(body).hash+"'" +
                                    ' AND product_description=' +"'"+delitingProdName+"';"
            db.any(inquiry2).then(data2 => {
                var resFlag = JSON.stringify(true)
                let resFlagJSON = JSON.stringify(resFlag)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(resFlagJSON);
            })
            
            }) 

    })
}



if(req.url ==='/giveTableInfo'){//получаем описание товара для корзины по его названию
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        
    var splitedProducts = JSON.parse(body).listProductName.split(';')
    
    let inquiry = 'SELECT product_name,additional_params, current_cost FROM gsd where product_name = ' + "'" +splitedProducts[0]+"'"
    k=0
    var flag = false
    while(splitedProducts[k] != null){
        inquiry += " OR product_name = " +"'"+splitedProducts[k]  + "'"
        k++;
    }
    if(splitedProducts[k]==null){
        flag=true
    }
    inquiry+=';'
   
    if(flag===true){
        db.any(inquiry).then(data => {
            var thisProductInfo = JSON.stringify(data)
            
            let thisProductInfoJSON = JSON.stringify(thisProductInfo)
            res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(thisProductInfoJSON);
            }) 
        }

    })
}
 

if(req.url ==='/giveNumGoods'){//получаем имя пацана по его хешу
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        
    let inquiry = 'SELECT Count(*) FROM card where user_h = ' + "'" +JSON.parse(body).hash+"'"
        db.any(inquiry).then(data => {
            var numGoods = JSON.stringify(data)
            let numGoodsJSON = JSON.stringify(numGoods)
            
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(numGoodsJSON);
            }) 

    })
}


if(req.url ==='/giveFoolName'){//получаем полное имя товара по короткому
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
      
    let inquiry = 'SELECT product_name FROM public.gsd where additional_params = ' + "'" +JSON.parse(body).prod_name+"'"
        db.any(inquiry).then(data => {
            var prod_name = JSON.stringify(data[0]["product_name"])
          
             res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(prod_name);
            }) 

    })
}


if(req.url ==='/addToCard'){//добавляем инфу о новых заказах в корзину
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        

    //1 - проверяем, что такого заказа уже нет в корзине, если есть увеличиваем у него count
    let inquiry = 'SELECT count_prod FROM card where user_h = ' +
     "'" +JSON.parse(body).hash+"'" + ' AND product_description = ' +"'" + JSON.parse(body).prod_name +"'"
        db.any(inquiry).then(data => {
            var already_count = JSON.stringify(data)
        if(already_count.length ===2){//вот тут мы не нашли такого товара в таблице корзина, значит добавляем его туда
      
            
            let inquiry2 = 'INSERT INTO public.card( user_h, product_description, count_prod) VALUES (' +
            "'" +JSON.parse(body).hash +"'" +
            ', ' + "'" + JSON.parse(body).prod_name +"'" +
            ', ' +JSON.parse(body).count_product +');'
            db.any(inquiry2).then(data2 => {
                var res = JSON.stringify(true)
                })
        }
        else{//апдейтим инфу в таблице корзина, так как такая строка уже имеется
        
            var already_count2 = JSON.parse(already_count)
         
            var newCount = JSON.parse(body).count_product + already_count2[0]["count_prod"]
      
            let inquiry3 = 'UPDATE public.card SET user_h=' +"'"+JSON.parse(body).hash+"'"+
            ',  product_description=' +"'"+JSON.parse(body).prod_name+"'"+
            ', count_prod='+newCount+'  WHERE user_h=' +"'"+JSON.parse(body).hash+"'"+
            ' AND product_description=' + "'" +JSON.parse(body).prod_name+"'"+';'
            db.any(inquiry3).then(data3 => {
                var res = JSON.stringify(true)
                })
        }
        var endFlag = JSON.stringify(true)
        let endFlagJSON = JSON.stringify(endFlag)
        res.writeHead(200, {'Content-Type': 'application/json'});
           res.end(endFlagJSON);
            }) 

    })
}



if(req.url ==='/giveNameByHash'){//получаем имя пацана по его хешу
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {

    let inquiry = 'SELECT first_name FROM buyers where password_user = ' + "'" +JSON.parse(body).hash+"'"
        db.any(inquiry).then(data => {
            var first_name = JSON.stringify(data)

            let first_nameJSON = JSON.stringify(first_name)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(first_nameJSON);
            }) 

    })
}



if(req.url ==='/giveIdProduct'){//получаем id_product товара по его описанию
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {

        let inquiry = 'SELECT id_product FROM gsd where additional_params = ' + "'" +JSON.parse(body).cur_additional_param+"'"
        db.any(inquiry).then(data => {
            var id_product = JSON.stringify(data)

            let id_productJSON = JSON.stringify(id_product)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(id_productJSON);
            }) 

    })
}


if(req.url ==='/allProductInfo'){//возвращаем всю инфу о товаре по его id_product
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
 
        let inquiry = 'SELECT * FROM gsd where id_product = ' +JSON.parse(body).IDProduct
        db.any(inquiry).then(data => {
            var id_product = JSON.stringify(data)
            let id_productJSON = JSON.stringify(id_product)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(id_productJSON);
            }) 

    })
}


if(req.url ==='/loadMainPage'){//подгрузка страницы товаров с указанной категорией
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {
        let inquiry = ''
    if(JSON.parse(body).category === 'all'){
        inquiry = 'SELECT short_name, additional_params, picture1, current_cost, old_cost FROM gsd where '
    }
    else
        {
    inquiry = 'SELECT short_name,  additional_params, picture1, current_cost, old_cost FROM gsd where food_type='+"'"+JSON.parse(body).category+"'  AND "
        }
        inquiry = inquiry + " current_cost between " + JSON.parse(body).minCost + " and " + JSON.parse(body).maxCost

    if(JSON.parse(body).vkus !== '-'){
        inquiry = inquiry + "AND vkus = '"+JSON.parse(body).vkus+"'"
    }
    
    if(JSON.parse(body).sortOrder ==='ASC'){
        inquiry = inquiry + ' ORDER BY current_cost ASC'
    }
    if(JSON.parse(body).sortOrder ==='DESC'){
        inquiry = inquiry + ' ORDER BY current_cost DESC'
    }

        db.any(inquiry).then(data => {
            if(data[0] == null){
            
                var abc = JSON.stringify(false)
                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(abcJSON);
            }
            else{
            var abc = JSON.stringify(data)
            let abcJSON = JSON.stringify(abc)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
            }
            
            }) 

    })
}


if(req.url ==='/registrationUser'){//регистрация нового пользователя
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {

        let inquiry = 'SELECT MAX(id_buyer)  FROM   buyers'
        db.any(inquiry).then(data => {
            var id_nextUser=data[0]["max"]+1
        let inquiry = 'INSERT INTO public.buyers(id_buyer, first_name, last_name, email, password_user, address) VALUES ('+
        id_nextUser+
        ', '+"'"+JSON.parse(body).user.firstname +"'"+ 
        ','+"'"+ JSON.parse(body).user.secondName+"'"+ 
        ','+"'"+JSON.parse(body).user.email+"'"+ 
        ','+"'"+  JSON.parse(body).user.password +"'"+
        ' ,'+null+');'
        db.any(inquiry).then(data => {})
        let id_nextUserJSON = JSON.stringify(id_nextUser)
        res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(id_nextUserJSON);
            }) 

    })
}



if(req.url ==='/checkRegistratedEmail'){//проверка незанятости email
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {

        let inquiry = 'SELECT id_buyer  FROM   buyers where email=' + "'"+JSON.parse(body).email+"'"
        db.any(inquiry).then(data => {
            if(data[0] == null){
                var abc = JSON.stringify(true)//мыло свободно

                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
            }
            else{
                var abc = JSON.stringify(false)//уже мыльно

                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
            }
            
            }) 

    })
}



if(req.url ==='/author'){//получение из базы хэша по соответствующему email и возвращаем результат авторизовался успешно или нет
    let body = [];
                req.on('data', function(chunk) {
                    body.push(chunk);
                })
    req.on('end',function() {

    let inquiry = 'SELECT password_user  FROM   buyers where email=' + "'"+JSON.parse(body).email+"'"
        db.any(inquiry).then(data => {
            
            let strData = JSON.stringify(data)

            if(data[0] == null){
                var abc = JSON.stringify(false)

                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
            }
            else{
                if(JSON.parse(body).password === data[0]["password_user"]){
                    var abc = JSON.stringify(true)

                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
                }
                else{
                    var abc = JSON.stringify(false)

                let abcJSON = JSON.stringify(abc)
                res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(abcJSON);
                }
            }
            
            }) 

    })
}


    }
})


server.listen(port, host, () => {

})