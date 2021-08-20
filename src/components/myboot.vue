<template>
	<div class="boot_div">
		<el-row class="boot_parent" type="flex" justify="center">
			<!-- 图例 -->
			<el-col :span="8" class="legend_div">
				<div @click="legend_click()" class="legend_button" v-if="legend_button_flag">
					<span class="iconfont icon-tuli"></span>
				</div>
				<div class="legend_parent" v-if="legend_flag">
					<div class="legend_header">
						<span>图例</span>
						<span class="iconfont icon-guanbi4" @click="legend_close()"></span>
					</div>
					<div class="legend_main">
						<div>
							<span class="i1"></span>
							<span>普通设备</span>
						</div>
						<div>
							<span class="i2"></span>
							<span>北斗神州天鸿</span>
						</div>
						<div>
							<span class="i3"></span>
							<span>北斗海聊</span>
						</div>
						<div>
							<span class="i4"></span>
							<span>北斗星通</span>
						</div>
						<div>
							<span class="i5"></span>
							<span>移动和对讲</span>
						</div>
					</div>
					
				</div>
				<div @click="iframe_left_click()" class="iframe_button">
					<span>L</span>
				</div>
				<div @click="iframe_right_click()" class="iframe_button">
					<span>R</span>
				</div>
			</el-col>
			<!-- 地图切换 -->
			<el-col :span="8" class="button_bottom_parent">
				<div v-for="post in map_list" @click="boot_map_button(post)" :class="{'active':post.is_active}">
					<span>{{post.name}}</span>
				</div>
			</el-col>
			<!-- 二三位切换 -->
			<el-col :span="8"></el-col>
			<!-- <el-col :span="8" class="cut_parent">
				<div>
					<span class="iconfont icon-D"></span>
				</div>
			</el-col> -->
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'myboot',
		data() {
			return {
				map_list:[
					{
						id:this.$UUID(),
						name:"影像图",
						is_active:true,
						url:"TianDiTu.Normal.yx"
					},
					{
						id:this.$UUID(),
						name:"矢量图",
						is_active:false,
						url:"TianDiTu.Normal.road"
					},
					{
						id:this.$UUID(),
						name:"地形图",
						is_active:false,
						url:"TianDiTu.Normal.dx"
					}
				],
				legend_flag:false,
				legend_button_flag:true,
			}
		},
		methods: {
			//iframe左侧控制按钮 点击事件
			iframe_left_click(){
				if(this.$store.state.left_iframe_flag){
					this.$store.state.left_iframe_flag=false;
				}else{
					this.$store.state.left_iframe_flag=true;
				}
				
			},
			//iframe右侧控制按钮 点击事件
			iframe_right_click(){
				if(this.$store.state.right_iframe_flag){
					this.$store.state.right_iframe_flag=false;
				}else{
					this.$store.state.right_iframe_flag=true;
				}
			},
			//图例
			legend_click(){
				if(this.legend_flag){
					this.legend_flag=false;
				}else{
					this.legend_flag=true;
				}
				// this.legend_button_flag=false;
			},
			// 图例关闭
			legend_close(){
				this.legend_flag=false;
				// this.legend_button_flag=true;
			},
			boot_map_button(post) {
				var map = this.$store.state.map;
				for(let i=0;i<this.map_list.length;i++){
					if(post.name === this.map_list[i].name){
						if(!this.map_list[i].is_active){
							this.map_list[i].is_active=true;
							this.$store.state.layer.remove();
							this.$store.state.layer =  L.tileLayer.chinaProvider(post.url).addTo(map);
						}
					}else{
						this.map_list[i].is_active=false;
					}
				}
			},
		},
	}
</script>

