//убрать lorem? и поле поиска?
var http = require('http');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.listen(3000)
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sccs', express.static('sccs'));
app.use('/font', express.static('font'));
app.get('/', function(req, res) { res.sendFile(__dirname + '/index.html'); });
app.get('/auth', function(req, res) { res.sendFile(__dirname + '/registrandauth.html'); });
app.get('/cart', function(req, res) { res.sendFile(__dirname + '/cart.html'); });
for (let i = 1; i < 23; i++){
    let my_url = '/item'+i
app.get(my_url, function(req, res) { res.sendFile(__dirname + '/shop-page.html'); });
}

const jsonParser = express.json();
var pgp = require('pg-promise')();
var cn = {host: 'localhost', port: 5432, database:'postgres', user:'postgres', password:'1'};
var db = pgp(cn);

//юзлесс бред(пока что)
app.post('/kek',jsonParser, function(request,response){
    console.log('сервер зарегистрировал нажатие по кеку: ')
    
});



//добавляем заказ в таблицу заказов
app.post('/makeOrder',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку оформить заказ: ')
    console.log('hash kotoriy prishel:  ' + request.body.hash)
    //наша задача взять все товары пацана из таблицы корзина
    //добавить товары пацана в таблицу заказов
    //удалить все товары пацана из таблицы корзина - самое изи конечно же
    let inquiry = 'SELECT product_description, count_prod FROM card where user_h = ' + "'" +request.body.hash+"'"
    db.any(inquiry).then(data => {
        var thisUserCard = JSON.stringify(data)
        console.log("из бд получили корзину пользователя: " + thisUserCard)
        if(!request.body) return response.sendStatus(400);
    response.json(thisUserCard)
    })  
});


//получаем корзину пацана по хэшу
app.post('/giveThisUserCard',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку получить всю корзину человека: ')
    console.log('hash kotoriy prishel:  ' + request.body.hash)
    let inquiry = 'SELECT product_description, count_prod FROM card where user_h = ' + "'" +request.body.hash+"'"
    db.any(inquiry).then(data => {
        var thisUserCard = JSON.stringify(data)
        console.log("из бд получили корзину пользователя: " + thisUserCard)
        if(!request.body) return response.sendStatus(400);
    response.json(thisUserCard)
    })  
});

//удаляем строку из таблицы "корзина"
app.post('/deleteCartItem',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку удалить строку из таблицы "корзина": ')
    console.log('hash kotoriy prishel:  ' + request.body.hash)
    console.log('короткое имя удаляемого товара: ' + request.body.addName)
    //в gcd по addit_param получаем product_name = product_description в card
    let inquiry = 'SELECT product_name FROM gsd where additional_params = ' + "'" +request.body.addName+"'"
    db.any(inquiry).then(data => {
        var prodDescription = JSON.stringify(data)
        var delitingProdName = data[0]["product_name"]

        let inquiry2 = 'DELETE FROM public.card   WHERE  user_h = ' + "'" +request.body.hash+"'" +
                                    ' AND product_description=' +"'"+delitingProdName+"';"
            db.any(inquiry2).then(data2 => {
                var resFlag = JSON.stringify(true)
                if(!request.body) return response.sendStatus(400);
    response.json(resFlag)
            })
        
    })  
});

//получаем описание товара для корзины по его названию
app.post('/giveTableInfo',jsonParser, function(request2,response){
    console.log('сервер зарегистрировал попытку получить описание товаров для корзины: ')
    console.log('рассматриваемые продукты:  ' + request2.body.listProductName)
    var splitedProducts = request2.body.listProductName.split(';')
    console.log('splitedProducts1: ' + splitedProducts[0])
    console.log('splitedProducts11: ' + splitedProducts[1])
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
    console.log('сформированный для бд запрос: '+inquiry)
    if(flag===true){
    db.any(inquiry).then(data => {
        var thisProductInfo = JSON.stringify(data)
        console.log("из бд получили данные о товаре для корзины: " + thisProductInfo)
        if(!request2.body) return response.sendStatus(400);
    response.json(thisProductInfo)
    })  
}
});


