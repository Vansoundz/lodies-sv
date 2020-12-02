<script lang="ts">
</script>

<style>
  /* .main {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .all,
  .ex {
    overflow-y: scroll;
    height: calc(100vh - 120px);
  } */

  @media screen and (max-width: 768px) {
    .ex {
      display: none;
    }

    .main {
      display: block !important;
    }
  }
</style>

<div class="main">
  <div class="all">
    <slot name="main" />
  </div>
  <div class="ex">
    <slot name="extra" />
  </div>
</div>
