<template>
	<div class="rightpanel_div_parent">
		<div class="rightpanel_div" v-if="get_right_flag">
			<div class="overlay-boxs" v-if="get_is_full_img.flag">
				<span class="close" @click="full_close_click()"><i class="iconfont icon-guanbi4"></i></span>
				<div class="overlay-head">{{get_is_full_img.name}}</div>
				<div class="overlay-main">
					<img class="fullImg" :src="get_is_full_img.url" />
				</div>
			</div>
			<div class="rightpanel_parent">
				<!-- 头部标题 -->
				<div class="rightpanel_header">
					<span>{{get_right_config.name}}</span>
					<span class="iconfont icon-guanbi4" @click="close_click()"></span>
				</div>
				<!-- 内容 -->
				<div class="rightpanel_main" v-if="get_right_config.type==='人员通信装备信息'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
						<div class="danwei_parent">
							<span :class="{'active':get_right_config.danwei}" @click="danwei_click()">本单位</span>
							<span :class="{'active':get_right_config.danwei_xiashu}"
								@click="danwei_xiashu_click()">本单位及下属单位</span>
						</div>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='单位驻地信息'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='在线人员位置'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
					<div class="rightpanel_main_header">
						<span>轨迹查询</span>
					</div>
					<div class="rightpanel_time_parent">
						<span>时间范围</span>
						<el-date-picker v-model="person_track_time" popper-class="time_select_class" align="left"
							size="mini" type="datetimerange" range-separator="至" start-placeholder="开始时间"
							end-placeholder="结束时间">
						</el-date-picker>
					</div>
					<div class="time_button_parent">
						<div @click="person_track()">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>开始查询</span>
							</div>
						</div>
						<div @click="person_track_clear()">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='无人机轨迹'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
					<div class="rightpanel_main_header">
						<span>轨迹查询</span>
					</div>
					<div class="rightpanel_time_parent">
						<span>时间范围</span>
						<el-date-picker v-model="uav_track_time" popper-class="time_select_class" align="left"
							size="mini" type="datetimerange" range-separator="至" start-placeholder="开始时间"
							end-placeholder="结束时间">
						</el-date-picker>
					</div>
					<div class="time_button_parent">
						<div @click="uav_track()">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>开始查询</span>
							</div>
						</div>
						<div @click="uav_track_clear()">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='无人机火场态势'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='卫星热点'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='卫星遥感'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
					<div class="rightpanel_main_header">
						<span>卫星图片</span>
					</div>
					<div class="rightpanel_img_parent">
						<div @click="img_click(get_attribution_img.可见光图片地址,'可见光图片')">
							<img :src="get_attribution_img.可见光图片地址">
							<span>可见光图片</span>
						</div>
						<div @click="img_click(get_attribution_img.热成像图片地址,'热成像图片')">
							<img :src="get_attribution_img.热成像图片地址">
							<span>热成像图片</span>
						</div>
					</div>
				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='火场'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
					<div class="rightpanel_main_header">
						<span>范围查询</span>
					</div>
					<div class="rightpanel_scope_parent">
						<span>范围查询</span>
						<el-autocomplete class="scope_input" v-model="scope_num" :fetch-suggestions="scope_input_search"
							placeholder="请输入范围" @select="scope_select" popper-class="scope_select_class" placement="bottom">
						</el-autocomplete>
						<span>km</span>
					</div>
					<div class="scope_button_parent">
						<div @click="scope_click()">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>开始查询</span>
							</div>
						</div>
						<!-- <div>
							<div>
								<span class="iconfont icon-jisuanjisuanshu"></span>
								<span>距离查询</span>
							</div>
						</div> -->
						<div @click="scope_clear()">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
					<div class="scope_list_parent" v-if="get_result_flag">
						<div class="rightpanel_main_header">
							<span>附近人员单位</span>
						</div>
						<div class="scope_result_parent">
							<div v-for="post in get_result" :class="{'scope_result':true,'active':post.is_active}" @click="scope_list_click(post)">
								<div>
									<img :src="post.icon_url" />
									<span>{{post.name}}</span>
								</div>
								<div>
									<span>总路程：{{post.distance}}</span>
								</div>
								<div>
									<span>总耗时：{{post.duration}}</span>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="rightpanel_main" v-else-if="get_right_config.type==='火场动态元素'">
					<div class="rightpanel_main_header">
						<span>{{get_right_config.title}}</span>
					</div>
					<div class="rightpanel_main_content">
						<div v-for="(value, key, index) in get_attribution">
							<span>{{key}}：</span>
							<span>{{value}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'rightpanel',
		data() {
			return {
				//在线人员轨迹查询 时间范围模型
				person_track_time: "",
				//无人机轨迹查询 时间范围模型
				uav_track_time:"",
				scope_num: "",
				hint_info: [{
						"value": "10"
					},
					{
						"value": "50"
					},
					{
						"value": "100"
					},
					{
						"value": "200"
					},
					{
						"value": "500"
					},
					{
						"value": "1000"
					},
				]
			}
		},
		computed: {
			get_is_full_img: function() {
				return this.$store.state.is_full_img;
			},
			get_right_config: function() {
				return this.$store.state.right_panel_config;
			},
			get_right_flag: function() {
				return this.$store.state.right_panel_flag;
			},
			get_attribution: function() {
				if (this.$store.state.right_panel_config.type === "人员通信装备信息") {
					if (this.$store.state.right_panel_config.danwei) {
						return this.$store.state.right_panel_config.attribution_danwei;
					} else {
						return this.$store.state.right_panel_config.attribution_danwei_xiashu;
					}
				} else {
					return this.$store.state.right_panel_config.attribution;
				}

			},
			get_attribution_img: function() {
				return this.$store.state.right_panel_config.attribution_img;
			},
			get_result: function() {
				return this.$store.state.task_config.fire_scope_result;
			},
			get_result_flag: function() {
				return this.$store.state.task_config.fire_scope_result_flag;
			}
		},
		methods: {
			//输入提示查询
			scope_input_search(queryString, cb) {
				var results = []
				var flag = false;
				for (let i = 0; i < this.hint_info.length; i++) {
					if (this.hint_info[i].value.indexOf(queryString) != -1) {
						var temp = {
							value: this.hint_info[i].value
						}
						results.push(temp);
						flag = true;
					}
				}
				if (flag) {
					cb(results);
				} else {
					cb(this.hint_info);
				}

			},
			// 火场范围查询
			scope_click() {
				if (this.scope_num == "" || this.scope_num == null) {
					this.myCommon.get_message("请先设置查询范围");
					return false;
				} else {
					var $this = this;
					// 开启loading
					this.$store.state.loading=true;
					//清空范围查询相关图层
					this.myCommon.clear_fire_marker_layer();
					var map = this.$store.state.map;
					//获取右侧面板属性信息
					var attribution = this.$store.state.right_panel_config.attribution;
					var task_config = this.$store.state.task_config;
					//获取半径,由于单位是km需要*1000
					var radius = this.scope_num * 1000;
					var point_new = L.CRS.EPSG3857.project({
						lat: attribution.纬度,
						lng: attribution.经度
					});
					var dx = point_new.x;
					var dy = point_new.y;
					//点集
					var parts = [];
					//计算圆的边缘所有点
					for (var i = 0; i < 360; i++) {
						var radians = (i + 1) * Math.PI / 180;
						var circlePoint = [Math.cos(radians) * radius + dx, Math.sin(radians) * radius + dy];
						parts[i] = L.CRS.EPSG3857.unproject(L.point(circlePoint));
					}
					//创建范围图层
					task_config.fire_circle_layer = L.polygon(parts).addTo(map);
					var geometry = L.Util.transform(task_config.fire_circle_layer, L.CRS.EPSG4326, L.CRS.EPSG3857);
					//构建查询参数
					var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
						datasetNames: ["zhpt:FD_DWDM"],
						geometry: geometry,
						spatialQueryMode: "INTERSECT"
					});
					var features=[
						{
							properties:{
								T_LATITUDE:26.85,
								T_LONGITUDE:99.44,
								T_CONNECT:"某总队",
								T_TYPE:"2"
							}
							
						},
						{
							properties:{
								T_LATITUDE:26.65,
								T_LONGITUDE:100.45,
								T_CONNECT:"某支队",
								T_TYPE:"1"
							}
						},
						{
							properties:{
								T_LATITUDE:27.26,
								T_LONGITUDE:100.38,
								T_CONNECT:"某大中队",
								T_TYPE:"0"
							}
						}
					]
					for (let i = 0; i < features.length; i++) {
						var icon_url = "";
						if (features[i].properties.T_TYPE == "" || features[i].properties.T_TYPE ==
							null) {
							icon_url = task_config.fire_marker_icon_url[0];
						} else {
							icon_url = task_config.fire_marker_icon_url[Number(features[i].properties
								.T_TYPE)];
						}
						//创建marker
						var marker = $this.myCommon.create_marker([features[i].properties.T_LATITUDE,
							features[i].properties.T_LONGITUDE
						], icon_url, features[i].properties, "火场范围查询", "");
						//路径分析
						$this.scope_path_analyze(features[i],marker,icon_url);
					}
					// var url = this.$store.state.chaotu_iserver_url + '/iserver/services/data-zhpt/rest/data';
					// L.supermap.featureService(url).getFeaturesByGeometry(geometryParam, function(result) {
					// 	if (result.type == "processCompleted") {
					// 		var features = result.result.features.features;
					// 		if(features.length>0){
					// 			for (let i = 0; i < features.length; i++) {
					// 				var icon_url = "";
					// 				if (features[i].properties.T_TYPE == "" || features[i].properties.T_TYPE ==
					// 					null) {
					// 					icon_url = task_config.fire_marker_icon_url[0];
					// 				} else {
					// 					icon_url = task_config.fire_marker_icon_url[Number(features[i].properties
					// 						.T_TYPE)];
					// 				}
					// 				//创建marker
					// 				var marker = $this.myCommon.create_marker([features[i].properties.T_LATITUDE,
					// 					features[i].properties.T_LONGITUDE
					// 				], icon_url, features[i].properties, "火场范围查询", "");
					// 				//路径分析
					// 				$this.scope_path_analyze(features[i],marker,icon_url);
					// 			}
					// 		}else{
					// 			$this.myCommon.get_message("该范围暂无结果");
					// 			// 关闭loading
					// 			$this.$store.state.loading = false;
					// 			return false;
					// 		}
							
					// 	} else {
					// 		$this.myCommon.get_message("查询出错");
					// 		// 关闭loading
					// 		$this.$store.state, loading = false;
					// 		return false;
					// 	}
					// });
				}
			},
			//范围结果列表点击事件
			scope_list_click(post){
				var map = this.$store.state.map;
				//判断列表是否选中
				if(post.is_active){
					post.is_active=false;
					//清除范围路径
					post.line_layer.remove();
				}else{
					post.is_active=true;
					//地图定位
					map.setView(post.marker.getLatLng(),10);
					//绘制路径
					post.line_layer = L.polyline(post.latlngs, { color: 'blue'}).addTo(map);
				}
				
				
			},
			//范围路径分析
			scope_path_analyze(feature,marker,icon_url){
				var $this=this;
				//获取右侧面板属性信息
				var attribution = this.$store.state.right_panel_config.attribution;
				var task_config = this.$store.state.task_config;
				// 天地图路径分析参数
				var params = {
					postStr: {
						orig: attribution.经度 + "," + attribution.纬度,
						dest: feature.properties.T_LONGITUDE + "," + feature
							.properties.T_LATITUDE
					},
					type: 'search',
					tk: $this.$store.state.tianditu_key
				};
				$this.axios({
					method: "get",
					url: $this.$store.state.tianditu_path_url,
					params: params,
				}).then(function(result) {
					var data = $this.$x2js.xml2js(result.data).result;
					var routelatlon = data.routelatlon;
					var latlngs = $this.myCommon.strtolatlngs(routelatlon);
					var temp = {
						id:$this.$UUID(),
						name: feature.properties.T_CONNECT,
						distance: data.distance + "(km)",
						duration: $this.myCommon.datefmt(data.duration),
						icon_url: icon_url,
						latlngs: latlngs,
						marker:marker,
						is_active:false,
						line_layer:""
					}
					marker.attribution = temp;
					var map = $this.$store.state.map;
					marker.on("click",function(){
						//判断列表是否选中
						if(this.attribution.is_active){
							this.attribution.is_active=false;
							//清除范围路径
							this.attribution.line_layer.remove();
						}else{
							this.attribution.is_active=true;
							//地图定位
							map.setView(this.getLatLng(),10);
							//绘制路径
							this.attribution.line_layer = L.polyline(this.attribution.latlngs, { color: 'blue'}).addTo(map);
							//设置滚动条位置 判断数组index
							for(let i=0;i<task_config.fire_scope_result.length;i++){
								if(this.attribution.id===task_config.fire_scope_result[i].id){
									$this.$nextTick(() => {
										var result_height = $(".scope_result").height();
										var padding_height = parseInt($(".scope_result").css("padding").split("px")[0])*2;
										var margin_height = parseInt($(".scope_result").css("margin-bottom").split("px")[0]);
										var scroll_height = (result_height+padding_height+margin_height+2).toFixed(2);
										document.querySelector(".scope_result_parent").scrollTop = i*scroll_height;
									});
								}
							}
						}
					})
					task_config.fire_scope_result.push(temp);
					//打开结果列表
					task_config.fire_scope_result_flag = true;
					$this.$store.state.loading=false;
				})
			},
			//范围查询清楚
			scope_clear(){
				this.myCommon.clear_fire_marker_layer();
			},
			// 范围查询 下拉提示内容选中事件
			scope_select(item) {
				// alert(item.value);
			},
			//无人机轨迹查询
			uav_track(){
				var $this = this;
				//判断时间范围是否已选取
				if (this.uav_track_time == "" || this.uav_track_time == null) {
					this.myCommon.get_message("请先选择时间范围");
					return false;
				} else {
					// 开启loading
					this.$store.state.loading = true;
					//清空轨迹查询marker和line
					this.myCommon.clear_track_marker_layer();
				
					var info = this.$store.state.info;
					var map = this.$store.state.map;
					//获取右侧面板配置
					var right_config = this.$store.state.right_panel_config;
					// var out_in_host_url = this.$store.state.out_in_host_url;
					var start_time = this.moment(this.uav_track_time[0]).format("YYYY-MM-DD HH:mm:ss.SSS");
					var end_time = this.moment(this.uav_track_time[1]).format("YYYY-MM-DD HH:mm:ss.SSS");
					// 轨迹查询 参数
					var params = {
						"starttm": start_time,
						"endtm": end_time,
					}
					var datas=[
						{
							latitude:30.14,
							longitude:102.37,
							tm:"点位1"
						},
						{
							latitude:31.35,
							longitude:105.44,
							tm:"点位2"
						},
						{
							latitude:29.99,
							longitude:105.31,
							tm:"点位3"
						},
					]
					var points = [];
					for (let i = 0; i < datas.length; i++) {
						if (i == 0) {
							$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
								right_config.start_icon_url, datas[i], "无人机轨迹查询", "");
						} else if (i == datas.length - 1) {
							$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
								right_config.end_icon_url, datas[i], "无人机轨迹查询", "");
						} else {
							$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
								right_config.mid_icon_url, datas[i], "无人机轨迹查询", "");
						}
						points.push([datas[i].latitude, datas[i].longitude]);
					}
					//创建折线路径
					$this.$store.state.task_config.track_line_layer = L.polyline(points, {
						color: "blue",
						weight: 1
					}).addTo(map);
					$this.$store.state.loading = false;
				// 	this.axios({
				// 		method: "post",
				// 		url:right_config.track_url,
				// 		data: params,
				// 	}).then(function(result) {
				// 		var datas = result.data.data;
				// 		//点数组
				// 		var points = [];
				// 		if (datas != null && datas.length > 0) {
				// 			for (let i = 0; i < datas.length; i++) {
				// 				if (i == 0) {
				// 					$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
				// 						right_config.start_icon_url, datas[i], "无人机轨迹查询", "");
				// 				} else if (i == datas.length - 1) {
				// 					$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
				// 						right_config.end_icon_url, datas[i], "无人机轨迹查询", "");
				// 				} else {
				// 					$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
				// 						right_config.mid_icon_url, datas[i], "无人机轨迹查询", "");
				// 				}
				// 				points.push([datas[i].latitude, datas[i].longitude]);
				// 			}
				// 			//创建折线路径
				// 			$this.$store.state.task_config.track_line_layer = L.polyline(points, {
				// 				color: "blue",
				// 				weight: 1
				// 			}).addTo(map);
				// 			$this.$store.state.loading = false;
				// 		} else {
				// 			$this.myCommon.get_message("当前时间范围暂无数据");
				// 			$this.$store.state.loading = false;
				// 		}
				
				// 	})
				}
			},
			//无人机轨迹清除
			uav_track_clear(){
				this.myCommon.clear_track_marker_layer();
			},
			//人员轨迹清除
			person_track_clear() {
				this.myCommon.clear_track_marker_layer();
			},
			//人员轨迹查询
			person_track() {
				var $this = this;
				//判断时间范围是否已选取
				if (this.person_track_time == "" || this.person_track_time == null) {
					this.myCommon.get_message("请先选择时间范围");
					return false;
				} else {

					// 开启loading
					this.$store.state.loading = true;
					//清空轨迹查询marker和line
					this.myCommon.clear_track_marker_layer();

					var info = this.$store.state.info;
					var map = this.$store.state.map;
					//获取右侧面板配置
					var right_config = this.$store.state.right_panel_config;
					var out_in_host_url = this.$store.state.out_in_host_url;
					var start_time = this.moment(this.person_track_time[0]).format("YYYY-MM-DD HH:mm:ss.SSS");
					var end_time = this.moment(this.person_track_time[1]).format("YYYY-MM-DD HH:mm:ss.SSS");
					// 轨迹查询 参数
					var params = {
						"lhappid": info.appid,
						"lhtime": new Date().getTime(),
						"lhsign": this.myCommon.sign({
							"lhappid": info.appid,
							"lhtime": new Date().getTime(),
							"lhsign": "",
							"projectid": info.projectid, //系统id
							"gpsid": right_config.gpsid, //gpsid
							"starttm": start_time, //开始时间
							"endtm": end_time, //结束时间
						}, info.appsecret),
						"projectid": info.projectid, //系统id
						"gpsid": right_config.gpsid, //gpsid
						"starttm": start_time, //开始时间
						"endtm": end_time, //结束时间
					}
					this.axios({
						method: "get",
						url: out_in_host_url + right_config.track_url,
						params: params,
					}).then(function(result) {
						var datas = result.data.data;
						//点数组
						var points = [];
						if (datas != null && datas.length > 0) {
							for (let i = 0; i < datas.length; i++) {
								if (i == 0) {
									$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
										right_config.start_icon_url, datas[i], "人员轨迹查询", "");
								} else if (i == datas.length - 1) {
									$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
										right_config.end_icon_url, datas[i], "人员轨迹查询", "");
								} else {
									$this.myCommon.create_marker([datas[i].latitude, datas[i].longitude],
										right_config.mid_icon_url, datas[i], "人员轨迹查询", "");
								}
								points.push([datas[i].latitude, datas[i].longitude]);
							}
							//创建折线路径
							$this.$store.state.task_config.track_line_layer = L.polyline(points, {
								color: "blue",
								weight: 1
							}).addTo(map);
							$this.$store.state.loading = false;
						} else {
							$this.myCommon.get_message("当前时间范围暂无数据");
							$this.$store.state.loading = false;
						}

					})
				}
			},
			img_click(src, name) {
				this.$store.state.is_full_img.flag = true;
				this.$store.state.is_full_img.url = src;
				this.$store.state.is_full_img.name = name;
			},
			full_close_click() {
				this.$store.state.is_full_img.flag = false;
			},
			close_click() {
				this.$store.state.right_panel_flag = false;
			},
			danwei_click() {
				this.$store.state.right_panel_config.danwei = true;
				this.$store.state.right_panel_config.danwei_xiashu = false;
			},
			danwei_xiashu_click() {
				this.$store.state.right_panel_config.danwei = false;
				this.$store.state.right_panel_config.danwei_xiashu = true;
			},
		},
	}
