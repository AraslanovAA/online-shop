



document.getElementById("deliv").addEventListener("click", function (e) {
    e.preventDefault();
    var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash = parsingArr[1]
                }
            }
            if(( typeof hash === 'string')&&(hash !== '')){
                document.cookie = "outhNShop=" 
                getUserName()
                document.location.href='/'
            }
            else{
                document.location.href = '/auth'
            }

    
}
    );
    document.getElementById("author").addEventListener("click", function (e) {
        e.preventDefault();
        document.location.href = '/delivery'//TODO: сделать проверку а может стоит профиль поцика открыть
    }
        );

    document.getElementById("products").addEventListener("click", function (e) {
        e.preventDefault();
        document.location.href = '/'
    }
        );

        document.getElementById("korzina").addEventListener("click", function (e) {
            e.preventDefault();
            document.location.href = '/cart'
        }
            );

        function calculateNumOfGoods(){//показываем количество позиций рядос тележкой
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

            request.open('POST', "/giveNumGoods",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                let recieved = JSON.parse(request.response);
                let recieved2 = JSON.parse(recieved)
                document.getElementById('count_goods').textContent=recieved2[0]["count"]
            }
            )
            request.send(cur_hash);
        }

        function getUserName(){//подгрузочка имени поцанчика
            let index = window.location.href.lastIndexOf('/')
    let numProduct = window.location.href.substring(index+1, window.location.href.length)
            let indexItem = window.location.href.indexOf('item')
            
            if(indexItem !== -1){
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item active' )
            }
            if(numProduct === ''){
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item active' )
            }
            if(numProduct === 'delivery'){
                document.getElementById('cart').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item active' )
                document.getElementById('gsd').setAttribute('class', 'nav-item' )
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
            }
            if(numProduct === 'cart'){
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item' )
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item active' )
            }

            var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash = parsingArr[1]
                }
            }
            //----------------------подгружаем имя поцикаА
            if(( typeof hash === 'string')&&(hash != '')){
                document.getElementById('author').style.display = 'initial'
                document.getElementById('auth').textContent = 'Выйти'
                if(hash[hash.length-1]===';'){
                    hash = hash.substring(0,hash.length-1)
                }
                
            let cur_hash = JSON.stringify({hash : hash});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveNameByHash",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                var a = request.response
                if((typeof a === 'string')&&(a !=='')){
                let recieved3 = JSON.parse(request.response);
                let recieved4 = JSON.parse(recieved3)
                document.getElementById('delivery').textContent='Доставка'//recieved4[0]["first_name"];
                calculateNumOfGoods();
            }
            }
            )
            request.send(cur_hash);
        }
        else{
            document.getElementById('auth').textContent = 'Авторизация'
            document.getElementById('author').style.display = 'none'
        }
        }

        function getUserNameNoCart(){//подгрузочка имени поцанчика
            let index = window.location.href.lastIndexOf('/')
    let numProduct = window.location.href.substring(index+1, window.location.href.length)
            if(numProduct === ''){
                document.getElementById('home').setAttribute('class', 'nav-item' )
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item active' )
            }
            if(numProduct === 'delivery'){
                document.getElementById('home').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item' )
                document.getElementById('deliv').setAttribute('class', 'nav-item active' )
            }
            if(numProduct === 'cart'){
                document.getElementById('home').setAttribute('class', 'nav-item' )
                document.getElementById('author').setAttribute('class', 'nav-item' )
                document.getElementById('gsd').setAttribute('class', 'nav-item' )
                document.getElementById('deliv').setAttribute('class', 'nav-item' )
                document.getElementById('cart').setAttribute('class', 'nav-item active' )
            }
    
    var cookieString = document.cookie;
    var cookieParsed = cookieString.split(';')
    let hash=''
    for(let i =0;i<cookieParsed.length;i++){
        if(cookieParsed[i].indexOf('outhNShop')!==-1){
            var parsingArr = cookieParsed[i].split('=')
            hash = parsingArr[1]
        }
    }
            //----------------------подгружаем имя поцикаА
            if(( typeof hash === 'string')&&(hash !== '')){
                document.getElementById('author').style.display = 'initial'
                document.getElementById('auth').textContent = 'Выйти'
            let cur_hash = JSON.stringify({hash : hash});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveNameByHash",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                var a = request.response
                if((typeof a === 'string')&&(a !=='')){
                let recieved3 = JSON.parse(request.response);
                let recieved4 = JSON.parse(recieved3)
                document.getElementById('auth').textContent=recieved4[0]["first_name"];
            }
            }
            )
            request.send(cur_hash);
        }
        else{
            document.getElementById('auth').textContent = 'Авторизация'
            document.getElementById('author').style.display = 'none'
        }
        }