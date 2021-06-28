const month = {
    1: 'Janvier',
    2: 'Février',
    3: 'Mars',
    4: 'Avril',
    5: 'Mai',
    6: 'Juin',
    7: 'Juillet',
    8: 'Août',
    9: 'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre',
}


function toSqlFormatDate(date) {
    let stringDate = "";
    stringDate += String(date.getFullYear()) + '-';
    if (date.getMonth() < 10) stringDate += "0";
    stringDate += String(date.getMonth()+1) + '-';
    if (date.getDate() < 10) stringDate += "0";
    stringDate += String(date.getDate());

    return stringDate;
}

function toSqlFormatTime(time) {
    let stringTime = "";
    if (time.getHours() < 10) stringTime += "0";
    stringTime += String(time.getHours()) + ':';
    if (time.getMinutes() < 10) stringTime += "0";
    stringTime += String(time.getMinutes()) + ':';
    stringTime += "00"; // 0 second

    return stringTime;
}

function convertToString(date) { // convert a sql-ready format into a beautiful and well-formatted date <3
    let string = "";
    let dateSplit = date.slice(0, 10).split('-')
    string += parseInt(dateSplit[2]); // day
    string += " " + month[parseInt(dateSplit[1])]; // month
    string += " " + dateSplit[0]; // year
    let timeSplit = date.split(' ')[1].split(':');
    string += " à " + parseInt(timeSplit[0]); // hours
    string += "h" + timeSplit[1]; // hours
    return string;
}

// Takes 2 Date() objects as input, one for the date, and the other for the time. It makes it sql-friendly for database.
function computeDateTimeForSql(date, time) {
    return toSqlFormatDate(date) +  " " + toSqlFormatTime(time);
}

export { toSqlFormatDate, toSqlFormatTime, computeDateTimeForSql, convertToString };