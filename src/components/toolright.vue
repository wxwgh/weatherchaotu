<template>
	<div class="toolright_div">
		<!-- <div class="toolright_daohang_parent">
			<span></span>
		</div> -->
		<div class="toolright_button_parent" @click="zoomin_click()">
			<span class="iconfont icon-jiahao"></span>
		</div>
		<div class="toolright_button_parent" @click="zoomout_click()">
			<span class="iconfont icon-jianhaocu"></span>
		</div>
		<div class="toolright_button_parent" @click="help_click()">
			<span class="iconfont icon-bangzhu"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'toolright',
		data() {
			return {
			}
		},
		methods: {
			zoomin_click() {
				var map = this.$store.state.map;
				map.zoomIn();
			},
			zoomout_click(){
				var map = this.$store.state.map;
				map.zoomOut();
			},
			help_click(){
				this.$message({
					type:"error",
					message:"开发中..."
				})
			},
		},
	}
</script>

<style lang="less">
.toolright_div{
	position: absolute;
	bottom: 80px;
	right:21px;
	color:#fff;
	z-index: 1002;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-around;
	height:120px;
	border-radius: 4px;
	background: rgba(0,0,0,.4);
}
.toolright_button_parent{
	width:32px;
	height:32px;
	text-align: center;
	line-height: 16px;
	line-height: 32px;
	cursor: pointer;
}
.toolright_button_parent:hover{
	color:#409EFF;
}


.toolright_daohang_parent{
	width: 60px;
	height: 60px;
	// margin-bottom: 5px;
	border-radius: 50%;
	background: url(../assets/images/outer.svg) 0 0 no-repeat;
	background-size: contain;
	font-size: 14px;
}
.toolright_daohang_parent>span{
	display: block;
	// transform: translate(-50%,-50%);
	// position: absolute;
	width: 30px;
	height: 30px;
	background: url(../assets/images/inner.svg) 0 0 no-repeat;
	background-size: contain;
}
</style>
