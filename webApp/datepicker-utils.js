function formatDate(date) {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}