<template>
	<transition name="left-panel">
		<div class="leftpanel_div" v-if="get_left_panel_flag">
			<template v-for="post in get_left_config">
				<div v-if="post.is_show" class="first_parent">
					<template v-for="p in post.child">
						<div :class="{'first_dir':true,'active':p.is_active}" @click="first_click(p)">
							<span :class="p.class"></span>
							<span>{{p.name}}</span>
						</div>
						<div class="child_parent" v-if="p.is_active">
							<template v-for="temp in p.child">
								<div :class="{'child_dir':true,'active':temp.is_active}" @click="child_click(temp)">
									<span>{{temp.name}}</span>
								</div>
							</template>
						</div>
					</template>
				</div>
			</template>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'leftpanel',
		data() {
			return {

			}
		},
		computed: {
			get_left_config: function() {
				return this.$store.state.left_panel_config;
			},
			get_left_panel_flag: function() {
				return this.$store.state.left_panel_flag;
			}
		},
		methods: {
			first_click(post) {
				var config = this.$store.state.left_panel_config;
				// 显隐菜单
				for (let i = 0; i < config.length; i++) {
					for (let j = 0; j < config[i].child.length; j++) {
						if (post.name == config[i].child[j].name) {
							config[i].child[j].is_active = true;
						} else {
							config[i].child[j].is_active = false;
						}
					}
				}
			},
			child_click(post) {
				var $this = this;
				var host_url = this.$store.state.host_url;
				var config = this.$store.state.left_panel_config;
				var map = this.$store.state.map;
				var type = post.type;
				// 设置子菜单选中或取消
				for (let i = 0; i < config.length; i++) {
					for (let j = 0; j < config[i].child.length; j++) {
						if (type === config[i].child[j].name) {
							for (let x = 0; x < config[i].child[j].child.length; x++) {
								if (post.name == config[i].child[j].child[x].name) {
									if (config[i].child[j].child[x].is_active) {
										config[i].child[j].child[x].is_active = false;

										// 清除marker
										if (config[i].child[j].child[x].markers) {
											for (let s = 0; s < config[i].child[j].child[x].markers.length; s++) {
												config[i].child[j].child[x].markers[s].remove();
											}
											config[i].child[j].child[x].markers = [];
										}
										//通过在线人员类型 判断是否清除 人员轨迹
										if($this.$store.state.task_config.person_type==post.name){
											$this.myCommon.clear_track_marker_layer();
										}
										
										//移除气象Layer
										if (post.qxlayer&&post.qxlayer != "") {
											map.removeLayer(post.qxlayer);
											post.qxlayer = "";
											this.controlQXLegend(post.layerName, "");
										
											if (post.fclayer && post.fclayer != "") {
												map.removeLayer(post.fclayer);
												post.fclayer = "";
											}
										
											if(post.layerName == "P_CITY"){
												post.MapGrade = -1;
												//关闭zoomend事件
												map.off("zoomend");
											}
										}
										//关闭右侧面板
										$this.$store.state.right_panel_flag = false;
										return false;
									} else {
										config[i].child[j].child[x].is_active = true;
									}
								}
							}
						}

					}
				}
				if (type === "人员通信装备信息") {
					var data = [
						{
							"经度": 117.66,
							"纬度": 40.11,
							"通信消防员": 2,
							"通信干部": 2,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 3,
							"北斗卫星设备": 3,
							"无人机": 3,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队"
						},
						{
							"经度": 117.66,
							"纬度": 40.11,
							"通信消防员": 12,
							"通信干部": 2,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 3,
							"北斗卫星设备": 3,
							"无人机": 3,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队"
						},
						{
							"经度": 117.84,
							"纬度": 39.33,
							"通信消防员": 4,
							"通信干部": 1,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 4,
							"北斗卫星设备": 6,
							"无人机":7,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队"
						},
						{
							"经度": 117.84,
							"纬度": 39.33,
							"通信消防员": 1,
							"通信干部": 1,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 4,
							"北斗卫星设备": 6,
							"无人机":7,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队"
						},
					]
					var temp_datas = $this.get_temp_data(data);
					//根据数据创建marker
					for (let i = 0; i < temp_datas.length; i++) {
						var temp_config = $this.get_right_config(temp_datas[i], type,post.name);
						$this.myCommon.create_marker([temp_datas[i][0].纬度, temp_datas[i][0].经度], post.icon_url,
							temp_config,"人员通信装备信息","");
					}
					// this.axios({
					// 	method: "post",
					// 	url: post.url,
					// 	data: post.data,
					// }).then(function(result) {
					// 	var temp_datas = $this.get_temp_data(result.data.data);
					// 	//根据数据创建marker
					// 	for (let i = 0; i < temp_datas.length; i++) {
					// 		var temp_config = $this.get_right_config(temp_datas[i], type,post.name);
					// 		$this.myCommon.create_marker([temp_datas[i][0].纬度, temp_datas[i][0].经度], post.icon_url,
					// 			temp_config,"人员通信装备信息","");
					// 	}
					// })

				} else if (type === "单位驻地信息") {
					var data = [
						{
							"经度": 117.66,
							"纬度": 40.11,
							"通信消防员": 2,
							"通信干部": 2,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 3,
							"北斗卫星设备": 3,
							"无人机": 3,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队",
							"地址": "新疆省某区",
						},
						{
							"经度": 117.66,
							"纬度": 40.11,
							"通信消防员": 12,
							"通信干部": 2,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 3,
							"北斗卫星设备": 3,
							"无人机": 3,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队",
							"地址": "新疆省某区",
						},
						{
							"经度": 117.84,
							"纬度": 39.33,
							"通信消防员": 4,
							"通信干部": 1,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 4,
							"北斗卫星设备": 6,
							"无人机":7,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队",
							"地址": "新疆省某区",
						},
						{
							"经度": 117.84,
							"纬度": 39.33,
							"通信消防员": 1,
							"通信干部": 1,
							"卫星便携站": 2,
							"超短波设备": 2,
							"短波设备": 3,
							"卫星电话": 4,
							"北斗卫星设备": 6,
							"无人机":7,
							"总队":"某总队",
							"支队":"某支队",
							"大队":"某大队",
							"地址": "新疆省某区",
						},
					]
					var temp_datas = $this.get_temp_data(data);
					//根据数据创建marker
					for (let i = 0; i < temp_datas.length; i++) {
						var temp_config = $this.get_right_config(temp_datas[i], type,post.name);
						$this.myCommon.create_marker([temp_datas[i][0].纬度, temp_datas[i][0].经度], post.icon_url,
							temp_config, "单位驻地信息","");
					}
					// this.axios({
					// 	method: "post",
					// 	url: post.url,
					// 	data: post.data,
					// }).then(function(result) {
					// 	var temp_datas = $this.get_temp_data(result.data.data);
					// 	//根据数据创建marker
					// 	for (let i = 0; i < temp_datas.length; i++) {
					// 		var temp_config = $this.get_right_config(temp_datas[i], type,post.name);
					// 		$this.myCommon.create_marker([temp_datas[i][0].纬度, temp_datas[i][0].经度], post.icon_url,
					// 			temp_config, "单位驻地信息","");
					// 	}
					// })
				} else if (type === "在线人员位置") {
					var data = {
						"lhappid": "5e5c673ee4b07d0df76eae6e",
						"lhtime": new Date().getTime(),
						"lhsign": this.myCommon.sign({
							"lhappid": "5e5c673ee4b07d0df76eae6e",
							"lhtime": new Date().getTime(),
							"lhsign": "",
							"projectid": "slfh", //系统id
							"adcd": "37054", //行政区划编码/单位id
							"gpstype": 0, //设备类型，0手机，1电脑，2网络,默认0
							"next": 2 //是否包含下级，0：查本级，1：本级+下一级，2：本级+所有下级，默认2
						}, "8c2944019ce74b4018dd0190e228113a45cbc19b"),
						"projectid": "slfh", //系统id
						"adcd": "37054", //行政区划编码/单位id
						"gpstype": 0, //设备类型，0手机，1电脑，2网络,默认0
						"next": 2 //是否包含下级，0：查本级，1：本级+下一级，2：本级+所有下级，默认2
					};
					//调用服务
					this.axios({
						method: "get",
						url: post.url,
						params: data,
					}).then(function(result) {
						var datas = result.data.data;
						var temp_datas = []
						for (let i = 0; i < datas.length; i++) {
							if (post.data_type === datas[i].sblx && datas[i].latitude != 0 && datas[i].longitude !=
								0&&datas[i].onlineflag==1) {
								temp_datas.push(datas[i]);
							}
						}
						for (let i = 0; i < temp_datas.length; i++) {
							var temp_config = $this.get_right_config(temp_datas[i], type,post.name);
							$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
								post.icon_url, temp_config, "在线人员位置","");
						}
					})
				} else if (type === "无人机轨迹") {
					var datas=[
						{
							longtitude: "104.0719267",
							latitude: "30.59067777",
							height: "100米",
							createDate: "2021-5-21",
						},
						{
							longtitude: "126.67778",
							latitude: "45.74472",
							height: "200米",
							createDate: "2021-9-27",
						},
					]
					for (let i = 0; i < datas.length; i++) {
						var temp_config = $this.get_right_config(datas[i], type,post.name);
						$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
							post.icon_url, temp_config, "无人机轨迹","");
					}
					// this.axios({
					// 	method: "get",
					// 	url: post.url,
					// }).then(function(result) {
					// 	var datas = result.data.data;
					// 	for (let i = 0; i < datas.length; i++) {
					// 		var temp_config = $this.get_right_config(datas[i], type,post.name);
					// 		$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
					// 			post.icon_url, temp_config, "无人机轨迹","");
					// 	}
					// })
				} else if (type === "无人机火场态势") {
					var data = {
						longtitude:"116.72",
						latitude:"39.62",
						fireClass:"3",
						fireScope:"大",
						fireInfo:"危急",
						fireStart:"2021/9/27",
						fireEnd:"2021/9/28",
					}
					var temp_config = $this.get_right_config(data, type,post.name);
					$this.myCommon.create_marker([temp_config.attribution.边际点纬度, temp_config.attribution
						.边际点经度
					], post.icon_url, temp_config, "无人机火场态势","");
					// this.axios({
					// 	method: "get",
					// 	url: post.url,
					// }).then(function(result) {
					// 	var datas = result.data.data;
					// 	for (let i = 0; i < datas.length; i++) {
					// 		var temp_config = $this.get_right_config(datas[i], type,post.name);
					// 		$this.myCommon.create_marker([temp_config.attribution.边际点纬度, temp_config.attribution
					// 			.边际点经度
					// 		], post.icon_url, temp_config, "无人机火场态势","");
					// 	}
					// })

				} else if (type === "卫星热点") {
					let newDate = new Date();
					let end_time = $this.moment(newDate).format("YYYY-MM-DD");
					newDate.setDate(newDate.getDate() - 2);
					let start_time = $this.moment(newDate).format("YYYY-MM-DD");
					var data = {
						"lhappid": "5e5c673ee4b07d0df76eae6e",
						"lhtime": new Date().getTime(),
						"lhsign": this.myCommon.sign({
							"lhappid": "5e5c673ee4b07d0df76eae6e",
							"lhtime": new Date().getTime(),
							"lhsign": "",
							"projectid": "slfh", //系统id
							"adcd": "000000000000000", //行政区划编码/单位id
							"starttm": start_time, //开始时间
							"endtm": end_time, //结束时间
							"sourceType": 1, //来源类型，0(默认)查全部，1只查卫星热点，2人工上报
						}, "8c2944019ce74b4018dd0190e228113a45cbc19b"),
						"projectid": "slfh", //系统id
						"adcd": "000000000000000", //区域编码（当前登录区域的adcd）
						"starttm": start_time, //开始时间
						"endtm": end_time, //结束时间
						"sourceType": 1, //来源类型，0(默认)查全部，1只查卫星热点，2人工上报
					};
					//调用服务
					this.axios({
						method: "get",
						url: post.url,
						params: data
					}).then(function(result) {
						var datas = result.data.data;
						for (let i = 0; i < datas.length; i++) {
							var temp_config = $this.get_right_config(datas[i], type,post.name);
							var icon_url = "";
							if (datas[i].fkqk == "核查中" || datas[i].fkqk == "未反馈" || datas[i].fkqk == "") {
								icon_url = post.icon_url_check;
							} else if (datas[i].fkqk == "林火" || datas[i].fkqk == "草原火" || datas[i].fkqk == "树冠火") {
								icon_url = post.icon_url_gif;
							} else {
								icon_url = post.icon_url_default;
							}
							$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
								icon_url, temp_config,"卫星热点","");
						}
					});
				} else if (type === "卫星遥感") {
					var datas =[
						{
							"longitude":115.38,
							"latitude":39.57,
							"observationDatetime":"2021/9/27",
							"strength":1,
							"strengthLevel":2,
							"woodland":"1%",
							"grassland":"2%",
							"farmland":"3%",
							"otherland":"4%",
							"area":100,
							"credibility":1,
							"pixelarea":10,
							"pixelNumber":1,
							"formattedAddress":"某街道",
							"rireno":"112233",
							"visibleLightImageAddress":null,
							"irimageAddress":null,
						},
						{
							"longitude":117.66,
							"latitude":40.11,
							"observationDatetime":"2021/9/27",
							"strength":1,
							"strengthLevel":2,
							"woodland":"1%",
							"grassland":"2%",
							"farmland":"3%",
							"otherland":"4%",
							"area":100,
							"credibility":1,
							"pixelarea":10,
							"pixelNumber":1,
							"formattedAddress":"某街道",
							"rireno":"112233",
							"visibleLightImageAddress":null,
							"irimageAddress":null,
						},
					]
					for (let i = 0; i < datas.length; i++) {
						var temp_config = $this.get_right_config(datas[i], type,post.name);
						$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
							post.icon_url, temp_config,"卫星遥感","");
					}
					// this.axios({
					// 	method: "get",
					// 	url: post.url,
					// }).then(function(result) {
					// 	var datas = result.data.data;
					// 	for (let i = 0; i < datas.length; i++) {
					// 		var temp_config = $this.get_right_config(datas[i], type,post.name);
					// 		$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
					// 			post.icon_url, temp_config,"卫星遥感","");
					// 	}
					// });

				} else if(type==="全球植物可燃物分布"){
					post.qxlayer = L.tileLayer.wms(this.$store.state.AIWEISI_QIXIANG_URL+post.url, {
						layers: 'fuel',
						format: 'image/png',
						transparent: true
					});
					
					map.addLayer(post.qxlayer);
				}else if (type === "全球气象灾害预警") {
					
					let rem = 1
					
					let IconName =  {
						暴雪 : '11B04',
						暴雨 : '11B03',
						冰雹 : '11B15',
						大风 : '11B06',
						大雾 : '11B17',
						道路结冰 : '11B21',
						干旱 : '11B22',
						高温 : '11B09',
						寒潮 : '11B05',
						空气重污染 : '12Q02',
						雷电 : '11B14',
						霾 : '11B19',
						沙尘暴 : '11B07',
						霜冻 : '11B16',
						台风 : '11B01',
						未知 : '12B01'
					}
					
					let IconColor = {
						蓝色 : 'blue',
						橙色 : 'orange',
						红色 : 'red',
						黄色 : 'yellow',
						未知 : 'unknow',
					}
					
					let IconColorHEX = {
						蓝色 : 'blue',
						橙色 : 'orange',
						红色 : 'red',
						黄色 : '#cfc728',
						未知 : '#000000',
					}
					
					
					post.qxlayer = L.featureGroup();
					map.addLayer(post.qxlayer);
					
					this.axios({
						method: "post",
						url: this.$store.state.host_url + post.url
					}).then(function(res) {
						if (res.data.code == 0) {
							res.data.data.forEach((_info, idx) => {
								if(idx > 100) return;
								var marker, icon_url, iconSize = [25 * rem, 25 * rem],
									iconAnchor = [12.5 * rem, 12.5 * rem];
								var warn_type = _info.t_type_disaster;
								var warn_type_arr = warn_type.split('-');
								if (warn_type_arr[0] != "null") {
									var _name = IconName[warn_type_arr[0]] + '_' + IconColor[warn_type_arr[
										1]] + '.png';
									var _title = _info.t_type_disaster + '预警';
									icon_url = "images/weatherIcons" + "/" + _name;
									var popup = '<div class="leaflet-warninginfo-content">';
									popup += '<b style="color: ' + IconColorHEX[warn_type_arr[1]] +
										';font-size: 15px;">' + _title + '</b>' + '<br/>';
									popup += '<b>站点名称:</b>' + _info.t_site_name + '<br/>';
					
									function mydatefmt(time) {
										var yyyy = time.slice(0, 4);
										var MM = time.slice(4, 6);
										var DD = time.slice(6, 8);
										var HH = time.slice(8, 10);
										var mm = time.slice(10, 12);
										return yyyy + "年" + MM + "月" + DD + "日" + HH + "时" + mm + "分";
									}
									popup += '<b>发布时间:</b>' + mydatefmt(_info.t_release_time) + '<br/>';
									popup += '<p id="warning_content_' + _info.t_id + '"></p>';
									popup += '</div>';
									var warnIcon = L.icon({
										iconUrl: icon_url,
										iconSize: iconSize,
										iconAnchor: iconAnchor,
									});
									marker = L.marker([_info.t_latitude, _info.t_longitude], {
										icon: warnIcon,
										title: _title
									});
									marker.bindPopup(popup).on('click', function() {
										SuperSceneQuery.getEarlyWarningDisasterContent(_info.t_id)
											.then(res => {
												$('#warning_content_' + _info.t_id).html(res);
											});
									});
									post.qxlayer.addLayer(marker);
								}
							});
						} else {
							console.log("获取全球气象灾害预警失败！");
						}
					});
				} else if (type === "气象预报信息") {
					debugger;
					
					if (post.uri) {
						let newDate = "";
						this.axios.get(this.$store.state.AIWEISI_QIXIANG_URL + post.uri).then(res => {
					
							debugger;
							let data = res.data;
							if (data.length > 0) {
								var temp = new Date();
								temp.setMinutes(0);
								var d = temp.toISOString().replace(/([^:]+)$/, '').replace(/-/g, '').replace(/T/g,
									'').replace(/:/g, '');
								if (data.indexOf(d) > -1) {
									newDate = data[data.indexOf(d)];
								} else {
									for (let index = 0; index < data.length; index++) {
										const element = data[index];
										if (element > d) {
											newDate = data[index == 0 ? index : index - 1];
										}
									}
									if ($("#map").css('display') != 'none') {
										this.$message({
											message: "暂无数据",
											type: "warning",
										});
									}
									newDate = "";
								}
							} else {
								if ($("#map").css('display') != 'none') {
									this.$message({
										message: "暂无数据",
										type: "warning",
									});
								}
								newDate = "";
							}
					
							console.log(newDate);
							let date = newDate.substr(0, 4) + '-' + newDate.substr(4, 2) + '-' + newDate.substr(6,
								2) + 'T' + newDate.substr(8, 2) + ':' + newDate.substr(10, 2) + 'Z';
							debugger;
					
					
							post.qxlayer = L.tileLayer.wms(this.$store.state.AIWEISI_SLWMS_URL, {
								layers: post.layerName,
								zIndex: 100,
								format: 'image/png',
								transparent: true,
								time: date,
							})
					
							map.addLayer(post.qxlayer);
							this.controlQXLegend(post.layerName, date);
					
							if (post.fcuri) {
								this.axios.get(this.$store.state.AIWEISI_QIXIANG_URL + post.fcuri + newDate).then(
									rst => {
										var data = rst.data;
										if (data == "暂无数据！") {
											return;
										}
										var nx = Math.abs(data.rect[0] - data.rect[2]) / data.precision[0] + 1;
										var ny = Math.abs(data.rect[1] - data.rect[3]) / data.precision[1] + 1;
										var u = {
											"header": {
												"parameterUnit": "m.s-1",
												"parameterNumber": 2,
												"dx": data.precision[0],
												"dy": data.precision[1],
												"parameterNumberName": "eastward_wind",
												"lo1": data.rect[0], // 经度
												"la1": data.rect[1], // 纬度
												"lo2": data.rect[2],
												"la2": data.rect[3],
												"parameterCategory": 2,
												"nx": nx,
												"ny": ny,
												"refTime": "2017-02-01 23:00:00",
											},
											"data": []
										}
										var v = {
											"header": {
												"parameterUnit": "m.s-1",
												"parameterNumber": 3,
												"dx": data.precision[0],
												"dy": data.precision[1],
												"parameterNumberName": "eastward_wind",
												"lo1": data.rect[0], // 经度
												"la1": data.rect[1], // 纬度
												"lo2": data.rect[2],
												"la2": data.rect[3],
												"parameterCategory": 2,
												"nx": nx,
												"ny": ny,
												"refTime": "2017-02-01 23:00:00",
											},
											"data": []
										}
										for (var i = 0; i < data.speed.length; i++) {
											var speed = data.speed[i];
											var direction = data.direction[i];
											if (direction > 360) {
												direction -= 360;
											}
											var dir = (270.0 - direction) * Math.PI / 180.0;
											u.data.push(speed * Math.cos(dir));
											v.data.push(speed * Math.sin(dir));
										}
										debugger;
										post.fclayer = L.velocityLayer({
											displayValues: true,
											displayOptions: {
												velocityType: "Wind",
												displayPosition: "topleft",
												displayEmptyString: "No wind data"
											},
											data: [v, u],
											minVelocity: 0, // 粒子最小速度（ m/s ）
											maxVelocity: 20, // 粒子最大速度（ m/s ）
											// velocityScale: 0.05,  // 风速的比例 ( 粒子的小尾巴长度 )
											// // particleAge: 90,  // 粒子在再生之前绘制的最大帧数
											// lineWidth: 1,  // 绘制粒子的线宽
											// particleMultiplier: 1 / 30,  // 粒子计数标量（ 粒子密度 ）
											// frameRate: 10,  // 每秒所需的帧数
										});
										map.addLayer(post.fclayer);
									})
							}
					
						});
					
					
					
					} else {
						if (post.layerName == "P_CITY") {
							this.weather(1, post, map);
							map.on("zoomend", e => {
								//获取当前放大或者缩小的等级
								let grade = e.target.getZoom();
								if (grade > 1 && grade < 6) {
									this.weather(1, post, map);
								} else if (grade > 6 && grade < 12) {
									this.weather(2, post, map);
								} else if (grade > 12 && grade < 18) {
									this.weather(3, post, map);
								}
							})
						}
					}
				} else if (type === "气象实况信息") {
					if (post.uri) {
						this.axios.get(this.$store.state.AIWEISI_QIXIANG_URL + post.uri).then(res => {
							let newDate = "";
							debugger;
							let data = res.data;
							if (data.length > 0) {
								var temp = new Date();
								temp.setMinutes(0);
								var d = temp.toISOString().replace(/([^:]+)$/, '').replace(/-/g, '').replace(/T/g,
									'').replace(/:/g, '');
								if (data.indexOf(d) > -1) {
									newDate = data[data.indexOf(d)];
								} else {
									for (let index = 0; index < data.length; index++) {
										const element = data[index];
										if (element > d) {
											newDate = data[index == 0 ? index : index - 1];
										}
									}
									if (newDate == "")
										newDate = data[data.length - 1];
								}
							} else {
								if ($("#map").css('display') != 'none') {
									this.$message({
										message: "暂无数据",
										type: "warning",
									});
								}
								newDate = "";
							}
				
							console.log(newDate);
							let date = newDate.substr(0, 4) + '-' + newDate.substr(4, 2) + '-' + newDate.substr(6,
								2) + 'T' + newDate.substr(8, 2) + ':' + newDate.substr(10, 2) + 'Z';
							debugger;
				
				
							post.qxlayer = L.tileLayer.wms(this.$store.state.AIWEISI_SLWMS_URL, {
								layers: post.layerName,
								zIndex: 100,
								format: 'image/png',
								transparent: true,
								time: date,
							})
				
							map.addLayer(post.qxlayer);
							this.controlQXLegend(post.layerName, date);
				
							if (post.fcuri) {
								this.axios.get(this.$store.state.AIWEISI_QIXIANG_URL + post.fcuri + newDate).then(
									rst => {
										var data = rst.data;
										if (data == "暂无数据！") {
											return;
										}
										var nx = Math.abs(data.rect[0] - data.rect[2]) / data.precision[0] + 1;
										var ny = Math.abs(data.rect[1] - data.rect[3]) / data.precision[1] + 1;
										var u = {
											"header": {
												"parameterUnit": "m.s-1",
												"parameterNumber": 2,
												"dx": data.precision[0],
												"dy": data.precision[1],
												"parameterNumberName": "eastward_wind",
												"lo1": data.rect[0], // 经度
												"la1": data.rect[1], // 纬度
												"lo2": data.rect[2],
												"la2": data.rect[3],
												"parameterCategory": 2,
												"nx": nx,
												"ny": ny,
												"refTime": "2017-02-01 23:00:00",
											},
											"data": []
										}
										var v = {
											"header": {
												"parameterUnit": "m.s-1",
												"parameterNumber": 3,
												"dx": data.precision[0],
												"dy": data.precision[1],
												"parameterNumberName": "eastward_wind",
												"lo1": data.rect[0], // 经度
												"la1": data.rect[1], // 纬度
												"lo2": data.rect[2],
												"la2": data.rect[3],
												"parameterCategory": 2,
												"nx": nx,
												"ny": ny,
												"refTime": "2017-02-01 23:00:00",
											},
											"data": []
										}
										for (var i = 0; i < data.speed.length; i++) {
											var speed = data.speed[i];
											var direction = data.direction[i];
											if (direction > 360) {
												direction -= 360;
											}
											var dir = (270.0 - direction) * Math.PI / 180.0;
											u.data.push(speed * Math.cos(dir));
											v.data.push(speed * Math.sin(dir));
										}
										debugger;
										post.fclayer = L.velocityLayer({
											displayValues: true,
											displayOptions: {
												velocityType: "Wind",
												displayPosition: "topleft",
												displayEmptyString: "No wind data"
											},
											data: [v, u],
											minVelocity: 0, // 粒子最小速度（ m/s ）
											maxVelocity: 20, // 粒子最大速度（ m/s ）
											// velocityScale: 0.05,  // 风速的比例 ( 粒子的小尾巴长度 )
											// // particleAge: 90,  // 粒子在再生之前绘制的最大帧数
											// lineWidth: 1,  // 绘制粒子的线宽
											// particleMultiplier: 1 / 30,  // 粒子计数标量（ 粒子密度 ）
											// frameRate: 10,  // 每秒所需的帧数
										});
										map.addLayer(post.fclayer);
									})
							}
				
						});
					}
				}

			},
			controlQXLegend(layername, date) {
				for (let index = 0; index < this.$store.state.qxlegendParams.length; index++) {
					const element = this.$store.state.qxlegendParams[index];
					if (element.layerName == layername) {
						//如果已经存在既移除图例
						for (let index = 0; index < this.$store.state.qxlegends.length; index++) {
							const element1 = this.$store.state.qxlegends[index];
							if (element1.layerName == layername) {
								this.$store.state.qxlegends.splice(index, 1);
								return;
							}
						}
						element.isShowView = true;
						element.legendTime = date;
						this.$store.state.qxlegends.push(element);
					}
				}
			},
			weather(grade, post, map) {
			
				if (grade == post.MapGrade) {
					return;
				}
				post.MapGrade = grade;
				if (post.qxlayer != '') {
					map.removeLayer(post.qxlayer);
				}
				post.qxlayer = L.featureGroup();
				map.addLayer(post.qxlayer);
				this.axios({
					method: "get",
					url: this.$store.state.host_url + post.url + "?grade=" + grade
				}).then(e => {
					let res = e.data;
					if (res.code == 0) {
						let markerArr = new Array();
						res.data.forEach((it) => {
							let point = [it.Y, it.X];
							let icon = L.icon({
								iconUrl: it.IMG_URL
							});
							let marker = L.marker(point, {
								icon: icon,
								params: {
									name: it.NAME,
									district: it.DISTRICT,
									province: it.PROVINCE
								}
							});
							//marker.on("click", this.clickWeatherEvent);
							markerArr.push(marker);
						});
						let markers = L.layerGroup(markerArr);
						post.qxlayer.addLayer(markers);
					}
				});
			},
			// 人员单位相关接口返回数据 解析
			get_temp_data(data) {
				var temp_datas = [];
				var temp_data = [];
				for (let i = 0; i < data.length; i++) {
					temp_data.push(data[i]);
					if (temp_data.length == 2) {
						temp_datas.push(temp_data);
						temp_data = [];
					}
				}
				return temp_datas;
			},
			is_null(str) {
				if (str != null && str != undefined) {
					return str;
				} else {
					return '';
				}
			},
			get_right_config(data, type,child_name) {
				var $this = this;
				var temp_config = {};
				var left_configs = $this.$store.state.left_panel_config;
				for (let i = 0; i < left_configs.length; i++) {
					for (let j = 0; j < left_configs[i].child.length; j++) {
						if (type === left_configs[i].child[j].name) {
							temp_config = JSON.parse(JSON.stringify(left_configs[i].child[j].right_config));
						}
					}
				}
				temp_config.child_name=child_name;
				if (type === "人员通信装备信息") {
					temp_config.name = $this.is_null(data[0].总队) + $this.is_null(data[0].支队) + $this.is_null(data[0].大中队)
					for (let key in temp_config.attribution_danwei_xiashu) {
						temp_config.attribution_danwei_xiashu[key] = data[0][key];
					}
					for (let key in temp_config.attribution_danwei) {
						temp_config.attribution_danwei[key] = data[1][key];
					}
				} else if (type === "单位驻地信息") {
					temp_config.name = $this.is_null(data[0].总队) + $this.is_null(data[0].支队) + $this.is_null(data[0].大中队)
					for (let key in temp_config.attribution) {
						temp_config.attribution[key] = data[0][key];
					}
				} else if (type === "在线人员位置") {
					temp_config.name = data.owner;
					temp_config.gpsid=data.gpsid;
					for (let key in temp_config.attribution) {
						if (key === "电量") {
							temp_config.attribution[key] = (Number(data[temp_config.attribution[key]]) > 0 ? data[
								temp_config.attribution[key]] + '%' : '');
						} else {
							temp_config.attribution[key] = data[temp_config.attribution[key]];
						}
					}
				} else if (type === "无人机轨迹") {
					temp_config.name = data.longtitude+","+data.latitude;
					temp_config.gpsid=data.gpsid;
					for (let key in temp_config.attribution) {
						temp_config.attribution[key] = data[temp_config.attribution[key]];
					}
				} else if (type === "无人机火场态势") {
					temp_config.name = data.longtitude+","+data.latitude;
					for (let key in temp_config.attribution) {
						temp_config.attribution[key] = data[temp_config.attribution[key]];
					}
				} else if (type === "卫星热点") {
					temp_config.name = data.fkqk;
					for (let key in temp_config.attribution) {
						temp_config.attribution[key] = data[temp_config.attribution[key]];
					}
				} else if (type === "卫星遥感") {
					temp_config.name = data.formattedAddress;
					for (let key in temp_config.attribution) {
						temp_config.attribution[key] = data[temp_config.attribution[key]];
					}
					for (let key in temp_config.attribution_img) {
						debugger
						if (data[temp_config.attribution_img[key]] == null && key == "可见光图片地址") {
							temp_config.attribution_img[key] = require("../assets/images/satellite/kjg.jpg");
						} else if (data[temp_config.attribution_img[key]] == null && key == "热成像图片地址") {
							temp_config.attribution_img[key] = require("../assets/images/satellite/rcx.jpg");
						} else {
							temp_config.attribution_img[key] = data[temp_config.attribution_img[key]];
						}
					}
				}
				return temp_config;
			},

		},
	}
