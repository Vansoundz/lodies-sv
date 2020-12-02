<script lang="ts">
  export let width: number = 50;
  export let height: number = 50;
</script>

<style>
  .circle {
    border-radius: 50%;
    background: #ddd;
  }
</style>

<div class="circle" style={`width: ${width}px; height: ${height}px`} />
