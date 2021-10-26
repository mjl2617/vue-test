//判断为空
function isEmpty(obj) {
	if (obj == null || obj == undefined || obj == '') {
		return true;
	} else {
		return false;
	}
}


function urlToJSON(url) {
	var params = url.split("?")[1];
	var paramArr = params.split('&');
	var res = {};
	for (var i = 0; i < paramArr.length; i++) {
		var str = paramArr[i].split('=');
		res[str[0]] = str[1];
	}
	return res;

}



function  regname(regname) {
	if(/^[\u2E80-\u9FFF]+$/.test(regname)) {
	return true;
	} else {
	return false;
	}
}
function  phonenum(phonenum) {
	if(/^1[3,4,5,6,7,8,9]\d{9}$/.test(phonenum)) {
	return true;
	} else {
	return false;
	}
}
function  regnum(num) {
	if(/^\d{6}$/.test(num)) {
	return true;
	} else {
	return false;
	}
}

function getNotNullSplit(str){
	var list = [];
	if (isEmpty(str)){
		return list;
	}
	else
	{
		var arr = str.split(",");
		
		for (var i = 0; i < arr.length; i++) {
			if (!isEmpty(arr[i]))
			{
				list.push(arr[i])
			}
		}
		
		return list;
	}
}

function formatDateTime(dateTime){
	if (isEmpty(dateTime))
	{
		return ""
	}
	else
	{
			
		var index = dateTime.indexOf(" ");
		var data = dateTime.substring(0,index)
			console.log('---',index)
			console.log(data)
		return data;
	}
}

function getNowDate() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	return currentdate
}

function formatDate(dateTime) {
	if (isEmpty(dateTime)) {
		return ""
	} else {
		var date = dateTime.replace(/\//g, '-');
		date = date.replace("T", " ");
		var arr = date.split(" ");
		return arr[0];
	}
}



function getNowDateTime() {
	var date = new Date();
	var seperator1 = "-";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}

	var myHours = date.getHours() // 获取当前小时(0-23)	
	var myMinu = date.getMinutes() // 获取当前分钟(0-59)	
	var mySec = date.getSeconds() // 获取当前秒数(0-59)

	if (myHours >= 0 && myHours <= 9) {
		myHours = "0" + myHours;
	}

	if (myMinu >= 0 && myMinu <= 9) {
		myMinu = "0" + myMinu;
	}


	if (mySec >= 0 && mySec <= 9) {
		mySec = "0" + mySec;
	}

	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + myHours + ":" + myMinu + ":" +
		mySec;
	return currentdate
}






function dateCompare(date_1, date_2) {
	var date1 = new Date(date_1)
	var date2 = new Date(date_2)
	var s1 = date1.getTime(),
		s2 = date2.getTime();
	var total = (s2 - s1) / 1000;
	var day = parseInt(total / (24 * 60 * 60)); //计算整数天数	
	var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数	
	var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数	
	var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数	
	var min = parseInt(afterHour / 60); //计算整数分	
	var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数


	var item = {
		total: total,
		day: day,
		hour: hour,
		min: min
	}

	return item
}


function getDateJSON(val) {
	var date = new Date(val);

	var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

	var item = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		week: date.getDay(),
		weekStr: weekList[date.getDay()],
		hour: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
	}
	console.log(item)
	return item;

}



function getWeek(date) {
	var week;
	if (date.getDay() == 0) week = '周日';
	if (date.getDay() == 1) week = '周一';
	if (date.getDay() == 2) week = '周二';
	if (date.getDay() == 3) week = '周三';
	if (date.getDay() == 4) week = '周四';
	if (date.getDay() == 5) week = '周五';
	if (date.getDay() == 6) week = '周六';
	return week;
}


function validMoney(money) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if (reg.test(money)) {
		return true;
	} else {
		return false;
	};
	//000 错
	//0 对
	//0. 错
	//0.0 对
	//050 错
	//00050.12错
	//70.1 对
	//70.11 对
	//70.111错
	//500 正确
}


//判断请求的数据success
function CheckData(res) {
	if (res.statusCode != 200) {
		if (res.statusCode == 401) {
			uni.clearStorageSync('token');
			uni.navigateTo({
				url: '/pages/login/login.vue'
			})
		}
		return false;
	} else {
		if (res.data.errorCode == 0) {
			return true;
		} else {
			return false
		}
	}
}



export default {
	isEmpty,
	CheckData,
	getWeek,
	getNowDate,
	getNowDateTime,
	dateCompare,
	formatDate,
	getDateJSON,
	validMoney,
	urlToJSON,
	getNotNullSplit,
	formatDateTime,
	phonenum,
	regnum,
	regname
}
