function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()



  return [year, month, day].map(formatNumber).join('-')
}
function formatDateUnix(date) {
  date = date + " 00:00:00";
  date = Date.parse(new Date(date)) / 1000;
  return date;
}
function formatUnixToDate(date) {
  date = this.formatDate(new Date(date * 1000));
  return date;
}
function formatUnixToTime(date) {
  date = new Date(date * 1000).toLocaleString("zh", { hour12: false });
  date = date.split(" ");
  return date[1].substring(0, 5);
}
function formatUnixToDT(date) {
  date = new Date(date * 1000).toLocaleString("zh", { hour12: false });
  return date;
}
function formatTimeUnix(date) {
  date = Date.parse(new Date(date)) / 1000;
  return date;
}
function formatUnixToDUnix(date) {
  date = this.formatUnixToDate(date);
  date = this.formatDateUnix(date);
  return date;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateUnix: formatDateUnix,
  formatUnixToDate: formatUnixToDate,
  formatUnixToTime: formatUnixToTime,
  formatTimeUnix: formatTimeUnix,
  formatUnixToDT: formatUnixToDT,
  compare: compare,
  formatUnixToDUnix: formatUnixToDUnix,
}
