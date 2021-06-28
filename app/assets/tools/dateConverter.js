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

// Takes 2 Date() objects as input, one for the date, and the other for the time. It makes it sql-friendly for database.
function computeDateTimeForSql(date, time) {
    return toSqlFormatDate(date) +  " " + toSqlFormatTime(time);
}

export { toSqlFormatDate, toSqlFormatTime, computeDateTimeForSql };