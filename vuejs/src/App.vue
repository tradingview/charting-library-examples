<template>
<div class="app">
  <header class="app__header">
    <h1 class="app__title">
      TradingView Charting Library and Vue.js Integration Example
    </h1>
  </header>
  <TVChartContainer />
</div>
</template>

<script>
import TVChartContainer from './components/TVChartContainer.vue'
export default {
  name: 'app',
  components: {
    TVChartContainer
  }
}
</script>

<style lang="scss" scoped>
.app {
    text-align: center;

    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        background-color: #222;
        color: #fff;
    }

    &__title {
        display: block;
        font-size: 1.5em;
    }
}
</style>
