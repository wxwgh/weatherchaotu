<template>
	<div></div>
</template>

<script>
	export default {
		name: 'mymain',
		data() {
			return {
			}
		},
		methods: {
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


</style>