//получаем имя пацана по его хешу
app.post('/giveNumGoods',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку получить количество позиций дял конкретного человека: ')
    console.log('hash kotoriy prishel:  ' + request.body.hash)
    let inquiry = 'SELECT Count(*) FROM card where user_h = ' + "'" +request.body.hash+"'"
    db.any(inquiry).then(data => {
        var numGoods = JSON.stringify(data)
        console.log("из бд получили количество позиций: " + numGoods)
        if(!request.body) return response.sendStatus(400);
    response.json(numGoods)
    })  
});




//добавляем инфу о новых заказах в корзину
app.post('/addToCard',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку добавить новый заказ в корзинку: ')
    console.log('hash kotoriy prishel:  ' + request.body.hash)
    console.log('prod descr: ' + request.body.prod_name)
    console.log('count: ' + request.body.count_product)

    //1 - проверяем, что такого заказа уже нет в корзине, если есть увеличиваем у него count
    let inquiry = 'SELECT count_prod FROM card where user_h = ' +
     "'" +request.body.hash+"'" + ' AND product_description = ' +"'" + request.body.prod_name +"'"
    db.any(inquiry).then(data => {
        var already_count = JSON.stringify(data)
        if(already_count.length ===2){//вот тут мы не нашли такого товара в таблице корзина, значит добавляем его туда
            console.log('не нашли такой товар в таблице корзина, добавляем его туда')
            
            let inquiry2 = 'INSERT INTO public.card( user_h, product_description, count_prod) VALUES (' +
            "'" +request.body.hash +"'" +
            ', ' + "'" + request.body.prod_name +"'" +
            ', ' +request.body.count_product +');'
            db.any(inquiry2).then(data2 => {
                var res = JSON.stringify(true)
                })
        }
        else{//апдейтим инфу в таблице корзина, так как такая строка уже имеется
            console.log('этот человек уже добавлял такой товар в корзину, тупо инкрементим соответственно')
            var already_count2 = JSON.parse(already_count)
            console.log(already_count2[0]["count_prod"])
            var newCount = request.body.count_product + already_count2[0]["count_prod"]
            console.log(newCount)
            let inquiry3 = 'UPDATE public.card SET user_h=' +"'"+request.body.hash+"'"+
            ',  product_description=' +"'"+request.body.prod_name+"'"+
            ', count_prod='+newCount+'  WHERE user_h=' +"'"+request.body.hash+"'"+
            ' AND product_description=' + "'" +request.body.prod_name+"'"+';'
            db.any(inquiry3).then(data3 => {
                var res = JSON.stringify(true)
                })
        }
        var endFlag = JSON.stringify(true)
        if(!request.body) return response.sendStatus(400);
    response.json(endFlag)
    })  
});





//получаем имя пацана по его хешу
app.post('/giveNameByHash',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку получить хеш по имени: ')
    console.log('hash kotoriy prishel:  ' + request.body)
    let inquiry = 'SELECT first_name FROM buyers where password_user = ' + "'" +request.body.hash+"'"
    db.any(inquiry).then(data => {
        var first_name = JSON.stringify(data)
        console.log("из бд получили имя пацана: " + first_name)
        if(!request.body) return response.sendStatus(400);
    response.json(first_name)
    })  
});



//получаем id_product товара по его описанию
app.post('/giveIdProduct',jsonParser, function(request,response){
    console.log('сервер зарегистрировал нажатие itema: ')
    let inquiry = 'SELECT id_product FROM gsd where additional_params = ' + "'" +request.body.cur_additional_param+"'"
    db.any(inquiry).then(data => {
        var id_product = JSON.stringify(data)
        console.log("из бд получили id продукта: " + id_product)
        if(!request.body) return response.sendStatus(400);
    response.json(id_product)
    })  
});

