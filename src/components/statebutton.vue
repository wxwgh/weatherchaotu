<template>
	<div class="satebutton_div"v-if="get_button_flag">
		<div class="satebutton_container">
			<div v-for="post in get_button_config" :class="{'satebutton_parent':true,'active':post.is_active}" @click="button_click(post)">
				<span>{{post.name}}</span>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'statebutton',
		data() {
			return {
			}
		},
		computed:{
			get_button_config:function(){
				var temp_config = this.$store.state.left_panel_config;
				for(let i=0;i<temp_config.length;i++){
					for(let j=0;j<temp_config[i].child.length;j++){
						if(temp_config[i].child[j].name=="在线人员位置"){
							return temp_config[i].child[j].child;
						}
					}
				}
			},
			get_button_flag:function(){
				return this.$store.state.task_config.task_button_flag;
			}
		},
		methods: {
			button_click(post) {
				var $this = this;
				var config = this.$store.state.left_panel_config;
				var type = post.type;
				// 设置子菜单选中或取消
				for(let i =0;i<config.length;i++){
					for(let j=0;j<config[i].child.length;j++){
						if(type===config[i].child[j].name){
							for(let x=0;x<config[i].child[j].child.length;x++){
								if(post.name == config[i].child[j].child[x].name){
									if(config[i].child[j].child[x].is_active){
										config[i].child[j].child[x].is_active=false;
										// 清除marker
										for(let s=0;s<config[i].child[j].child[x].markers.length;s++){
											config[i].child[j].child[x].markers[s].remove();
										}
										config[i].child[j].child[x].markers=[];
										
										//通过child_name判断是否清楚 人员轨迹
										if($this.$store.state.right_panel_config.child_name==post.name){
											$this.myCommon.clear_track_marker_layer();
										}
										
										//关闭右侧面板
										$this.$store.state.right_panel_flag=false;
										return false;
									}else{
										config[i].child[j].child[x].is_active=true;
									}
								}
							}
						}
						
					}
				}
				var data = {
					"lhappid": "5e5c673ee4b07d0df76eae6e",
					"lhtime": new Date().getTime(),
					"lhsign": this.myCommon.sign({
						"lhappid": "5e5c673ee4b07d0df76eae6e",
						"lhtime": new Date().getTime(),
						"lhsign": "",
						"projectid": "slfh",//系统id
						"adcd": "37054",//行政区划编码/单位id
						"gpstype": 0,//设备类型，0手机，1电脑，2网络,默认0
						"next": 2//是否包含下级，0：查本级，1：本级+下一级，2：本级+所有下级，默认2
					}, "8c2944019ce74b4018dd0190e228113a45cbc19b"),
					"projectid": "slfh",//系统id
					"adcd": "37054",//行政区划编码/单位id
					"gpstype": 0,//设备类型，0手机，1电脑，2网络,默认0
					"next": 2//是否包含下级，0：查本级，1：本级+下一级，2：本级+所有下级，默认2
				};
				//调用服务
				this.axios({
					method:"get",
					url:post.url,
					params:data,
				}).then(function(result){
					var datas = result.data.data;
					var temp_datas=[]
					for(let i=0;i<datas.length;i++){
						if(post.data_type===datas[i].sblx&&datas[i].latitude!=0&&datas[i].longitude!=0&&datas[i].onlineflag==1){
							temp_datas.push(datas[i]);
						}
					}
					for(let i=0;i<temp_datas.length;i++){
						var temp_config=$this.get_right_config(temp_datas[i],type,post.name);
						$this.myCommon.create_marker([temp_config.attribution.纬度,temp_config.attribution.经度],post.icon_url,temp_config,"在线人员位置","");
					}
				})
			},
			get_right_config(data,type,child_name){
				var $this =this;
				var temp_config={};
				var left_configs = $this.$store.state.left_panel_config;
				for(let i=0;i<left_configs.length;i++){
					for(let j=0;j<left_configs[i].child.length;j++){
						if(type === left_configs[i].child[j].name){
							temp_config = JSON.parse(JSON.stringify(left_configs[i].child[j].right_config));
						}
					}
				}
				temp_config.child_name=child_name;
				if(type==="在线人员位置"){
					temp_config.name = data.owner;
					temp_config.gpsid=data.gpsid;
					for(let key in temp_config.attribution){
						if(key==="电量"){
							temp_config.attribution[key] = (Number(data[temp_config.attribution[key]]) > 0 ? data[temp_config.attribution[key]] + '%' : '');
						}else{
							temp_config.attribution[key] = data[temp_config.attribution[key]];
						}
					}
				}
				return temp_config;
			},
			
		},
	}
</script>

<style lang="less">

.satebutton_div{
	position: absolute;
	bottom:88px;
	width:100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	z-index:1002;
	pointer-events: none;
}
.satebutton_container{
	width:615px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	align-items: center;
	pointer-events:auto
}
.satebutton_parent{
	font-size: 15px;
	border: 1px rgba(255,255,255,.2) solid;
	padding: 0 14px;
	line-height: 34px;
	color:#fff;
	font-weight: bold;
	// box-shadow: 0 0 10px rgb(255,255,255,0.2) inset;	
	cursor: pointer;
}
.satebutton_parent.active,
.satebutton_parent:hover{
	box-shadow: 0 0 12px rgb(232,233,0,0.5) inset;
	color: #e8e900;
	border-color: rgba(232,233,0,0.5);
}
</style>