</script>

<style lang="less">
	.leftpanel_div {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 220px;
		height: 100%;
		z-index: 1002;
		background: url(../assets/images/leftbar.png) right center no-repeat;
		color: #fff;
	}


	.first_parent {
		width: 100%;
		height: 100%;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.first_dir {
		background: url(../assets/images/indexs_head.png) right bottom no-repeat;
		letter-spacing: 1px;
		cursor: pointer;
		line-height: 46px;
		margin-bottom: 5px;
		padding-left: 15px;
	}

	.first_dir.active,
	.first_dir:hover {
		color: #e8e900;
		background: url(../assets/images/indexs_head2.png) right bottom no-repeat
	}

	.first_dir>span:nth-child(1) {
		font-weight: normal;
		font-size: 21px;
		margin-right: 5px;
		position: relative;
		top: 1px;
	}

	.first_dir>span:nth-child(2) {
		font-weight: bold;
		font-size: 16px;

	}

	.child_parent {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		overflow: auto;
	}

	.child_dir {
		width: 80%;
		margin-top: 15px;
		text-align: center;
		cursor: pointer;
		line-height: 30px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
		box-shadow: 0 0 1px rgb(255, 255, 255, 1) inset;
	}

	.child_dir:last-child {
		margin-bottom: 15px;
	}

	.child_dir>span {
		width: 100%;
		font-size: 15px;
		font-weight: bold;
		color: #fff;
	}

	.child_dir.active,
	.child_dir:hover {
		color: #e8e900;
		background: url(../assets/images/indexs_head2.png) center bottom no-repeat
	}

	// 面板进入动画
	.left-panel-enter-active {
		transition: all 0.5s ease;
	}

	// 面板离开动画
	.left-panel-leave-active {
		transition: all 0.5s ease;
	}

	.left-panel-enter,
	.left-panel-leave-to {
		transform: translateX(-220px);
		// opacity: 0;
	}
</style>
