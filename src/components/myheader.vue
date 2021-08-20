<template>
	<div class="header_div">
		<el-row class="header_parent" type="flex" justify="space-around">
			<!-- 时间 -->
			<el-col :span="2" class="time_parent">
				<span>{{time_second}}</span>
			</el-col>
			<!-- 左侧按钮 -->
			<el-col :span="2" v-for="post in left_button" class="button_left_parent">
				<div @click="header_button_click(post)" :class="{'active':post.is_active}">
					<div>
						<span :class="post.class"></span>
						<span>{{post.name}}</span>
					</div>
				</div>
			</el-col>
			
			<el-col :span="6" class="title_parent">
				<div>
					<span>森林消防一张图</span><br/>
					<span>ONEMAP OF FOREST FIRE FIGHTING</span>
				</div>
			</el-col>
			<!-- 右侧按钮 -->
			<el-col :span="2" v-for="post in right_button" class="button_right_parent">
				<div  @click="header_button_click(post)" :class="{'active':post.is_active}">
					<div>
						<span :class="post.class"></span>
						<span>{{post.name}}</span>
					</div>
				</div>
			</el-col>
			
			<el-col :span="2" class="date_parent">
				<div>
					<span>{{time_week}}</span><br>
					<span>{{time_day}}</span>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'myheader',
		data() {
			return {
				left_button:[
					{
						id:this.$UUID(),
						name:"遂行任务",
						is_active:true,
						class:"iconfont icon-huoqing"
					},
					{
						id:this.$UUID(),
						name:"卫星热点",
						is_active:false,
						class:"iconfont icon-ic_satellite_px"
					},
					{
						id:this.$UUID(),
						name:"气象信息",
						is_active:false,
						class:"iconfont icon-qixiang"
					},
				],
				right_button:[
					{
						id:this.$UUID(),
						name:"无人机",
						is_active:false,
						class:"iconfont icon-wurenjihangpaipaishe"
					},
					{
						id:this.$UUID(),
						name:"人员单位",
						is_active:false,
						class:"iconfont icon-renyuan1"
					},
					{
						id:this.$UUID(),
						name:"统计分析",
						is_active:false,
						class:"iconfont icon-tongxun"
					},
				],
				time_second:"",
				time_day:"",
				time_week:"",
			}
		},
		mounted: function() {
			this.get_fire();
			this.init_time();
		},
		methods: {
			//更新时间
			init_time(){
				var $this = this;
				setInterval(function(){
					$this.time_second=$this.moment(new Date()).format("HH:mm:ss");
				},1000)
				//获取当前日期
				$this.time_day=$this.moment(new Date()).format("YYYY/MM/DD");
				//获取当前日期 是一周中的第几天
				var week_of_day = $this.moment(new Date()).format('E');
				var week_day = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				$this.time_week =  week_day[week_of_day];
			},
			header_button_click(post) {
				var $this=this;
				var config = this.$store.state.left_panel_config;
				//设置按钮选中状态
				for(let i =0;i<this.left_button.length;i++){
					if(post.name===this.left_button[i].name){
						if(this.left_button[i].is_active){
							return false;
						}else{
							this.left_button[i].is_active=true;
						}
					}else{
						this.left_button[i].is_active=false;
					}
				}
				for(let i =0;i<this.right_button.length;i++){
					if(post.name===this.right_button[i].name){
						if(this.right_button[i].is_active){
							return false;
						}else{
							this.right_button[i].is_active=true;
						}
					}else{
						this.right_button[i].is_active=false;
					}
				}
				// 显隐左侧控制面板
				for(let i =0;i<config.length;i++){
					if(post.name === config[i].type){
						config[i].is_show=true;
					}else{
						config[i].is_show=false;
					}
				}
				if(post.name==="遂行任务"){
					this.$store.state.left_panel_flag=false;
					this.$store.state.right_panel_flag=false;
					this.$store.state.task_config.task_button_flag=true;
					//清空其他功能marker
					this.clear_markers()
					//关闭统计分析系统页面
					this.$store.state.statisanalyze_flag=false;
					//清空人员轨迹
					this.myCommon.clear_track_marker_layer();
					//实时火场查询
					this.get_fire();
					
				}else if(post.name==="统计分析"){
					this.$store.state.left_panel_flag=false;
					this.$store.state.right_panel_flag=false;
					this.$store.state.task_config.task_button_flag=false;
					this.$store.state.task_config.task_progress_flag=false;
					//清空其他功能marker
					this.clear_markers();
					//清空火场动态元素
					this.myCommon.clear_state_markers_layers();
					//清除火场
					this.clear_fire();
					//清空人员轨迹
					this.myCommon.clear_track_marker_layer();
					//清空火场范围查询结果
					this.myCommon.clear_fire_marker_layer();
					//打开统计分析系统页面
					this.$store.state.statisanalyze_flag=true;
				}else{
					this.$store.state.left_panel_flag=true;
					this.$store.state.right_panel_flag=false;
					this.$store.state.task_config.task_button_flag=false;
					this.$store.state.task_config.task_progress_flag=false;
					//清空其他功能marker
					this.clear_markers();
					//清空火场动态元素
					this.myCommon.clear_state_markers_layers();
					//清除火场
					this.clear_fire();
					//清空人员轨迹
					this.myCommon.clear_track_marker_layer();
					//清空火场范围查询结果
					this.myCommon.clear_fire_marker_layer();
					//关闭统计分析系统页面
					this.$store.state.statisanalyze_flag=false;
					
				}
			},
			//清除火场
			clear_fire(){
				var task_config = this.$store.state.task_config;
				for(let i=0;i<task_config.markers.length;i++){
					task_config.markers[i].remove();
				}
				task_config.markers=[];
			},
			//清空其他功能marker
			clear_markers(){
				var config = this.$store.state.left_panel_config;
				var map = this.$store.state.map;
				// 设置子菜单选中或取消
				for(let i =0;i<config.length;i++){
					for(let j=0;j<config[i].child.length;j++){
						config[i].child[j].is_active=false;
						for(let x=0;x<config[i].child[j].child.length;x++){
							config[i].child[j].child[x].is_active=false;
							// 清除marker
							if(config[i].child[j].child[x].markers){
								for(let s=0;s<config[i].child[j].child[x].markers.length;s++){
									config[i].child[j].child[x].markers[s].remove();
								}
							}
							
							//移除气象Layer
							if (config[i].child[j].child[x].qxlayer&&config[i].child[j].child[x].qxlayer != "") {
								map.removeLayer(config[i].child[j].child[x].qxlayer);
								config[i].child[j].child[x].qxlayer = "";
								this.controlQXLegend(config[i].child[j].child[x].layerName, "");
							
								if (config[i].child[j].child[x].fclayer && config[i].child[j].child[x].fclayer != "") {
									map.removeLayer(config[i].child[j].child[x].fclayer);
									config[i].child[j].child[x].fclayer = "";
								}
							
								if(config[i].child[j].child[x].layerName == "P_CITY"){
									config[i].child[j].child[x].MapGrade = -1;
									//关闭zoomend事件
									map.off("zoomend");
								}
							}
							
						}
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
			// 火场查询及图层创建
			get_fire(){
				var $this = this;
				var info = this.$store.state.info;
				var task_config = this.$store.state.task_config;
				var out_in_host_url = this.$store.state.out_in_host_url;
				var params = {
					"lhappid": info.appid,
					"lhtime": new Date().getTime(),
					"lhsign": this.myCommon.sign({
						"lhappid": info.appid,
						"lhtime": new Date().getTime(),
						"lhsign": "",
						"projectid": "slfh",//系统id
						"adcd": info.groupid,//行政区划编码/单位id
						"tm": "",//查询时间，不传/传空查全部，否则查大于tm的数据
						"num": 0,//条目数，0返回全部
					}, info.appsecret),
					"projectid": "slfh",//系统id
					"adcd": info.groupid,//行政区划编码/单位id
					"tm": "",//查询时间，不传/传空查全部，否则查大于tm的数据
					"num": 0,//条目数，0返回全部
				}
				this.axios({
					method:"get",
					url:out_in_host_url+task_config.url,
					params:params,
				}).then(function(result){
					var datas = result.data.data;
					//过滤掉标志删除的火场和没有坐标的火场
					var temp_datas=[]
					for(let i=0;i<datas.length;i++){
						if(datas[i].delflag!==1&&datas[i].location !==""){
							temp_datas.push(datas[i]);
						}
					}
					for(let i=0;i<temp_datas.length;i++){
						var marker = $this.myCommon.create_marker([temp_datas[i].location.split(",")[1],temp_datas[i].location.split(",")[0]],task_config.icon_url,temp_datas[i],"遂行任务","fire");
						//获取右侧配置 并设置为marker属性
						marker.attribution = $this.get_right_config(temp_datas[i]);
						//火场点击事件
						marker.on("click",function(){
							//通过火场id 判断火场动态元素 是否已经展开
							if(task_config.fire_id!=""&&task_config.fire_id===this.attribution.id){
								//判断范围搜索结果是否存在 如果存在则打开右侧面板即可
								if(task_config.fire_scope_result_flag){
									//设置右侧面板配置 并打开
									$this.$store.state.right_panel_config=this.attribution;
									$this.$store.state.right_panel_flag=true;
									return false;
								}else{
									//关闭历史轨迹进度条
									task_config.task_progress_flag=false;
									//清空火场动态元素
									$this.myCommon.clear_state_markers_layers();
									//清空范围查询相关图层
									$this.myCommon.clear_fire_marker_layer();
									task_config.fire_id="";
									//还原进度条开关
									task_config.tab_switch=false;
									//关闭右侧面板
									$this.$store.state.right_panel_flag=false;
									return false;
								}
							}else{
								//设置当前选中火场id
								task_config.fire_id = this.attribution.id;
								//清空火场动态元素
								$this.myCommon.clear_state_markers_layers();
								//清空范围查询相关图层
								$this.myCommon.clear_fire_marker_layer();
								//打开历史轨迹进度条
								task_config.task_progress_flag=true;
								//还原进度条开关
								task_config.tab_switch=false;
								// 打开右侧面板
								$this.$store.state.right_panel_flag=true;
							}
							
							//设置右侧面板配置 并打开
							$this.$store.state.right_panel_config=this.attribution;
							$this.$store.state.right_panel_flag=true;
							
							//设置开始和结束时间
							task_config.start_time=this.attribution.attribution.时间.split(".")[0];
							task_config.end_time = $this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
							//设置mask_value
							var min_key = $this.moment(task_config.start_time).unix();
							task_config.tab_value = min_key;
							var max_key = $this.moment(task_config.end_time).unix();
							var temp_mask_value={};
							temp_mask_value[min_key]={
								style: {
									color: '#fff',
									pointerEvents: "none"
									
								},
								label: task_config.start_time
							}
							temp_mask_value[max_key]={
								style: {
									color: '#fff',
									pointerEvents: "none"
									
								},
								label: task_config.end_time
							}
							$this.$store.state.task_config.mask_value=temp_mask_value;
							
							$this.get_fire_state(this.attribution);
						})
					}
				})
			},
			//获取右侧面板配置
			get_right_config(data){
				var $this = this;
				var temp_config = JSON.parse(JSON.stringify($this.$store.state.task_config.right_config));
				temp_config.name = data.name;
				temp_config.id = data.id;
				for (let key in temp_config.attribution) {
					if(key==="经度"){
						temp_config.attribution[key] = data.location.split(",")[0];
					}else if(key==="纬度"){
						temp_config.attribution[key] = data.location.split(",")[1];
					}else{
						temp_config.attribution[key] = data[temp_config.attribution[key]];
					}
				}
				return temp_config;
			},
			//火场态势图数据查询
			get_fire_state(attribution){
				var $this = this;
				var task_config = this.$store.state.task_config;
				var out_in_host_url = this.$store.state.out_in_host_url;
				var map = this.$store.state.map;
				var info = this.$store.state.info;
				//加载态势图
				var params = {
					"lhappid": info.appid,
					"lhtime": new Date().getTime(),
					"lhsign": $this.myCommon.sign({
						"lhappid": info.appid,
						"lhtime": new Date().getTime(),
						"lhsign": "",
						"groundid": attribution.id,//火场id
						"stateid":"",//态势id，不传/传空查整个火场标绘元素
						"tm": "",//查询时间，不传/传空查全部，否则查大于tm的数据
					},info.appsecret),
					"groundid": attribution.id,//火场id
					"stateid":"",//态势id，不传/传空查整个火场标绘元素
					"tm":"",//查询时间，不传/传空查全部，否则查大于tm的数据
				}
				//加载态势图数据
				$this.axios({
					method:"get",
					url:out_in_host_url+task_config.fire_state_url,
					params:params,
				}).then(function(result){
					var datas = result.data.data;
					//过滤掉标志删除的火场和没有坐标的火场
					var temp_datas=[]
					for(let i=0;i<datas.length;i++){
						if(datas[i].delflag!==1&&datas[i].coordinates){
							temp_datas.push(datas[i]);
						}
					}
					for(let i=0;i<temp_datas.length;i++){
						var type = temp_datas[i].pmid.split("_")[0];
						var marker = $this.myCommon.create_marker([temp_datas[i].coordinates.split(",")[1],temp_datas[i].coordinates.split(",")[0]],temp_datas[i].iconhref,temp_datas[i],"遂行任务",type);
					}
				})
			},
			
		},
		
	}
</script>

<style lang="less">
.header_div{
	height:88px;
	width:100%;
	position:absolute;
	top:0;
	left:0;
	z-index:1002;
}
.header_parent{
	height:88px;
	width:100%;
	background: url("../assets/images/mask.png") center -3px no-repeat;
}

// 时间
.time_parent{
	font-family: 'DS-Digital';
	line-height: 88px;
	font-size: 42px;
	color: #409EFF;
	text-align: center;
}
// 日期
.date_parent{
	font-family: 'DS-Digital';
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items:center;
	color:#fff
}
.date_parent>span:nth-child(1){
	line-height: 15px;
	font-size:12px;
}
.date_parent>span:nth-child(2){
	line-height: 16px;
	font-size:16px;
}

// 导航左侧按钮
.button_left_parent{
	color: #fff;
	font-size: 17px;
	line-height: 34px;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
}
.button_left_parent>div{
	transform: skew(45deg);
	cursor: pointer;
	border: 1px rgba(31,126,252,.8) solid;
	padding: 0 18px;
	box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	text-align: center;
}
.button_left_parent>div>div{
	transform: skew(-45deg);
}
.button_left_parent>div.active,
.button_left_parent>div:hover{cursor:pointer;box-shadow:0 0 12px rgba(232,233,0,.5) inset;color:#e8e900;border-color:rgba(232,233,0,.5);}
// 导航右侧
.button_right_parent{
	color: #fff;
	font-size: 17px;
	line-height: 34px;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
}
.button_right_parent>div{
	transform: skew(-45deg);
	cursor: pointer;
	border: 1px rgba(31,126,252,.8) solid;
	padding: 0 18px;
	box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	text-align: center;
}
.button_right_parent>div>div{
	transform: skew(45deg);
}
.button_right_parent>div.active,
.button_right_parent>div:hover{cursor:pointer;box-shadow:0 0 12px rgba(232,233,0,.5) inset;color:#e8e900;border-color:rgba(232,233,0,.5);}



// 标题
.title_parent{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	color:#fff;
	text-align:center;
	margin-bottom: 12px;
}
.title_parent>div>span:nth-child(1){
	font-size: 28px;
	font-weight: bold;
	font-family: 微软雅黑;
	letter-spacing: 1px;
	background-image: -webkit-linear-gradient(top, rgb(255, 255, 255), rgb(31, 126, 252));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.title_parent>div>span:nth-child(3){
	font-family: 'PingFang';
	font-size: 13px;
	font-weight: bold;
	letter-spacing: 1px;
}


</style>
