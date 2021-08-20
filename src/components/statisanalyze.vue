<template>
	<div v-if="get_flag" class="statisanalyze_parent">
		<iframe :src="get_src" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
	</div>
</template>

<script>
	export default {
		name: 'statisanalyze',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.statisanalyze_flag;
			},
			get_src:function(){
				return this.$store.state.statis_url;
			}
		},
		mounted: function() {
			this.init_height();
		},
		methods: {
			init_height() {
				var height = parseInt(window.innerHeight)-88-70;
				$(".statisanalyze_parent").css("height", height);
			},
		},
	}
</script>

<style lang="less">

.statisanalyze_parent{
	position:absolute;
	top:88px;
	left:0;
	right:0px;
	bottom:70px;
	width: 100%;
	z-index:1002;
	padding: 0;
	background: #fff;
}
</style>
