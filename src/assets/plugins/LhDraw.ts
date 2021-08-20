//  特别说明：
// （1）shapeType（要素类型）：1 点 3线 5面 6 图片，7 箭头（旧）。最稳妥的是用pmid前缀来区别每一种类型。
// （2）箭头当作面来绘制，箭头经纬度用@分割，前一部分是瞄点，是我们的箭头对象编辑时用的，绘制用@后面的那部分
// （3）背景图片和贴地标注是贴在地面上的图像，会跟随地面旋转的
// 	火场标绘元素pmid前缀和标绘类型的关系：
// "FirePoint":"火苗"
// "Procession":"队伍"
// "FireLined":"火线"
// "Dwfbx":"扑火线"
// "zhb":"前线指挥部"
// "oneArrow":"行军箭头"
// "FireSpaces":"火场"
// "FireGif":"态势"
// "SeclusionBand":"隔离带"
// "Label":"自定义标注"
// "Picture":"图片"
// "Video":"视频"
// "WindArrow":"实时风向"
// "realTimeWeather":"实时天气"
// "oneArrow":"单箭头"
// "twoArrow":"双箭头"
// "threeArrow":"三箭头"
// "Picture":"图片"
// "addPicToMap":"背景图片"
// "Label":"自定义标注"
// "GroundLabel":"贴地标注"
import L from 'leaflet';
import Vue from 'vue';

export default class ComUtil {
	static rem = 1;

	//点要素创建
	static async createPoint(k: any) {
		var _this = this;
		var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (screenWidth > 3100) {
			this.rem = 3;
		}
		else {
			this.rem = 1;
		}
		var latLng = [];
		var rotate = "";
		if (!k.coordinates) {
			return;
		}
		if (k.coordinates.indexOf("@") == -1) {
			let arr = k.coordinates.split(",");
			latLng = L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2]))
		} else {
			var arr = k.coordinates.split("@")[0].split(",");
			latLng = L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2]));
			if (k.coordinates.split("@").length == 2) {
				var parm = k.coordinates.split("@")[1]
				rotate = "transform: rotate(" + Number(parm.trim()) + "deg);";
			}
		}
		// leafletAPI 默认icon图标左上角对应坐标点,会使图标看起来会有偏移现象。故此获取图标宽高配合iconAnchor使图标中心点与坐标点对应。
		var imgObj = await Vue.prototype.getImgSize(k.iconhref);
		var imgW = imgObj["width"];
		var imgH = imgObj["height"];
		var iconSize = [imgW * k.iconscal * this.rem, imgH * k.iconscal * this.rem];

		var iconAnchor = [(imgW * k.iconscal / 2) * this.rem, (imgH * k.iconscal) * this.rem];
		var nameLength = Vue.prototype.getStrLength(k.name);
		var strpx = nameLength * 6.4;//一个字符约等于6.4个像素
		var leftpx = strpx / 2 - imgW / 2;
		const type = k.pmid.split("_")[0];
		if (rotate == "" && type == "WindArrow") {
			rotate = "transform: rotate(180deg);";
		}
		var lhIcon = L.divIcon({
			html: "<label style= 'position: relative;left: -" + leftpx + "px;color:" + Vue.prototype.abgr2rgba(k.labelcolor) + ";text-shadow: 1px 1px 1px #000, -1px  -1px 1px  #000; white-space: nowrap;'>" + k.name + "</label>" +
				"<img style ='width:" + iconSize[0] + "px;height:" + iconSize[1] + "px;" + rotate + "' src=" + k.iconhref + ">",
			className: "lh-div-icon",
			iconSize: iconSize,
			iconAnchor: iconAnchor,
			popupAnchor: [-3, 3]
		});
		return L.marker(latLng, { icon: lhIcon, parm: k });
	}

	//线要素创建
	static createLine(k: any) {
		var latlngs = [];
		if (!k.coordinates) {
			return;
		}
		if (k.coordinates.indexOf("@") == -1) {
			var cs = k.coordinates.split(" ");
			cs.forEach((k, v) => {
				var arr = k.split(",");
				latlngs.push(L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2])));
			});

		} else {
			var cs = k.coordinates.split("@")[0].split(" ");
			cs.forEach((k, v) => {
				var arr = k.split(",");
				latlngs.push(L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2])));
			});
		}
		return L.polyline(latlngs, { color: Vue.prototype.abgr2rgba(k.linecolor), weight: k.linewidth, parm: k })
	}

	//面要素创建
	static createPolygon(k: any) {
		var latlngs = [];
		if (!k.coordinates) {
			return;
		}
		if (k.coordinates.indexOf("@") == -1) {
			var cs = k.coordinates.split(" ");
			cs.forEach((k, v) => {
				var arr = k.split(",");
				latlngs.push(L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2])));
			});

		} else {
			var cs = k.coordinates.split("@")[1].split(" ");
			cs.forEach((k, v) => {
				var arr = k.split(",");
				latlngs.push(L.latLng(Number(arr[1]), Number(arr[0]), Number(arr[2])));
			});
		}
		return L.polygon(latlngs, {
			color: Vue.prototype.abgr2rgba(k.linecolor),
			fillColor: Vue.prototype.abgr2rgba(k.polygoncolor),
			weight: k.linewidth,
			fillOpacity: k.pmid.split("_")[0] == "FireSpaces" ? 0.3 : 1,
			parm: k
		})
	}
}