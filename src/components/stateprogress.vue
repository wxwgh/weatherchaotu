<template>
	<div class="statetask_div" v-if="get_progress_flag">
		<div class="statetask_parent">
			<el-slider v-model="get_tab_value" v-if="get_tab_switch" @change="progress_change()" :step="progress_step" :min="get_min" :max="get_max" :format-tooltip="format_tip" :marks="get_mask_value" class="progress_slider" ></el-slider>
			<el-slider v-model="get_tab_value" v-else disabled @change="progress_change()" :step="progress_step" :min="get_min" :max="get_max" :format-tooltip="format_tip" :marks="get_mask_value" class="progress_slider" ></el-slider>
			<el-switch v-model="get_tab_switch" active-color="rgb(31, 126, 252,1)" inactive-color="rgb(204, 204, 204,1)" :width="width" class="progress_switch">
			</el-switch>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'stateprogress',
		data() {
			return {
				width:60,
				progress_step:1000
			}
		},
		computed:{
			get_progress_flag:function(){
				return this.$store.state.task_config.task_progress_flag;
			},
			get_mask_value:function(){
				return this.$store.state.task_config.mask_value;
			},
			get_max:function(){
				var temp_time = this.$store.state.task_config.end_time;
				return this.moment(temp_time).unix();
			},
			get_min:function(){
				var temp_time = this.$store.state.task_config.start_time;
				return this.moment(temp_time).unix();
			},
			get_tab_value:{
				set:function(v){
					this.$store.state.task_config.tab_value=v;
				},
				get:function(){
					return this.$store.state.task_config.tab_value;
				}
			},
			get_tab_switch:{
				set:function(v){
					this.$store.state.task_config.tab_switch=v;
				},
				get:function(){
					return this.$store.state.task_config.tab_switch;
				}
			}
		},
		methods: {
			format_tip(value) {
				var temp_time = this.moment(value*1000).format("YYYY-MM-DD HH:mm:ss");
				return temp_time;
			},
			progress_change(){
				var value = this.$store.state.task_config.tab_value;
				// 开启load层
				this.$store.state.loading=true;
				//清楚火场动态元素
				this.myCommon.clear_state_markers_layers();
				var $this =this;
				var task_config = this.$store.state.task_config;
				var out_in_host_url = this.$store.state.out_in_host_url;
				var map = this.$store.state.map;
				var info = this.$store.state.info;
				var time =  this.moment(value*1000).format("YYYY-MM-DD HH:mm:ss");
				//火场历史过程查询
				var params = {
					"lhappid": info.appid,
					"lhtime": new Date().getTime(),
					"lhsign": this.myCommon.sign({
						"lhappid": info.appid,
						"lhtime": new Date().getTime(),
						"lhsign": "",
						"projectid": info.projectid,//系统id
						"groupid": info.groupid,//单位id
						"groundid": task_config.fire_id,//火场id
						"tm": time,//时间点
					},info.appsecret),
					"projectid": info.projectid,//系统id
					"groupid": info.groupid,//单位id
					"groundid": task_config.fire_id,//火场id
					"tm": time,//时间点
				}
				$this.axios({
					method:"get",
					url:out_in_host_url+task_config.fire_url,
					params:params,
				}).then(function(result){
					var datas = result.data.data;	
					if(datas.length>0){
						var temp_datas=[];
						for(let i=0;i<datas.length;i++){
							if(datas[i].iconhref&&datas[i].iconhref.indexOf("D:")==-1&&datas[i].iconhref!=""&&datas[i].iconhref.indexOf("Multimedia")==-1){
								temp_datas.push(datas[i]);
							}
						}
						for(let i=0;i<temp_datas.length;i++){
							var type = temp_datas[i].pmid.split("_")[0];
							var marker = $this.myCommon.create_marker([temp_datas[i].coordinates.split(",")[1],temp_datas[i].coordinates.split(",")[0]],temp_datas[i].iconhref,temp_datas[i],"遂行任务",type);
						}
					}else{
						//查询结果为空则弹出提示
						$this.myCommon.get_message("此时间点暂无数据或龙慧接口无返回值");
					}
					//关闭load层
					$this.$store.state.loading=false;
				})
			},
		},
	}
</script>

<style lang="less">
.statetask_div{
	position:absolute;
	top: 88px;
	width:100%;
	z-index:1002;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	pointer-events: none;
}
.statetask_parent{
	width:600px;
	height:70px;
	background-color: rgba(0,0,0,.3);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
	pointer-events:auto
}
.progress_slider{
	width: 450px;
	height:100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
}
.el-slider__marks>div:nth-child(1){
	left:14%!important;
}
.el-slider__marks>div:nth-child(2){
	right:-64%!important;
}

.message_class{
	background: rgba(0,0,0,0.5);
	color:#fff!important;
	min-width:200px!important;
	border:0;
	// border: 0.0625rem rgba(31, 126, 252, 0.8) solid;
	// box-shadow: 0 0 0.75rem #1f7efc inset;
}
.message_class>i,
.message_class>p{
	color:#fff!important;
}
</style>
