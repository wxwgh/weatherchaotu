<template>
	<div id="app" v-loading.fullscreen.lock="get_loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
		<!-- 页眉 -->
		<myheader></myheader>
		<!-- 主体部分 -->
		<mymain></mymain>
		<!-- 页脚 -->
		<myboot></myboot>
	</div>
</template>
<script>
	import myheader from '@/components/myheader.vue';
	import myboot from '@/components/myboot.vue';
	import mymain from '@/components/mymain.vue';
	export default {
		components: {
			myheader,
			mymain,
			myboot,
		},
		data() {
			return {
				//顶部选项卡标识
				// activeName: 'first',
			};
		},
		mounted: function() {
		},
		// 页面创建时
		created: function() {
			$("body").css("min-height", window.innerHeight);
		},
		computed: {
			get_loading: function() {
				return this.$store.state.loading;
			}
		},
		methods: {
		}
	};
</script>
<style lang="less">
	/* 初始化环境 */
	html,
	body {
		height: 100%;
		width: 100%;
		min-width: 1400px;
		-webkit-user-select: none;
		font-size: 16px;
		color: #2c3e50;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family:'PingFang';
		white-space:nowrap;
	}
	@font-face{font-family:'PingFang';src:url('./assets/fonts/PingFang.ttf') format('truetype');font-weight:normal;font-style:normal;}
	@font-face{font-family:'DS-Digital';src:url('./assets/fonts/DS-DIGIB.ttf') format('truetype');font-weight:normal;font-style:normal;}
	body {
		margin: 0;
		padding: 0;
		background: #fff;
	}

	body img {
		border: none;
		margin: 0;
		padding: 0;
	}

	div,
	h1,
	h2,
	h3,
	h4,
	p,
	form,
	label,
	input,
	textarea,
	img,
	span {
		margin: 0;
		padding: 0;
		// 允许在单次内换行
		word-break: break-all;
		word-wrap: break-word;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
		word-break: break-all;
		word-wrap: break-word;
	}

	dl,
	dt,
	dd {
		margin: 0;
		padding: 0;
		border: 0;
	}

	a {
		color: #5f6477;
		text-decoration: none;
	}

	a:hover {
		color: #5f6477;
		text-decoration: none;
	}

	:focus {
		outline: 0;
	}

	input,
	select {
		font-family: "微软雅黑";
	}

	/* 设置滚动条的样式 */
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}

	/* 滚动槽 */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: #ddd;

	}

	/* 滚动条滑块 */
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		height: 1px;
		background: #777;
	}

	#app {
		height: 100%;
		width: 100%;
		position:relative;
	}
	
	.el-loading-spinner .el-loading-text{
		color:#fff;
		font-size: 16px;
	}
	.el-loading-spinner i{
		color:#fff;
		font-size: 24px;
	}
</style>
