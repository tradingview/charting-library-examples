<script>
  import TvChartContainer from "../components/TVChartContainer.svelte";
  import { version } from "$lib/charting_library";
</script>

<div>
  <p class="title">Library version: {version()}</p>
  <TvChartContainer />
</div>

<style>
  p {
    color: rgb(124, 89, 7);
    font-family: -apple-system, BlinkMacSystemFont, "Trebuchet MS", Roboto,
      Ubuntu, sans-serif;
    font-size: 0.8em;
  }

  .title {
    margin-left: 10px;
  }
</style>
