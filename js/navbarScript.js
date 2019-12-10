



document.getElementById("auth").addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = '/auth'//TODO: сделать проверку а может стоит профиль поцика открыть
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
            var splited = cookieString.split('=')
            let hash = splited[1]
            let cur_hash = JSON.stringify({hash : hash});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveNumGoods",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                let recieved = JSON.parse(request.response);
                let recieved2 = JSON.parse(recieved)
                document.getElementById('count_goods').textContent=recieved2[0]["count"]
                console.log(recieved2[0]["count"])
            }
            )
            request.send(cur_hash);
        }

        function getUserName(){//подгрузочка имени поцанчика
            var cookieString = document.cookie;
            var splited = cookieString.split('=')
            console.log(splited[1])
            console.log(typeof splited[1])
            //----------------------подгружаем имя поцикаА
            let hash = splited[1]
            if(( typeof hash === 'string')&&(hash !== '')){
            let cur_hash = JSON.stringify({hash : hash});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveNameByHash",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                var a = request.response
                if((typeof a === 'string')&&(a !=='')){
                let recieved3 = JSON.parse(request.response);
                let recieved4 = JSON.parse(recieved3)
                console.log('получили от сервера имя пацана' + recieved4[0]["first_name"])
                document.getElementById('auth').textContent=recieved4[0]["first_name"];
                calculateNumOfGoods();
            }
            }
            )
            request.send(cur_hash);
        }
        else{
            alert('куки повреждены')
        }
        }

        function getUserNameNoCart(){//подгрузочка имени поцанчика
            var cookieString = document.cookie;
            var splited = cookieString.split('=')
            console.log(splited[1])
            console.log(typeof splited[1])
            //----------------------подгружаем имя поцикаА
            let hash = splited[1]
            if(( typeof hash === 'string')&&(hash !== '')){
            let cur_hash = JSON.stringify({hash : hash});
            var request = new XMLHttpRequest();
            request.open('POST', "/giveNameByHash",true);
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener("load", function(){
                var a = request.response
                if((typeof a === 'string')&&(a !=='')){
                let recieved3 = JSON.parse(request.response);
                let recieved4 = JSON.parse(recieved3)
                console.log('получили от сервера имя пацана' + recieved4[0]["first_name"])
                document.getElementById('auth').textContent=recieved4[0]["first_name"];
            }
            }
            )
            request.send(cur_hash);
        }
        else{
            alert('куки повреждены')
        }
        }