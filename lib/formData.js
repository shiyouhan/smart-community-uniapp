const mimeMap = require('./mimeMap.js')
import {
	pathToBase64
} from '@/lib/mmmm-image-tools/index.js'

function FormData() {
	let data = {};
	let files = [];
	this.append = (name, value) => {
		data[name] = value;
		return true;
	}

	this.appendFile = (name, path, fileName) => {
		// const newPath = plus.io.convertAbsoluteFileSystem(path);
		// const buffer1 = 'data:image/png;base64,' + uni.arrayBufferToBase64(arrayBuffer); //再转换成base64类型

		// let buffer = dataURLtoFile(buffer1)
		pathToBase64(path)
			.then(base64 => {
				let buffer = base64
				if (!fileName) {
					fileName = getFileNameFromPath(path);
				}

				files.push({
					name: name,
					buffer: buffer,
					fileName: fileName
				});
				return true;
			})
			.catch(error => {
				console.error(error)
			})
	}



	this.getData = () => {
		convert(data, files)
	}
}

function getFileNameFromPath(path) {
	let idx = path.lastIndexOf("/");
	return path.substr(idx + 1);
}

function dataURLtoFile(dataurl, filename) { //将base64转换为file对象
	console.log(dataurl)
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.?);/)[1],

		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {

		u8arr[n] = bstr.charCodeAt(n);

	}

	return new File([u8arr], filename, {
		type: mime
	});

}


function convert(data, files) {
	console.log(data)
	console.log(files)
	let boundaryKey = 'wxmpFormBoundary' + randString(); // 数据分割符，一般是随机的字符串
	let boundary = '--' + boundaryKey;
	let endBoundary = boundary + '--';

	let postArray = [];
	//拼接参数
	if (data && Object.prototype.toString.call(data) == "[object Object]") {
		for (let key in data) {
			postArray = postArray.concat(formDataArray(boundary, key, data[key]));
		}
	}
	//拼接文件
	if (files && Object.prototype.toString.call(files) == "[object Array]") {
		for (let i in files) {
			let file = files[i];
			postArray = postArray.concat(formDataArray(boundary, file.name, file.buffer, file.fileName));
		}
	}
	//结尾
	let endBoundaryArray = [];
	endBoundaryArray.push(...endBoundary.toUtf8Bytes());
	postArray = postArray.concat(endBoundaryArray);
	console.log(postArray)
	console.log(new Uint8Array(postArray).buffer)
	return {
		contentType: 'multipart/form-data; boundary=' + boundaryKey,
		buffer: new Uint8Array(postArray).buffer
	}
}

function randString() {
	let res = "";
	for (let i = 0; i < 17; i++) {
		let n = parseInt(Math.random() * 62);
		if (n <= 9) {
			res += n;
		} else if (n <= 35) {
			res += String.fromCharCode(n + 55);
		} else {
			res += String.fromCharCode(n + 61);
		}
	}
	return res;
}

function formDataArray(boundary, name, value, fileName) {
	let dataString = '';
	let isFile = !!fileName;

	dataString += boundary + '\r\n';
	dataString += 'Content-Disposition: form-data; name="' + name + '"';
	if (isFile) {
		dataString += '; filename="' + fileName + '"' + '\r\n';
		dataString += 'Content-Type: ' + getFileMime(fileName) + '\r\n\r\n';
	} else {
		dataString += '\r\n\r\n';
		dataString += value;
	}

	var dataArray = [];
	dataArray.push(...dataString.toUtf8Bytes());

	if (isFile) {
		let fileArray = new Uint8Array(value);
		dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
	}
	dataArray.push(..."\r".toUtf8Bytes());
	dataArray.push(..."\n".toUtf8Bytes());

	return dataArray;
}

function getFileMime(fileName) {
	let idx = fileName.lastIndexOf(".");
	let mime = mimeMap[fileName.substr(idx)];
	return mime ? mime : "application/octet-stream"
}

String.prototype.toUtf8Bytes = function() {
	var str = this;
	var bytes = [];
	for (var i = 0; i < str.length; i++) {
		bytes.push(...str.utf8CodeAt(i));
		if (str.codePointAt(i) > 0xffff) {
			i++;
		}
	}
	return bytes;
}

String.prototype.utf8CodeAt = function(i) {
	var str = this;
	var out = [],
		p = 0;
	var c = str.charCodeAt(i);
	if (c < 128) {
		out[p++] = c;
	} else if (c < 2048) {
		out[p++] = (c >> 6) | 192;
		out[p++] = (c & 63) | 128;
	} else if (
		((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
		((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
		// Surrogate Pair
		c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
		out[p++] = (c >> 18) | 240;
		out[p++] = ((c >> 12) & 63) | 128;
		out[p++] = ((c >> 6) & 63) | 128;
		out[p++] = (c & 63) | 128;
	} else {
		out[p++] = (c >> 12) | 224;
		out[p++] = ((c >> 6) & 63) | 128;
		out[p++] = (c & 63) | 128;
	}
	return out;
};


module.exports = FormData;
