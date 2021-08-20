import $store from '@/store/index.js';
//引入md5
import md5 from "md5";
import {Message} from 'element-ui'
export default{
	UUID(){
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
		}
		return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
	},
	//创建marker
	create_marker(latlng,icon_url,temp_config,name,type){
		var $this=this;
		var map = $store.state.map;
		var marker="";
		var task_config=$store.state.task_config;
		//判断是否是遂行任务
		if(name==="遂行任务"){
			if(type&&type=="fire"){
				var myIcon = L.icon({
				    iconUrl:icon_url,
					iconSize: [75, 45],
					iconAnchor: [33, 45],
				});
				marker = L.marker(latlng, {icon: myIcon}).addTo(map);
				marker.bindTooltip(temp_config.name,{
					direction:"right",
					sticky:true,
					offset:L.point(5,0)
				})
				task_config.markers.push(marker);
			}else if(type&&type=="FirePoint"||type=="Procession"||type=="zhb"||type=="FireGif"||type=="Label"||type=="Picture"||type=="Video"||type=="WindArrow"||type=="realTimeWeather"||type=="GroundLabel"){
				var myIcon = L.icon({
				    iconUrl:icon_url,
					iconSize: [24, 24],
					iconAnchor: [12, 24],
				});
				marker = L.marker(latlng, {icon: myIcon});
				marker.bindTooltip(temp_config.name,{
					direction:"right",
					sticky:true,
					offset:L.point(5,0)
				})
				marker.attribution=temp_config;
				task_config.marker_canvas_layer.addLayer(marker);
			}else if(type&&type=="FireLined"||type=="Dwfbx"||type=="SeclusionBand"){
				marker = this.create_line(temp_config);
				task_config.state_markers.push(marker);
			}else if(type=="oneArrow"||type=="twoArrow"||type=="threeArrow"||type=="FireSpaces"){
				marker = this.create_polygon(temp_config);
				task_config.state_markers.push(marker);
			}else if(type=="addPicToMap"){
				if(temp_config.files&&temp_config.files!=""){
					marker = this.create_pic(temp_config);
					task_config.state_markers.push(marker);
				}
			}
			
		}else if(name=="火场范围查询"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [44, 44],
				iconAnchor: [22, 44],
			});
			marker = L.marker(latlng, {icon: myIcon});
			marker.bindTooltip(temp_config.T_CONNECT,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			}).addTo(map)
			task_config.fire_marker_layer.push(marker);
		}else if(name==="人员轨迹查询"||name==="无人机轨迹查询"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [30, 39],
				iconAnchor: [15, 39],
			});
			marker = L.marker(latlng, {icon: myIcon});
			marker.bindTooltip(temp_config.tm,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			})
			task_config.track_marker_layer.addLayer(marker);
		}else if(name==="卫星热点"||name==="卫星遥感"||name==="人员通信装备信息"||name==="单位驻地信息"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [44, 44],
				iconAnchor: [22, 44],
			});
			marker = L.marker(latlng, {icon: myIcon}).addTo(map);
			marker.attribution = temp_config;
			marker.bindTooltip(temp_config.name,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			})
			marker.on("click",function(){
				$store.state.right_panel_config=this.attribution;
				$store.state.right_panel_flag=true;
			})
			$this.push_markers(temp_config.type,temp_config.child_name,marker);
		}else if(name==="无人机轨迹"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [44, 44],
				iconAnchor: [22, 44],
			});
			marker = L.marker(latlng, {icon: myIcon}).addTo(map);
			marker.attribution = temp_config;
			marker.bindTooltip(temp_config.name,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			})
			marker.on("click",function(){
				//清空无人机轨迹查询marker和lines
				if(this.attribution.gpsid!=$store.state.task_config.uav_id){
					$store.state.task_config.uav_id = this.attribution.gpsid;
					$store.state.task_config.uav_type = temp_config.child_name;
					$this.clear_track_marker_layer();
				}
				$store.state.right_panel_config=this.attribution;
				$store.state.right_panel_flag=true;
			})
			$this.push_markers(temp_config.type,temp_config.child_name,marker);
		}else if(name==="无人机火场态势"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [44, 39],
				iconAnchor: [22, 39],
			});
			marker = L.marker(latlng, {icon: myIcon}).addTo(map);
			marker.attribution = temp_config;
			marker.bindTooltip(temp_config.name,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			})
			marker.on("click",function(){
				$store.state.right_panel_config=this.attribution;
				$store.state.right_panel_flag=true;
			})
			$this.push_markers(temp_config.type,temp_config.child_name,marker);
		}else if(name==="在线人员位置"){
			var myIcon = L.icon({
			    iconUrl: icon_url,
				iconSize: [44, 44],
				iconAnchor: [22, 44],
			});
			marker = L.marker(latlng, {icon: myIcon}).addTo(map);
			marker.attribution = temp_config;
			marker.bindTooltip(temp_config.name,{
				direction:"right",
				sticky:true,
				offset:L.point(5,0)
			})
			marker.on("click",function(){
				//清空人员轨迹查询marker和lines
				if(this.attribution.gpsid!=$store.state.task_config.person_id){
					$store.state.task_config.person_id = this.attribution.gpsid;
					$store.state.task_config.person_type = temp_config.child_name;
					$this.clear_track_marker_layer();
				}
				$store.state.right_panel_config=this.attribution;
				$store.state.right_panel_flag=true;
			})
			$this.push_markers(temp_config.type,temp_config.child_name,marker);
		}
		return marker;
	},
	//填充marker数组
	push_markers(type,name,marker){
		var left_configs = $store.state.left_panel_config;
		for(let i=0;i<left_configs.length;i++){
			for(let j=0;j<left_configs[i].child.length;j++){
				if(type===left_configs[i].child[j].name){
					for(let x=0;x<left_configs[i].child[j].child.length;x++){
						if(name === left_configs[i].child[j].child[x].name){
							left_configs[i].child[j].child[x].markers.push(marker);
						}
					}
				}
				
			}
		}
	},
	get_message(message){
		Message({
		    message: message,
			center:true,
			offset:parseInt(window.innerHeight/2),
			customClass:"message_class"
		});
	},
	//清空火场范围查询marker和lines,circle
	clear_fire_marker_layer(){
		var task_config = $store.state.task_config;
		//清空marker
		for(let i=0;i<task_config.fire_marker_layer.length;i++){
			task_config.fire_marker_layer[i].remove();
		}
		task_config.fire_marker_layer=[];
		//清空circle
		if(task_config.fire_circle_layer!=""){
			task_config.fire_circle_layer.remove();
		}
		//清空line
		for(let i=0;i<task_config.fire_scope_result.length;i++){
			if(task_config.fire_scope_result[i].line_layer!=""){
				task_config.fire_scope_result[i].line_layer.remove();
			}
		}
		//清空列表
		task_config.fire_scope_result=[];
		//关闭范围查询结果列表
		task_config.fire_scope_result_flag=false;
	},
	//清空人员轨迹查询marker和lines
	clear_track_marker_layer(){
		//海量轨迹marker图层
		$store.state.task_config.track_marker_layer.clearLayers();
		//人员轨迹 线图层
		if($store.state.task_config.track_line_layer!=""){
			$store.state.task_config.track_line_layer.remove();
		}
		
	},
	//根据名称获取right_config
	get_right_config(name){
		//创建在线人员 海量marker图层
		var left_configs = $store.state.left_panel_config;
		var right_config="";
		for(let i=0;i<left_configs.length;i++){
			for(let j=0;j<left_configs[i].child.length;j++){
				if(left_configs[i].child[j].name==name){
					right_config = left_configs[i].child[j].right_config;
				}
				
			}
		}
		return right_config;
	},
	//清楚火场动态元素
	clear_state_markers_layers(){
		var task_config = $store.state.task_config;
		//清空火场动态元素
		if(task_config.state_markers.length>0){
			for(let j = 0;j<task_config.state_markers.length;j++){
				task_config.state_markers[j].remove();
			}
			task_config.state_markers=[];
		}
		//清空canvas图层
		task_config.marker_canvas_layer.clearLayers();
	},
	sign(params, appsecret) {
		/**
		* 签名生成规则
		* 1、所有请求参数（排除lhsign），根据参数key排序（升序）拼接成键值连接的字符串
		* 2、最后把appsecret加在前面，得到待加密字符串
		* 3、再进行md5加密转大写，得到签名
		* @param params    请求参数map,带有lhappid,lhtime
		* @param appsecret app密钥
		* @return
		*/
	
		//如果有，去掉签名字段
		if (params.hasOwnProperty("lhsign"))
			delete params["lhsign"];
	
	
		//根据参数Key排序（升序）
		let tempKeySort = Object.keys(params).sort();
		//构造待签名的请求串
		let sb = "";
	
		tempKeySort.forEach((k, v) => {
			sb += k + params[k];
		});
	
		//把密钥加载最前面
		sb = appsecret + sb;
		//生成md5值,转大写
		let lhsign = md5(sb).toUpperCase();
		return lhsign;
	},
	//创建图片
	async create_pic(k){
		//背景图片-6
		//问题：图片根据面显示问题
		var map = $store.state.map;
		var task_config = $store.state.task_config;
		var latlngs = [];
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
		var img_url = JSON.parse(k.files)[0].url;
		var temp_data = await this.get_img_size(img_url);
		var w = temp_data.width;
		var h = temp_data.height;
		var southWest = map.unproject([0, h], map.getZoom());
		var northEast = map.unproject([w, 0], map.getZoom());
		var bounds = new L.LatLngBounds(southWest, northEast);
		var image = L.imageOverlay(img_url, bounds, { crossOrigin: false }).addTo(map);
		image.attribution = k;
		return image;
	},
	//获取网络图片或本地图片原始宽高 需要同步函数
	async get_img_size(img_url){
		let img = new Image()
		img.src = img_url;
		var temp_data = img.onload = function () {
			console.log('width', img.width)
			console.log('height', img.height)
			// dimensions of the image
			var temp={
				width:img.width,
				height:img.height
			}
			return temp;
		}
		return temp_data;
	},
	//线要素创建
	create_line(k) {
		var map = $store.state.map;
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
		var layer = L.polyline(latlngs, { color: this.abgr2rgba(k.linecolor), weight: k.linewidth}).addTo(map);
		layer.attribution = k;
		return layer;
	},
	//面要素创建
	create_polygon(k) {
		var map = $store.state.map;
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
		var layer = L.polygon(latlngs, {
			color: this.abgr2rgba(k.linecolor),
			fillColor: this.abgr2rgba(k.polygoncolor),
			weight: k.linewidth,
			fillOpacity: k.pmid.split("_")[0] == "FireSpaces" ? 0.3 : 1
		}).addTo(map);
		layer.attribution = k;
		return layer;
	},
	abgr2rgba(str) {
		var newstr = str.trim();
		var val = newstr.split("").reverse().join("");
		var rst = "";
		if (val.length == 8) {
			var r = parseInt(val.substr(0, 2), 16);
			var g = parseInt(val.substr(2, 2), 16);
			var b = parseInt(val.substr(4, 2), 16);
			var a = parseInt(val.substr(6, 2), 16);
			rst = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		}
		return rst;
	},
	strtolatlngs(str) {
		var rep = [];
		var strs = str.split(';');
		strs.forEach(element => {
			if (element) {
				var tempstr = element.split(',');
				rep.push(L.latLng(Number(tempstr[1]), Number(tempstr[0])));
			}
		});
		return rep;
	},
	datefmt(s) {
		var res = "";
		if ((s / 60 / 60) > 1) {
			res = (s / 60 / 60).toFixed(3) + '小时';
		} else {
			res = (s / 60).toFixed(3) + '分钟';
		}
		return res;
	},
}