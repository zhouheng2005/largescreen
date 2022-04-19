// 每三位数字增加逗号
export function formatter(number) {
  if (!number) {
    return 0;
  }

  const numbers = number.toString().split("").reverse();
  const segs = [];
  while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
  let txt = segs.join(",").split("").reverse().join("");
  if (txt.indexOf(".") == -1) {
    return txt;
  } else {
    let index = txt.indexOf(".") - 1;
    return txt.substr(0, index) + txt.substr(index + 1);
  }
}

export function _mathRandom1000() {
  return (Math.random() * 1000).toFixed(0) * 1;
}

// 随机生成颜色
export function fillColor() {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}

/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time, fmt) {
  if (!time) return "";
  else {
    const date = new Date(time);
    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
}

// 每三位数加逗号
export function formateNum(num) {
  if (!num) num = 0;
  num = num.toFixed(2);
  let c = num.split(".");
  let b = c[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + c[1];
  return b;
}

export function numToUnit(value) {
  //过万处理
  if (value == undefined || value === null || value <= 0) {
    return "0";
  }
  var values = Number(value);
  if (isNaN(values)) {
    return "0";
  }
  let num;
  if (values > 99999999.99) {
    //大于9999显示x.xx亿
    num = Math.floor((values / 100000000) * 100) / 100;
  } else if (values < 99999999.99 && values > 9999.99) {
    //大于9999显示x.xx万
    num = Math.floor((values / 1000) * 100) / 100;
  } else if (values < 9999.99 && values > 0) {
    num = values;
  } else if (values < 0 && values < -9999.99) {
    //小于-9999显示-x.xx万
    num = -Math.floor(Math.abs(values) / 1000);
  } else if (values < -99999999.99) {
    //小于-9999显示-x.xx万
    num = -Math.floor(Math.abs(values) / 100000000);
  }
  return num;
}

export function symbolToUnit(value) {
  //过万处理
  if (value == undefined || value === null || value <= 0) {
    return "";
  }
  var values = Number(value);
  if (isNaN(values)) {
    return "";
  }
  let unit;
  if (values > 99999999.99) {
    //大于9999显示x.xx亿
    unit = "亿";
  } else if (values < 99999999.99 && values > 9999.99) {
    //大于9999显示x.xx万
    unit = "万";
  } else if (values < 9999.99 && values > 0) {
    unit = "";
  } else if (values < 0 && values < -9999.99) {
    //小于-9999显示-x.xx万
    unit = "万";
  } else if (values < -99999999.99) {
    //小于-9999显示-x.xx万
    unit = "亿";
  }
  return unit;
}
