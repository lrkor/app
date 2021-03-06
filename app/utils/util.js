const formatTime = (date, type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (type == 'yyyy-mm-dd') {
    return [year, month, day].map(formatNumber).join('-');
  } else if (type == 'mm-dd') {
    return [month, day].map(formatNumber).join('-');
  } else if (type == 'yyyy-mm-dd hh:mm:ss') {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (type == 'yyyy-mm-dd hh:mm') {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
  } else if (type == 'hh:mm') {
    return [hour, minute].map(formatNumber).join(':')
  } else if ('mm-dd hh:mm') {
    return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
  }
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
}
