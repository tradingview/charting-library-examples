<template>
<div class="app">
  <header class="app__header">
    <h1 class="app__title" v-once>
      TradingView Charting Library and Vue.js Integration Example {{ version }}
    </h1>
  </header>
  <TVChartContainer />
</div>
</template>

<script>
import TVChartContainer from './components/TVChartContainer.vue'
import { version } from '../public/charting_library'

export default {
  name: 'app',
  components: {
    TVChartContainer
  },
  data() {
    return { version: version() }
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
