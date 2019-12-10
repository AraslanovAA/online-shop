ymaps.ready(init);
function init() {
    var suggestView = new ymaps.SuggestView('suggest'),
        map,
        placemark;
    $('#button').bind('click', function (e) {
        var a = document.getElementById("btn");
        if (a != null){
        document.getElementById("btn").parentNode.removeChild(a);}
        geocode();
    });

    function geocode() {
        var request = $('#suggest').val();
        ymaps.geocode(request).then(function (res) {
            var obj = res.geoObjects.get(0),
                error, hint;
            if (obj) {
                switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Неполный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните адрес';
                }
            } else {
                error = 'Адрес не найден';
                hint = 'Уточните адрес';
            }
            if (error) {
                showError(error);
                showMessage(hint);
            } else {
                showResult(obj);
            }
        }, function (e) {
            console.log(e)
        })

    }
    function showResult(obj) {
        $('#suggest').removeClass('input_error');
        $('#notice').css('display', 'none');
	$('#footer').css('display', 'block');

	    var br = document.createElement("BR");
            br.id = "br";
 	    var br2 = document.createElement("BR");
            br2.id = "br2";
	    var br4 = document.createElement("BR");
            br4.id = "br4";
	    var br3 = document.createElement("BR");
            br3.id = "br3";
 	    var br5 = document.createElement("BR");
            br5.id = "br5";
	    var br6 = document.createElement("BR");
            br6.id = "br6";
 

 	    var reg = document.createElement("DIV");
            reg.id = "reg";
	    document.getElementById('header').append(br);
document.getElementById('header').append(br2);
document.getElementById('header').append(br3);
document.getElementById('header').append(br4);
document.getElementById('header').append(br5);
document.getElementById('header').append(br6);

            document.getElementById('header').append(reg);
            document.getElementById("reg").setAttribute('class', "form-group")
            var btn = document.createElement("BUTTON");
            btn.id = "btn";
            document.getElementById('reg').appendChild(btn);
            var br8 = document.createElement("BR");
            br8.id = "br8";
            document.getElementById('header').append(br6);
            document.getElementById("btn").setAttribute('class', "btn2")
            document.getElementById("btn").setAttribute('type', "submit")
            document.getElementById("btn").textContent = 'Оформить заказ';
            var br7 = document.createElement("BR");
            br7.id = "br7";
            document.getElementById('header').append(br6);
            var br9 = document.createElement("BR");
            br9.id = "br9";
            document.getElementById('header').append(br6);
        var mapContainer = $('#map'),
            bounds = obj.properties.get('boundedBy'),
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            ),
            address = [obj.getCountry(), obj.getAddressLine()].join(', '),
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
            mapState.controls = [];
            //createMap(mapState, shortAddress);
            showMessage(address);
            document.getElementById("btn").addEventListener("click", function (e) {  e.preventDefault();
                //TODO-----------------
                var cookieString = document.cookie;
                var splited = cookieString.split('=')
                let hash = splited[1]
                let cur_hash = JSON.stringify({hash : hash});
                var request = new XMLHttpRequest();
                request.open('POST', "/makeOrder",true);
                request.setRequestHeader("Content-Type", "application/json");
                request.addEventListener("load", function(){
                }
                )
                request.send(cur_hash);
                //-------------------
            });
        }

    function showError(message) {
        $('#notice').text(message);
        $('#suggest').addClass('input_error');
        $('#notice').css('display', 'block');
        // Удаляем карту.
        if (map) {
            map.destroy();
            map = null;
        }
    }

    function createMap(state, caption) {
        if (!map) {
            map = new ymaps.Map('map', state);
            placemark = new ymaps.Placemark(
                map.getCenter(), {
                    iconCaption: caption,
                    balloonContent: caption
                }, {
                    preset: 'islands#redDotIconWithCaption'
                });
            map.geoObjects.add(placemark);
        } else {
            map.setCenter(state.center, state.zoom);
            placemark.geometry.setCoordinates(state.center);
            placemark.properties.set({iconCaption: caption, balloonContent: caption});
        }
    }

    function showMessage(message) {
        $('#messageHeader').text('Адрес доставки:');
        $('#message').text(message);
    }
}
