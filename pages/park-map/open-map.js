//打开第三方地图
export function openMap(latitude, longitude, name) {
	let url = "";
	if (plus.os.name == "Android") {
		let hasBaiduMap = plus.runtime.isApplicationExist({
			pname: 'com.baidu.BaiduMap',
			action: 'baidumap://'
		});
		let hasAmap = plus.runtime.isApplicationExist({
			pname: 'com.autonavi.minimap',
			action: 'androidamap://'
		});
		let urlBaiduMap =
			`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
		urlBaiduMap = encodeURI(urlBaiduMap)
		let urlAmap =
			`androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
		urlAmap = urlAmap(urlBaiduMap)
		if (hasAmap && hasBaiduMap) {
			plus.nativeUI.actionSheet({
				title: "选择地图应用",
				cancel: "取消",
				buttons: [{
					title: "百度地图"
				}, {
					title: "高德地图"
				}]
			}, function(e) {
				switch (e.index) {
					case 1:
						plus.runtime.openURL(urlBaiduMap);
						break;
					case 2:
						plus.runtime.openURL(urlAmap);
						break;
				}
			})
		} else if (hasAmap) {
			plus.runtime.openURL(urlAmap);
		} else if (hasBaiduMap) {
			plus.runtime.openURL(urlBaiduMap);
		} else {
			plus.nativeUI.alert("本机未安装指定的地图应用");
			// url = "geo:"+latitude+","+longitude+"?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
			// plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
		}
	} else {
		// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
		plus.nativeUI.actionSheet({
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{
				title: "Apple地图"
			}, {
				title: "百度地图"
			}, {
				title: "高德地图"
			}]
		}, function(e) {
			console.log(`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`)
			switch (e.index) {
				case 1:
					url =
						`http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${latitude},${longitude}&spn=0.008766,0.019441`;
					break;
				case 2:
					url =
						`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
					break;
				case 3:
					url =
						`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url)
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	}
}
