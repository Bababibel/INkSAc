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
    if (time.getSeconds() < 10) stringTime += "0";
    stringTime += String(time.getSeconds());

    return stringTime;
}

export { toSqlFormatDate, toSqlFormatTime };