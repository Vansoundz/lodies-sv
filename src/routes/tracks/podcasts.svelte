<script>
  import Track from "../../components/cards/track.svelte";
  import Main from "../../components/layout/_main.svelte";

  let arr = Array(10).fill(1);
</script>

<style>
  .tracks {
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-gap: 16px;
    margin: auto;
  }

  .head {
    padding: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<svelte:head>
  <title>Lodies remake</title>
</svelte:head>

<Main>
  <div slot="main">
    <!-- <Modal /> -->
    <div>
      <div class="head">
        <div>Podcasts</div>
      </div>
      <div class="tracks">
        {#each arr as item (Math.random())}
          <Track />
        {/each}
      </div>
    </div>
  </div>
  <div slot="extra">
    <div class="extra">
      {#each arr as item (Math.random())}
        <div class="t-extra">
          <Track />
        </div>
      {/each}
    </div>
  </div>
</Main>