//возвращаем всю инфу о товаре по его id_product
app.post('/allProductInfo',jsonParser, function(request,response){
    console.log('сервер зарегистрировал загрузку страницы с товаром: ')
    let inquiry = 'SELECT * FROM gsd where id_product = ' +request.body.IDProduct
    db.any(inquiry).then(data => {
        var id_product = JSON.stringify(data)
        if(!request.body) return response.sendStatus(400);
    response.json(id_product)
    })  
});

//подгрузка страницы товаров с указанной категорией
app.post('/loadMainPage',jsonParser, function(request,response){

    if(request.body.category === 'all'){
        let inquiry = 'SELECT short_name, additional_params, picture1, current_cost, old_cost FROM gsd'
    db.any(inquiry).then(data => {
        var abc = JSON.stringify(data)
        if(!request.body) return response.sendStatus(400);
    response.json(abc)
    })
    }

    else{
    let inquiry = 'SELECT short_name,  additional_params, picture1, current_cost, old_cost FROM gsd where food_type='+"'"+request.body.category+"'"
    db.any(inquiry).then(data => {
        if(data[0] == null){
            console.log("Доказано, что налл")
            var abc = JSON.stringify(false)
        if(!request.body) return response.sendStatus(400);
    response.json(abc)
        }
        else{
        var abc = JSON.stringify(data)
        if(!request.body) return response.sendStatus(400);
    response.json(abc)
        }
    })
        }
});

//регистрация нового пользователя
app.post('/registrationUser',jsonParser, function(req,response){
    console.log('сервер зарегистрировал попытку создания нового пользователя')
    let maxID = 'SELECT MAX(id_buyer)  FROM   buyers'
    db.any(maxID).then(data => {
        var id_nextUser=data[0]["max"]+1
        let inquiry = 'INSERT INTO public.buyers(id_buyer, first_name, last_name, email, password_user, address) VALUES ('+
        id_nextUser+
        ', '+"'"+req.body.user.firstname +"'"+ 
        ','+"'"+ req.body.user.secondName+"'"+ 
        ','+"'"+req.body.user.email+"'"+ 
        ','+"'"+  req.body.user.password +"'"+
        ' ,'+null+');'
        db.any(inquiry).then(data => {})
        if(!req.body) return response.sendStatus(400);
    response.json(id_nextUser)
    })  
});

//проверка незанятости email
app.post('/checkRegistratedEmail',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку проверки email')
    let inquiry = 'SELECT id_buyer  FROM   buyers where email=' + "'"+request.body.email+"'"
    db.any(inquiry).then(data => {
        if(data[0] == null){
            var abc = JSON.stringify(true)//мыло свободно
            console.log('res s ervera true = ' +abc)
            if(!request.body) return response.sendStatus(400);
    response.json(abc)
        }
        else{
            var abc = JSON.stringify(false)//уже мыльно
            console.log('res s ervera false = ' +abc)
            if(!request.body) return response.sendStatus(400);
    response.json(abc)
        }
    })
});

//получение из базы пароля по соответствующему email и возвращаем результат авторизовался успешно или нет
app.post('/author',jsonParser, function(request,response){
    console.log('сервер зарегистрировал попытку авторизации пацана')
    let inquiry = 'SELECT password_user  FROM   buyers where email=' + "'"+request.body.email+"'"
    db.any(inquiry).then(data => {
        if(data[0] == null){
            var abc = JSON.stringify(false)
            console.log('res s ervera false = ' +abc)
            if(!request.body) return response.sendStatus(400);
        response.json(abc)
        }
        else{
            if(request.body.password === data[0]["password_user"]){
                var abc = JSON.stringify(true)
            console.log('res s ervera true = ' +abc)
            if(!request.body) return response.sendStatus(400);
        response.json(abc)
            }
            else{
                var abc = JSON.stringify(false)
            console.log('res s ervera false2 = ' +abc)
            if(!request.body) return response.sendStatus(400);
        response.json(abc)
            }
        }
    })
});

