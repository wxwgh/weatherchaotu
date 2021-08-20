<template>
	<div class="tooltop_div">
		<div class="tooltop_button_parent" @click="ceju_click()">
			<span class="iconfont icon-ceju"></span>
			<span>测距</span>
		</div>
		<div class="tooltop_button_parent" @click="cemian_click()">
			<span class="iconfont icon-xiankuang"></span>
			<span>测面</span>
		</div>
		<div class="tooltop_button_parent" @click="path_click()">
			<span class="iconfont icon-biaoji"></span>
			<span>路径</span>
		</div>
		<div class="tooltop_button_parent"  @click="clear_click()">
			<span class="iconfont icon-clear"></span>
			<span>清除</span>
		</div>
		<div class="tooltop_button_parent"  @click="full_click()">
			<span :class="{'iconfont icon-quanping1':is_full,'iconfont icon-quanping2':is_window}"></span>
			<span>全屏</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tooltop',
		data() {
			return {
				layers:[],
				is_full:false,
				is_window:true,
			}
		},
		methods: {
			//测距
			ceju_click(){
				var $this = this;
				var map = this.$store.state.map;
				this.unbindMapEvent();
				this.switchMouseStyle(true);
				var point_first=null;
				var line = null;
				var total_distance=0;
				//绑定事件
				map.on("mousedown",function(e){
					//判断是否是左键
					if(e.originalEvent.button===0){
						if(point_first===null){
							point_first=e.latlng;
							var marker = $this.create_marker(point_first,"起点","起点","测距");
						}
						if(point_first&&point_first!==e.latlng){
							//计算两点距离
							var first = point_first;
							var end = e.latlng;
							var temp_distance = first.distanceTo(end);
							total_distance+=temp_distance;
							var distance = (temp_distance/1000).toFixed(2)+"千米";
							var marker = $this.create_marker(e.latlng,distance,"中间","测距");
							var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
							$this.layers.push(tempLine);
							
							point_first=e.latlng;
						}
					}
					
				});
				map.on("mousemove",function(e){
					if(line!=null){
						line.remove();
					}
					if(point_first){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}
				});
				map.on("contextmenu",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(point_first){
						var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						$this.layers.push(tempLine);
						var first = point_first;
						var end = e.latlng;
						var temp_distance = first.distanceTo(end);
						total_distance+=temp_distance;
						total_distance = (total_distance/1000).toFixed(2)+"千米";
						var marker = $this.create_marker(e.latlng,total_distance,"终点","测距");
					}
					$this.switchMouseStyle(false);
					$this.unbindMapEvent();
				});
			},
			//测面
			cemian_click(){
				var $this = this;
				var map = this.$store.state.map;
				this.unbindMapEvent();
				this.switchMouseStyle(true);
				var point_first=null;
				var point_end = null;
				var line = null;
				var line2 = null;
				var lines=[];
				var points = [];
				map.on("mousedown",function(e){
					//判断是否是左键
					if(e.originalEvent.button===0){
						if(point_first===null&&point_end===null){
							point_first=e.latlng;
							point_end=e.latlng
							points.push(point_first);
						}
						if(point_first&&point_first!==e.latlng){
							
							var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
							lines.push(tempLine);
							points.push(e.latlng);
							point_first=e.latlng;
						}
					}
				})
				map.on("mousemove",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(line2!=null){
						line2.remove();
					}
					if(point_first&&point_end===null){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}else if(point_first&&point_end){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						line2=L.polyline([[point_end.lat,point_end.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}
				})
				map.on("contextmenu",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(line2!=null){
						line2.remove();
					}
					if(point_first&&point_end){
						var temp=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						var temp2=L.polyline([[point_end.lat,point_end.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						lines.push(temp);
						lines.push(temp2);
						points.push(e.latlng);
						for(let i=0;i<lines.length;i++){
							lines[i].remove();
						}
						//获取面积
						var coordinates=[];
						for(let i=0;i<points.length;i++){
							var coordinate =[points[i].lng,points[i].lat];
							coordinates.push(coordinate);
							if(i===points.length-1){
								var temp = [points[0].lng,points[0].lat];
								coordinates.push(temp);
							}
						}
						var turfPolygon = $this.turf.polygon([coordinates]);
						var temp_area = $this.turf.area(turfPolygon);
						var area = (temp_area/1000000).toFixed(2)+"平方千米";
						var polygon  = L.polygon(points,{color: 'blue',weight:1}).addTo(map);
						var popup = L.popup({autoClose:false,closeOnClick:false}).setLatLng(polygon.getCenter()).setContent(area).openOn(map);
						polygon.bindPopup(popup);
						$this.layers.push(polygon);
					}
					$this.switchMouseStyle(false);
					$this.unbindMapEvent();
				})
			},
			//删除
			clear_click(){
				for(let i=0;i<this.layers.length;i++){
					this.layers[i].remove();
				}
				this.layers.splice(0,this.layers.length);
			},
			// 路径分析
			path_click(){
				var $this = this;
				var map = this.$store.state.map;
				this.unbindMapEvent();
				this.switchMouseStyle(true);
				var point_first=null;
				var line = null;
				var total_distance=0;
				//绑定事件
				map.on("mousedown",function(e){
					//判断是否是左键
					if(e.originalEvent.button===0){
						if(point_first===null){
							point_first=e.latlng;
							var marker = $this.create_marker(point_first,"起点","起点","路径分析");
						}
						if(point_first&&point_first!==e.latlng){
							//打开loading
							$this.$store.state.loading=true;
							// 天地图路径分析参数
							var params = {
								postStr: {
									orig: point_first.lng+","+point_first.lat,
									dest: e.latlng.lng+","+e.latlng.lat
								},
								type: 'search',
								tk: $this.$store.state.tianditu_key
							};
							$this.axios({
								method:"get",
								url:$this.$store.state.tianditu_path_url,
								params:params,
							}).then(function(result){
								var data = $this.$x2js.xml2js(result.data).result;
								if(data==""){
									$this.myCommon.get_message("暂无结果,请重新选择起点终点");
									$this.clear_click();
								}else{
									var routelatlon = data.routelatlon;
									//全长（单位：公里）
									var distance = data.distance;
									//行驶总时间（单位：秒）
									var duration = data.duration;
									var latlngs = $this.myCommon.strtolatlngs(routelatlon);
									var content = '<div class="leaflet-popupTable-content"><table border="0" cellspacing="0" >';
									content += '<tr><td>总路程</td><td>' + distance + 'km</td></tr>';
									content += '<tr><td>预计行驶时间</td><td>' + $this.myCommon.datefmt(duration) + '</td></tr>';
									content += '</table></div>';
									var layer = L.polyline(latlngs, { color: 'blue'}).addTo(map);
									$this.layers.push(layer);
									$this.create_marker(e.latlng,content,"终点","路径分析");
								}
								//关闭loading
								$this.$store.state.loading=false;
								$this.switchMouseStyle(false);
								$this.unbindMapEvent();
								
							})
								
						}
					}
					
				});
			},
			// 全屏
			full_click(){
				var map = this.$store.state.map;
				if(this.is_full){
					this.is_full=false;
					this.is_window=true;
				}else{
					this.is_full=true;
					this.is_window=false;
				}
				this.screenfull.toggle();
				
			},
			unbindMapEvent(){
				var map = this.$store.state.map;
				map.off("mousedown");
				map.off("mousemove");
				map.off("contextmenu");
			},
			switchMouseStyle(flag){
				var map = this.$store.state.map;
				if(flag){
					L.DomUtil.setClass(map._container,'mapCursor');
				}else{
					L.DomUtil.setClass(map._container,'mapUnCursor');
				}
			},
			create_marker(latlng,content,type,button_type){
				var $this=this;
				var map = this.$store.state.map;
				var myIcon="";
				if(button_type=="测距"){
					var icon_url="";
					if(type=="起点"){
						icon_url=require('../assets/images/ceju/ceju_start.png')
					}else if(type=="终点"){
						icon_url=require('../assets/images/ceju/ceju_end.png')
					}else{
						icon_url=require('../assets/images/ceju/ceju_mid.png')
					}
					myIcon = L.icon({
					    iconUrl: icon_url,
						iconSize: [30, 50],
						iconAnchor: [15, 50],
						popupAnchor: [1, -34],
					});
				}else if(button_type=="路径分析"){
					var icon_url="";
					if(type=="起点"){
						icon_url=require('../assets/images/lujing/lujing_start.png')
					}else if(type=="终点"){
						icon_url=require('../assets/images/lujing/lujing_end.png')
					}
					myIcon = L.icon({
					    iconUrl: icon_url,
						iconSize: [30, 37],
						iconAnchor: [15, 37],
						popupAnchor: [1, -34],
					});
				}
				var marker = L.marker(latlng, {icon: myIcon}).addTo(map);
				var popup = L.popup({autoClose:true,closeOnClick:true}).setLatLng(latlng).setContent(content);
				marker.bindPopup(popup);
				$this.layers.push(marker);
				return marker;
			},
		},
	}
</script>

<style lang="less">
.tooltop_div{
	position:absolute;
	width:350px;
	right:25px;
	top:90px;
	color:#fff;
	z-index:1002;
	border-radius: 4px;
    background: rgba(0,0,0,.4);
	line-height:35px;
	text-align:center;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
}
.tooltop_button_parent:not(:last-child):after{
	content: '';
	display: block;
	position: absolute;
	right: -14px;
	top: 50%;
	transform: translateY(-50%);
	width: 1px;
	height: 14px;
	background: #ccc;
}
.tooltop_button_parent{
	position: relative;
	cursor:pointer;
}
.tooltop_button_parent:hover{
	color:#409EFF;
}
.tooltop_button_parent>span:nth-child(1){
	font-size: 16px;
	margin-right:4px;
}
.tooltop_button_parent>span:nth-child(2){
	font-size: 14px;
}


// 路径分析弹窗样式
.leaflet-popupTable-content {
  font-size: 16px;
  text-align: center;
  line-height: 25px;
  
}
.leaflet-popupTable-content th,
.leaflet-popupTable-content td{
	border: 1px solid #efefef;
	padding: 3px 7px 2px 2px;
	
}
</style>
