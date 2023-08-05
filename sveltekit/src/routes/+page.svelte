<script>
  import TvChartContainer from "../components/TVChartContainer.svelte";
  import { version } from "$lib/charting_library";
</script>

<p>Library version: {version()}</p>

<TvChartContainer />

<style>
  p {
    color: rgb(124, 89, 7);
    font-family: "Comic Sans MS", cursive;
    font-size: 0.8em;
  }
</style>
