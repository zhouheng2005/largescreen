import md5 from "md5";
const sortObjByKey = function(obj) {
  const keys = Object.keys(obj).sort();
  const newObj = [];
  for (let i = 0; i < keys.length; i++) {
    const index = keys[i];
    // eslint-disable-next-line no-irregular-whitespace
    // 如果是对象，则转换为字符串
    let newDatas = Object.prototype.toString.call(obj[index]);
    if (
      newDatas === "[object Object]" ||
      (newDatas === "[object Array]" && obj[index].length > 0)
    ) {
      newObj.push(JSON.stringify(obj[index]));
    } else {
      newObj.push(obj[index]);
    }
  }
  return newObj;
};
/**
 * @description 签名生成
 */
const signatureFormat = function(apikey = "", json = null, timestamp) {
  if (json == null) return "";
  const JsonValueArray = sortObjByKey(json);
  let signature = `${apikey}${JsonValueArray.join("")}${timestamp}`;
  signature = encodeURIComponent(signature);
  return md5(signature);
};
export function comboParameter(json = null) {
  if (json == null) return "";
  const timestamp = Date.parse(new Date());
  const apikey = "b117df30868bd1f5f280c36d50fdf21a";
  const newSignature = signatureFormat(apikey.trim(), json, timestamp);
  return {
    ...json,
    ts: timestamp,
    tsign: newSignature,
  };
}

export function formatter(number) {
  if (!number) {
    return 0;
  }

  const numbers = number
    .toString()
    .split("")
    .reverse();
  const segs = [];
  while (numbers.length) segs.push(numbers.splice(0, 3).join(""));
  let txt = segs
    .join(",")
    .split("")
    .reverse()
    .join("");
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

/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export function debounce(fn, delay) {
  var timer;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
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
  if (values > 9999999.99) {
    //大于9999显示x.xx亿
    num = Math.floor((values / 10000000) * 100) / 100;
  } else if (values < 9999999.99 && values > 9999.99) {
    //大于9999显示x.xx万
    num = Math.floor((values / 10000) * 100) / 100;
  } else if (values < 9999.99 && values > 0) {
    num = values;
  } else if (values < 0 && values < -9999.99) {
    //小于-9999显示-x.xx万
    num = -Math.floor(Math.abs(values) / 1000);
  } else if (values < -9999999.99) {
    //小于-9999显示-x.xx万
    num = -Math.floor(Math.abs(values) / 10000000);
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
  if (values > 9999999.99) {
    //大于9999显示x.xx亿
    unit = "亿";
  } else if (values < 9999999.99 && values > 9999.99) {
    //大于9999显示x.xx万
    unit = "万";
  } else if (values < 9999.99 && values > 0) {
    unit = "";
  } else if (values < 0 && values < -9999.99) {
    //小于-9999显示-x.xx万
    unit = "万";
  } else if (values < -9999999.99) {
    //小于-9999显示-x.xx万
    unit = "亿";
  }
  return unit;
}

// 计算多点中心位置 缩放级别
export function setZoom(points) {
	let maxLng = points[0].longitude;
	let minLng = points[0].longitude;
	let maxLat = points[0].latitude;
	let minLat = points[0].latitude;
	let res;
	for (let i = points.length - 1; i >= 0; i--) {
		res = points[i];
		if (res.longitude > maxLng) maxLng = res.longitude;
		if (res.longitude < minLng) minLng = res.longitude;
		if (res.latitude > maxLat) maxLat = res.latitude;
		if (res.latitude < minLat) minLat = res.latitude;
	};
	let cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
	let cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
	let zoom = getZoom(maxLng, minLng, maxLat, minLat);
	let newData = {
		cenLng: cenLng,
		cenLat: cenLat,
		zoom: zoom,
	}
	return newData;
}

//根据经纬极值计算绽放级别。  
export function getZoom(maxLng, minLng, maxLat, minLat) {
	//级别18到3。
	var zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000",
		"200000",
		"500000", "1000000", "2000000"
	]
	//获取两点距离,保留小数点后两位  
	let distances = distance(maxLat, maxLng, minLat, minLng) * 1000 * 2;
	for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
		if (zoom[i] - distances > 0) {
			return 22 - i;
		}
	};
}

// 根据经纬度计算距离
export function distance(lat1, lng1, lat2, lng2) {
	var radLat1 = lat1 * Math.PI / 180.0;
	var radLat2 = lat2 * Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000;
	s = s.toFixed(2);
	return s;
}