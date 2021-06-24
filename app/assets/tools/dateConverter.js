export const toSqlFormat = (date) => {
    let stringDate = "";
    stringDate += String(date.getFullYear()) + '-';
    if (date.getMonth() < 10) stringDate += "0";
    stringDate += String(date.getMonth()+1) + '-';
    if (date.getDate() < 10) stringDate += "0";
    stringDate += String(date.getDate());

    // Default hour
    stringDate += " 20:00:00";
    return stringDate;
}