<style lang="less">
@hovercolor:#409EFF;
.boot_div{
	width:100%;
	height:70px;
	position:absolute;
	bottom:0;
	left:0;
	z-index:1002;
}
.boot_modal{
	position:absolute;
	width:100%;
	min-width: 1400px;
	height: 70px;
	background: linear-gradient(to top, rgba(0,0,0,1), rgba(255,255,255,0));
}
.boot_parent{
	height:70px;
	width:100%;
	background: url("../assets/images/botbar.png") center bottom no-repeat;
}
// 底部按钮
.button_bottom_parent{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}
.button_bottom_parent>div{
	font-size: 15px;
	line-height: 30px;
	height:30px;
	margin-right: 10px;
	margin-top: 10px;
	text-align:center;
	cursor: pointer;
	border: 1px rgba(31,126,252,.8) solid;
	padding: 0 16px;
	font-weight: bold;
	color: #fff;
	box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
}
.button_bottom_parent>div.active,
.button_bottom_parent>div:hover{cursor:pointer;box-shadow:0 0 12px rgba(232,233,0,.5) inset;color:#e8e900;border-color:rgba(232,233,0,.5);}


// 图例
.legend_div{
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
}
.legend_button{
	width: 32px;
	height: 32px;
	font-size: 16px;
	border-radius: 3px;
	border: 1px rgba(31,126,252,.4) solid;
	box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	text-align: center;
	line-height: 30px;
	color: #fff;
	margin-left:10px;
	cursor:pointer;
}
.legend_button:hover{
	color:#409EFF;
}
.legend_parent{
	position: absolute;
	width: 200px;
	left: 11px;
	bottom: 60px;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	z-index:1001;
	background: #fff;
	color: #fff;
	background: rgba(10,15,25,.5);
	border: 1px rgba(31,126,252,.4) solid;
}
.legend_header{
	width:88%;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	line-height: 40px;
}
.legend_header>span:nth-child(1){
	font-size: 15px;
	font-weight: bold;
	margin-left: 12px;
}
.legend_header>span:nth-child(2){
	width: 16px;
	text-align: center;
	cursor:pointer;
}
.legend_header>span:nth-child(2):hover{
	color:@hovercolor;
}
.legend_header>span:nth-child(1):after{
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 11px;
	width: 4px;
	height: 16px;
	background: #fff;
	border-radius: 2px;
}
.legend_main{
	width:84%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	line-height: 26px;
	font-size: 13px;
	margin-top:10px;
	margin-bottom: 10px;
}
.legend_main>div{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
}
.legend_main>div>span:nth-child(1){
	width: 20px;
	height: 20px;
	margin: 3px 0;
}
.legend_main>div>span:nth-child(2){
	margin-left: 10px;
}
.i1{
	background: url(../assets/images/icon_p1.png) 0 0 no-repeat;
	background-size: auto 100%;
}
.i2{
	background: url(../assets/images/icon_p2.png) 0 0 no-repeat;
	background-size: auto 100%;
}
.i3{
	background: url(../assets/images/icon_p3.png) 0 0 no-repeat;
	background-size: auto 100%;
}
.i4{
	background: url(../assets/images/icon_p4.png) 0 0 no-repeat;
	background-size: auto 100%;
}
.i5{
	background: url(../assets/images/icon_p5.png) 0 0 no-repeat;
	background-size: auto 100%;
}

// 二三维切换
.cut_parent{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-end;
	align-items: center;
}
.cut_parent>div{
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: rgba(38,38,38,.5);
	line-height: 52px;
	text-align: center;
	cursor: pointer;
	color:#fff;
	box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	border: 1px rgba(31,126,252,.4) solid;
	margin-right:10px;
}
.cut_parent>div>span{
	margin-left:4px;
}
.cut_parent>div:hover{
	color:#409EFF;
}

//iframe 左右控制按钮样式
.iframe_button{
	width: 32px;
	height: 32px;
	border-radius: 3px;
	border: 1px rgba(31, 126, 252, 0.4) solid;
	box-shadow: 0 0 12px #1f7efc inset;
	text-align: center;
	line-height: 30px;
	color: #fff;
	margin-left:10px;
	cursor:pointer;
}
.iframe_button:hover{
	color:#409EFF;
}
</style>
