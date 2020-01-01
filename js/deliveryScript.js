function funcOnLoad(){
//подписываем - здравствуй пацан
var cookieString = document.cookie;
var cookieParsed = cookieString.split(';')
let hash2=''
for(let i =0;i<cookieParsed.length;i++){
    if(cookieParsed[i].indexOf('outhNShop')!==-1){
        var parsingArr = cookieParsed[i].split('=')
        hash2 = parsingArr[1]
    }
}
//----------------------подгружаем имя поцикаА
if(( typeof hash2 === 'string')&&(hash2 != '')){
    document.getElementById('author').style.display = 'initial'
    document.getElementById('auth').textContent = 'Выйти'
    if(hash2[hash2.length-1]===';'){
        hash2 = hash2.substring(0,hash2.length-1)
    }
    
let cur_hash = JSON.stringify({hash : hash2});
var request6 = new XMLHttpRequest();
request6.open('POST', "/giveNameByHash",true);
request6.setRequestHeader("Content-Type", "application/json");
request6.addEventListener("load", function(){
    var a = request6.response
    if((typeof a === 'string')&&(a !=='')){
    let recieved3 = JSON.parse(request6.response);
    let recieved4 = JSON.parse(recieved3)
    var newDiv = document.createElement("div");
newDiv.setAttribute('class', 'row  justify-content-center ')
newDiv.innerHTML = '<div class='+"'"+' text-center '+"'"+'>'+
'<h4 class='+"'"+'my-4 h4'+"'"+'>Здравствуйте, '+recieved4[0]["first_name"].toString()+'!</h4>' +
'</div>'
document.getElementById('helloUser').append(newDiv);
}
}
)
request6.send(cur_hash);
}
//подписали, здравствуй, пацан











//кароч берем по хэшику находим заказы пацана парсим, для кажого отдельная таблика
    var flag = false
    var cookieString = document.cookie;
            var cookieParsed = cookieString.split(';')
            let hash=''
            for(let i =0;i<cookieParsed.length;i++){
                if(cookieParsed[i].indexOf('outhNShop')!==-1){
                    var parsingArr = cookieParsed[i].split('=')
                    hash = parsingArr[1]
                }
            }
    if(hash !==''){
    let cur_hash = JSON.stringify({hash : hash});
    var request = new XMLHttpRequest();
    request.open('POST', "/giveThisUserDelivery",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function(){
        var CorzinaPACANA = request.response
        let recieved = JSON.parse(request.response);
        let recieved2 = JSON.parse(recieved)

        if(recieved2.length === 0){
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row d-flex justify-content-center wow slideInLeft')
            newDiv.setAttribute('style','visibility: visible; animation-name: slideInLeft;')
            newDiv.innerHTML = '<div class='+"'"+'col-md-6 text-center wow slideInLeft'+"'"+'>'+
            '<h4 class='+"'"+'my-4 h4'+"'"+'>Ой, кажется вы ещё ничего не купили.'+'</h4>' +
            '<p >Оформите заказ и ваши покупки появятся здесь.'+'</p></div>'
            document.getElementById('emptyCart').append(newDiv);
        }
        else{
            
        for(let i =0;i<recieved2.length;i++){

            var tableID= 'table'+i
            
            var addr = recieved2[i]["address"]
            var addr2 = addr.split(' ')
            if(addr2[0]===addr2[1]){
                var kek = ''
                for(let i = 1; i<addr2.length;i++){
                    kek +=addr2[i]+' '
                }
                addr = kek
            }
            var date = recieved2[i]["when"]
            var splitedDate = date.split(' ')
            date = splitedDate[1] +' ' +splitedDate[2] +' ' + splitedDate[3] +' ' +splitedDate[4]
            
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', 'row d-flex justify-content-center wow slideInLeft')
            newDiv.setAttribute('style','visibility: visible; animation-name: slideInLeft;')
            newDiv.innerHTML = '<div class='+"'"+'col-md-6 text-center'+"'"+'>'+
            '<h4 class='+"'"+'my-4 h4'+"'"+'>'+addr+'</h4>' +
            '<p >'+date+'</p></div>'
            document.getElementById('emptyCart').append(newDiv);
            

            var newDiv = document.createElement("table");
            newDiv.id = tableID
            document.getElementById('emptyCart').append(newDiv);
            var newDiv = document.createElement("tr");    
        newDiv.innerHTML = "<th>Товар</th><th>количество</th><th>Цена за штуку</th><th>Цена</th>";
        document.getElementById(tableID).append(newDiv);

            var items = recieved2[i]["items"]
            var numItems = items.split(';')
            var currTableCost = 0
            for(let k =0;k<numItems.length-1;k++){
                var rowInfo = numItems[k].split(':')
                var newDiv = document.createElement("tr")
                newDiv.innerHTML = "<td>"+rowInfo[0]+"</td><td>"+rowInfo[1]+"</td><td>"+rowInfo[2]+"</td><td>"+rowInfo[3]+"</td>"
                document.getElementById(tableID).append(newDiv);
                currTableCost += Number(rowInfo[3])
            }
            var newDiv = document.createElement("tr")
                newDiv.innerHTML = "<td>"+"</td><td>"+"</td><td>"+"Общая:"+"</td><td>"+currTableCost+"</td>"
                document.getElementById(tableID).append(newDiv);
                var newDiv = document.createElement("hr")
                document.getElementById('emptyCart').append(newDiv);




        var newDiv = document.createElement("br")
        document.getElementById('emptyCart').append(newDiv);
        }
    }
    }
    )
    request.send(cur_hash);
   getUserName();    
}else{
    document.location.href = '/'
}
}