</script>

<style lang="less">
	.rightpanel_div_parent{
		position: absolute;
		right: 25px;
		top: 0;
		width: 380px;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}
	.rightpanel_div {
		position: relative;
		color: #fff;
		width: 100%;
		margin-top:100px;
		max-height:80%;
		z-index: 1003;
		background: rgba(10, 15, 25, .5);
		border: 1px rgba(31, 126, 252, .6) solid;
	}

	.rightpanel_parent {
		width: 100%;
		height: 100%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.rightpanel_parent:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 140px;
		background: linear-gradient(to bottom, rgba(12, 52, 130, .5), transparent);
		z-index: -100;
	}

	.rightpanel_header {
		width: 92%;
		height: 40px;
		line-height: 40px;
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		background: url(../assets/images/indexs_head.png) 0 0 no-repeat;
	}

	.rightpanel_header>span:nth-child(1) {
		margin-left: 12px;
		font-weight: bold;
		font-size: 15px;
		width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rightpanel_header>span:nth-child(2) {
		width: 16px;
		cursor: pointer;
	}

	.rightpanel_header>span:nth-child(2):hover {
		color: #409EFF;
	}

	.rightpanel_header>span:nth-child(1):after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 13px;
		width: 4px;
		height: 16px;
		background: #fff;
		border-radius: 2px;
	}

	.rightpanel_main {
		width: 92%;
		max-height: 100%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-top: 15px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
	}

	.rightpanel_main_header {
		position: relative;
		width: 92%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}

	.rightpanel_main_header:before {
		content: '';
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0;
		height: 1px;
		background: rgba(255, 255, 255, .2);
	}

	.rightpanel_main_header>span {
		margin-left: 12px;
	}

	.rightpanel_main_header>span:after {
		content: '';
		display: block;
		position: absolute;
		left: 0px;
		top: 13px;
		width: 4px;
		height: 14px;
		background: #fff;
		border-radius: 2px;
	}

	.rightpanel_main_content {
		position: relative;
		width: 92%;
		line-height: 24px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.rightpanel_main_content>div {
		margin-top: 4px;
		color: #fff;
		font-size: 13px;
		background: url(../assets/images/list.png) 0 center no-repeat;
		padding-left: 24px;
	}

	.rightpanel_main_content>div:nth-child(1) {
		margin-top: 14px;
	}

	.rightpanel_main_content>div:last-child {
		margin-bottom: 10px;
	}

	.danwei_parent {
		font-size: 13px;
	}

	.danwei_parent>span {
		cursor: pointer;
	}

	.danwei_parent>span:first-child {
		margin-right: 5px;
	}

	.danwei_parent>span.active,
	.danwei_parent>span:hover {
		color: #409EFF;
	}

	.rightpanel_time_parent {
		width: 92%;
		margin-top: 15px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		// align-items: flex-start;
	}

	.rightpanel_time_parent>span {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-right: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #409EFF;
		font-weight: bold;
		padding: 0 15px;
	}

	//时间下拉框样式
	.time_select_class {
		left:auto !important;
		right:40px !important;
	}

	.rightpanel_main_content>div>span:last-child {
		white-space: nowrap;
		/* 强制性的在一行显示所有的文本，直到文本结束或者遭遇br标签对象才换行*/
		overflow: hidden;
		/* 溢出的文字隐藏起来*/
		text-overflow: ellipsis;

	}

	//范围查询样式
	.rightpanel_scope_parent {
		width: 92%;
		margin-top: 15px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.rightpanel_scope_parent>span:first-child {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-right: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #409EFF;
		font-weight: bold;
		padding: 0 15px;
	}

	.rightpanel_scope_parent>span:last-child {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-left: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #fff;
		font-weight: bold;
		padding: 0 15px;
	}

	.scope_input {
		flex: 1;
	}

	.scope_input .el-input__inner {
		background: 0;
		border: 1px rgba(255, 255, 255, .2) solid !important;
		line-height: 34px !important;
		font-size: 13px;
		padding: 0 15px;
		border-radius: 0;
		color: #fff;
	}

	// 输入提示框样式
	// .scope_select_class{
	// 	background: rgba(10,15,25,.5);
	// 	border: 1px rgba(31,126,252,.6) solid;
	// }
	// .scope_select_class .el-autocomplete-suggestion__list>li{
	// 	color:#fff;
	// }
	// .scope_select_class .el-autocomplete-suggestion__list>li:hover{
	// 	background: rgba(31, 126, 252, 0.4);
	// }
	// .scope_select_class>.popper__arrow:after{
	// 	border-top-color: rgba(10,15,25,.5)!important;
	// 	border-bottom-color: rgba(10,15,25,.5)!important;
	// }
	// .scope_select_class>.popper__arrow{
	// 	border-top-color: #409EFF!important;
	// 	border-bottom-color:#409EFF!important;
	// }
	.scope_button_parent {
		width: 92%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		text-align: center;
		font-size: 13px;
		color: #fff;
	}

	.scope_button_parent>div {
		background: #236FD1;
		margin-right: 10px;
		width: 90px;
		height: 26px;
		line-height: 26px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
	}

	.scope_button_parent>div:hover {
		background: #409EFF;
	}

	.scope_button_parent>div>div {
		line-height: 26px;
	}

	.scope_button_parent>div:last-child {
		width: 64px;
		margin-right: 0;
	}

	.scope_button_parent>div>div>span:first-child {
		font-size: 14px;
		margin-right: 5px;
	}

	// 轨迹查询样式
	.time_button_parent {
		width: 92%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		text-align: center;
		font-size: 13px;
		color: #fff;
	}

	.time_button_parent>div {
		background: #236FD1;
		width: 90px;
		height: 26px;
		line-height: 26px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
	}

	.time_button_parent>div:hover {
		background: #409EFF;
	}

	.time_button_parent>div>div {
		line-height: 26px;
	}

	.time_button_parent>div:last-child {
		margin-left: 10px;
		width: 64px;
	}

	.time_button_parent>div>div>span:first-child {
		font-size: 14px;
		margin-right: 5px;
	}

	// 时间选择框
	.rightpanel_time_parent .el-range-editor--mini.el-input__inner {
		height: 36px;
		padding: 0 10px;
	}

	.rightpanel_time_parent .el-input__inner {
		background: none;
		border: 1px rgba(255, 255, 255, .2) solid;
		border-radius: 0;
		text-align: center;
	}

	.rightpanel_time_parent .el-date-editor .el-range__icon {
		line-height: 34px !important;
	}

	.rightpanel_time_parent .el-range-editor .el-range-input {
		color: #fff;
		font-family: 'arial';
		background: none;
	}

	.rightpanel_time_parent .el-date-editor .el-range-separator {
		color: #fff;
		line-height: 34px;
		width: auto;
	}

	.rightpanel_time_parent .el-range-editor--mini .el-range__close-icon,
	.el-range-editor--mini .el-range__icon {
		line-height: 34px;
	}

	//范围结果列表演示
	.scope_list_parent {
		width: 92%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 15px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
	}

	.scope_result_parent {
		width: 92%;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		max-height:182px;
		overflow: auto;
	}

	.scope_result {
		background: rgba(25, 40, 58, .4);
		margin-bottom: 10px;
		font-size: 13px;
		padding: 10px;
		border: 1px rgba(31,126,252,.1) solid;
		cursor:pointer
	}

	.scope_result>div:nth-child(1) {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.scope_result.active,
	.scope_result:hover{
		border: 1px rgba(31,126,252,.8) solid;
		box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	}
	.scope_result>div:nth-child(1)>span {
		color: #409EFF;
		font-weight: bold;
	}

	.scope_result>div:not(.scope_result>div:nth-child(1)) {
		margin-left: 22px;
	}

	.scope_result img {
		width: 22px;
		height: 22px;
	}

	// 卫星图片
	.rightpanel_img_parent {
		width: 92%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 25px;
		margin-bottom: 25px;
	}

	.rightpanel_img_parent>div>img {
		width: 152px;
		height: 95px;
	}

	.rightpanel_img_parent>div {
		position: relative;
		cursor: pointer;
	}

	.rightpanel_img_parent>div>span {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		font-size: 13px;
		line-height: 30px;
		background: rgba(0, 0, 0, .5);
		padding: 0 10px
	}

	// 大图样式
	.overlay-boxs {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .9);
		z-index: 1003;
	}

	.overlay-boxs span.close {
		position: absolute;
		right: 20px;
		top: 20px;
		width: 30px;
		height: 40px;
		line-height: 40px;
	}

	.overlay-boxs span.close i.iconfont {
		font-size: 24px;
		color: #fff;
	}

	.overlay-boxs span.close:hover i.iconfont {
		color: #409EFF;
		cursor: pointer;
	}

	.overlay-head {
		float: left;
		width: 100%;
		height: 80px;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		padding: 0 20px;
		line-height: 80px;
	}

	.overlay-main {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 80px;
		overflow: hidden;
		text-align: center;
		z-index: 1003;
	}

	.fullImg {
		width: auto;
		height: 80%;
		display: inline-block;
	}
</style>
