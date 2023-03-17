<script setup>
import TVChartContainer from './components/TVChartContainer.vue';
import { version } from '../public/charting_library';
</script>

<template>
  <div class="app">
		<header class="app_header">
			<h1 class="app_title">
				TradingView Charting Library and Vue.js Integration Example
				{{ version() }}
			</h1>
		</header>
		<TVChartContainer />
	</div>
</template>

<style scoped>
.app {
	text-align: center;
}

.app_header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
	background-color: #222;
	color: #fff;
  height: 60px;
  max-height: 60px;
  padding: 10px;
}

.app_title {
	display: block;
	font-size: 1.25em;
}
</style>
