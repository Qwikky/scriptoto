// Чтение Cookie
function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
  
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
// Запись Cookie
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}


// Определение времени окончания отсчета и сведение его к секундам
var str = getCookie('Big Day'); // считываем Cookie

if(!str) // Проверяем наличие Cookie с датой окончания времени
{
var BigDay = new Date();
BigDay.setMinutes(BigDay.getMinutes()+1); // устанавливаем время до окончания отсчета
setCookie('Big Day', BigDay, 3); // записываем Cookie
}else{
BigDay = new Date(str);
}

// Расчет оставшегося времени и сводим его к секундам
var today = new Date();
var diff = BigDay - today;
var countdown4 = Math.round(diff / 1000) // сводим разницу времени к секундам


// Конвертирование времени из секунд в дни : часы : минуты : секунды
function convert_to_time(secs) {
    secs = parseInt(secs);
    hh = secs / 3600;
    hh = parseInt(hh);
    mmt = secs - (hh * 3600);
    mm = mmt / 60;
    mm = parseInt(mm);
    ss = mmt - (mm * 60);

    if (hh > 23) {
        dd = hh / 24;
        dd = parseInt(dd);
        hh = hh - (dd * 24);
    } else {
        dd = 0;
    }

    if (ss < 10) {
        ss = "0" + ss;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (hh < 10) {
        hh = "0" + hh;
    }
    if (dd == 0) {
        return (hh + ":" + mm + ":" + ss);
    }
    else {
        if (dd > 1) {
            return (dd + " day " + hh + ":" + mm + ":" + ss);
        }
        else {
            return (dd + " day " + hh + ":" + mm + ":" + ss);
        }
    }
}

// Определяем - выводить дальше таймер или надпись о завершении отсчета
do_cd4 = function() {
    if (countdown4 < 0) {
        document.getElementById('cd4').innerHTML = "Время закончилось!";
    }
    else {
        document.getElementById('cd4').innerHTML = convert_to_time(countdown4);
        setTimeout('do_cd4()', 1000);
    }
    countdown4 = countdown4 - 1;
}

document.write("<div id='cd4' style='text-align: center; font-size: 40pt'></div>\n"); // Вывод резальтата на страницу
do_cd4(); // запуск графической части скрипта
