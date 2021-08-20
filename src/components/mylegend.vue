<template>
  <div class="mylegend">
    <div class="leaflet-legend-container leaflet-control leaflet-container" v-for="(itema, indexa) in this.$store.state.qxlegends" v-show="itema.isShowView">
      <div
        class="legend-left"
        style="cursor: pointer; background: linear-gradient(to right, rgb(50, 50, 50), rgb(50, 50, 50), rgb(50, 50, 50)); width: 23%;"
      >{{itema.legendText}}</div>

      <div
        class="legend-middle"
        style="background: linear-gradient(to right, rgb(50, 50, 50), rgb(50, 50, 50), rgb(50, 50, 50)); width: 28%;"
      >{{itema.legendTime}}</div>
      
      <div
        v-for="(item, index) in itema.legendMiddles"
        :key="index"
        :class="index!=itema.legendMiddles.length-1?'legend-middle':'legend-right'"
        :style="'background:'+item.color+';width:'+50/itema.legendMiddles.length+'%'"
        style="color:white;"
      >{{item.value}}</div>
      
    </div>
  </div>
</template>

<script>
	export default {
		name: 'mylegend',
		data() {
			return {
			}
		},
		methods: {
	
		},
	}
</script>

<style lang="less" scoped>
.leaflet-legend-container {
  width: 620px;
  height: 20px;
  color: #f9fafc;
  background-color: #323232;
  position: relative;
  border-radius: 10px;
  bottom: 60px;
  margin: 0 auto;
}
.leaflet-control {
  margin-bottom: 10px;
}

.legend-close,
.legend-left,
.legend-middle,
.legend-right {
  height: 20px;
  float: left;
  text-align: center;
  font-weight: 700;
}

.legend-close {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.legend-left,
.legend-middle,
.legend-right {
  height: 20px;
  float: left;
  text-align: center;
  font-weight: 700;
}

.legend-right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.leaflet-container {
  font: 12px/1.5 Helvetica Neue, Arial, Helvetica, sans-serif;
}
.mylegend {
  position: absolute;
  right: 60px;
  bottom: 88px;
  z-index: 1003;
}
</style>