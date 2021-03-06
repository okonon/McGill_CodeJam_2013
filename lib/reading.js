exports.fromCSV = function(data) {
	return {
		date: new Date(data[0]),
		radiation: new Number(data[1]) + 0,
		humidity: new Number(data[2]) + 0,
		temperature: new Number(data[3]) + 0,
		windSpeed: new Number(data[4]) + 0,
		power: new Number(data[5]) + 0
	};
}

exports.toCSV = function(data) {
	var ret = "Date,Real Power Demand - Downtown Main Entrance (kW)\n";
	for(var i = 0 ; i < data.length ; i++) {
		var date = data[i].date;
		var min = date.getMinutes();
		var strMin = "" + min;
		if(min < 10)
			strMin = "0" + min;
			
		var h = date.getHours();
		var strH = "" + h;
		if(h < 10)
			strH = "0" + h;	
			
		var m = date.getMonth() + 1;
		var strm = "" + m;
		if(m < 10)
			strm  = "0" + m;
			
		var d = date.getDate();
		var strd = "" + d;
		if(d < 10)
			strd = "0" + d;
		
		var tz = date.getTimezoneOffset();
		var diff = Math.floor(-tz / 60);
		
		var prefixTz = "+0";
		if(diff < 0)
			prefixTz = "-0";
			
		diff = Math.abs(diff);
		
		var strDate = date.getFullYear() + "-" + strm + "-" + strd + "T" + 
						strH + ":" + strMin + prefixTz + diff + ":00";
		ret += strDate + "," + data[i].power + "\n";
	}
	
	return ret;
}

exports.toBonus = function(data) {
	var ret = "Date,Lower 75% Conf,Upper 75% Conf\n";
	for(var i = 32 ; i < data.length ; i++) {
		var date = data[i].date;
		var min = date.getMinutes();
		var strMin = "" + min;
		if(min < 10)
			strMin = "0" + min;
			
		var h = date.getHours();
		var strH = "" + h;
		if(h < 10)
			strH = "0" + h;	
			
		var m = date.getMonth() + 1;
		var strm = "" + m;
		if(m < 10)
			strm  = "0" + m;
			
		var d = date.getDate();
		var strd = "" + d;
		if(d < 10)
			strd = "0" + d;
		
		var tz = date.getTimezoneOffset();
		var diff = Math.floor(-tz / 60);
		
		var prefixTz = "+0";
		if(diff < 0)
			prefixTz = "-0";
			
		diff = Math.abs(diff);
		
		var strDate = date.getFullYear() + "-" + strm + "-" + strd + "T" + 
						strH + ":" + strMin + prefixTz + diff + ":00";
		ret += strDate + "," + data[i].lowerConf + "," + data[i].higherConf + '\n';
	}
	
	return ret;
}