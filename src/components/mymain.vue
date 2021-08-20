<template>
	<div class="main_div">
		<div id="map"></div>
		<!-- 导航盘,放大,缩小,问号-->
		<toolright></toolright>
		<!-- 测距,测面,标记,全屏工具栏 -->
		<tooltop></tooltop>
		<!-- 左侧操作面板 -->
		<leftpanel></leftpanel>
		<!-- 右侧属性面板 -->
		<rightpanel></rightpanel>
		<!-- 遂行任务 进度条 -->
		<stateprogress></stateprogress>
		<!-- 遂行任务 底部按钮 -->
		<statebutton></statebutton>
		<!-- 图例面板 -->
		<legendv></legendv>
		<!-- 左侧iframe -->
		<iframeleft></iframeleft>
		<!-- 右侧iframe -->
		<iframeright></iframeright>
		<!-- 统计分析页面 -->
		<statisanalyze></statisanalyze>
		<!-- 四周黑色半透遮罩 -->
		<div class="mask-left"></div>
		<div class="mask-righ"></div>
		<div class="mask-top"></div>
		<div class="mask-bot"></div>
	</div>
</template>

<script>
	import tooltop from '@/components/tooltop.vue';
	import toolright from '@/components/toolright.vue';
	import leftpanel from '@/components/leftpanel.vue';
	import rightpanel from '@/components/rightpanel.vue';
	import stateprogress from '@/components/stateprogress.vue';
	import statebutton from '@/components/statebutton.vue';
	import legendv from '@/components/mylegend.vue';
	import iframeleft from '@/components/iframeleft.vue';
	import iframeright from '@/components/iframeright.vue';
	import statisanalyze from '@/components/statisanalyze.vue';
	export default {
		name: 'mymain',
		components: {
			tooltop,
			toolright,
			rightpanel,
			leftpanel,
			stateprogress,
			statebutton,
			legendv,
			iframeleft,
			iframeright,
			statisanalyze
		},
		data() {
			return {}
		},
		mounted: function() {
			this.init_map();
		},
		methods: {
			init_map() {
				var height = parseInt(window.innerHeight);
				$("#map").css("height", height);
				this.$store.state.map = L.map("map", {
					center: [39.550339, 100.114129],
					zoom: 3,
					minZoom: 3,
					maxZoom: 30,
					zoomControl: false,
					attributionControl: false,
					keyboard: false,
					preferCanvas: true
				});
				this.$store.state.layer = L.tileLayer.chinaProvider("GaoDe.Normal.yx").addTo(this.$store.state.map);
				//创建海量marker图层
				this.$store.state.task_config.marker_canvas_layer=L.massmarkers({}).addTo(this.$store.state.map);
				this.$store.state.task_config.track_marker_layer=L.massmarkers({}).addTo(this.$store.state.map);
				L.supermap.tiledMapLayer(this.$store.state.SUPERMAP_CHINA_URL, { transparent: true, noWrap: true, zIndex: 101, baseLayer: true }).addTo(this.$store.state.map);
				window.onresize = function() {
					var height = parseInt(window.innerHeight);
					$("#map").css("height", height);
				}
			},
			downLoadClick(post) {
				var map = this.myCommon.getMap();
				this.myCommon.unbindMapEvent(map);
				this.myCommon.switchMouseStyle(false, map);
				this.myCommon.clearOperation();
			},
		},
	}
</script>

<style lang="less">
	.main_div {
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden;
	}

	#map {
		width: 100%;
		overflow: hidden;
	}

	.mask-left {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 140px;
		background: linear-gradient(to right, rgba(0, 0, 0, .9), rgba(0, 0, 0, .6));
		z-index: 1001;
		pointer-events: none;
	}

	.mask-left:after {
		content: '';
		display: block;
		position: absolute;
		left: 140px;
		top: 0;
		bottom: 0;
		width: 160px;
		background: linear-gradient(to right, rgba(0, 0, 0, .6), transparent);
	}

	.mask-righ {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 140px;
		background: linear-gradient(to left, rgba(0, 0, 0, .9), rgba(0, 0, 0, .6));
		z-index: 1001;
		pointer-events: none;
	}

	.mask-righ:after {
		content: '';
		display: block;
		position: absolute;
		right: 140px;
		top: 0;
		bottom: 0;
		width: 160px;
		background: linear-gradient(to left, rgba(0, 0, 0, .6), transparent);
	}

	.mask-top {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 300px;
		background: linear-gradient(to bottom, #0B0F19, transparent);
		z-index: 1001;
		pointer-events: none;
	}

	.mask-bot {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 200px;
		background: linear-gradient(to top, #0B0F19, transparent);
		z-index: 1001;
		pointer-events: none;
	}
</style>
