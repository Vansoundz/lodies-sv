<script lang="ts">
  import { onMount } from "svelte";
  import { audioStore } from "../../store/audio.store";

  onMount(() => {
    audioStore.createPlayer();
  });

  onMount(() => {
    let progress = document.getElementById("progress");
    if ($audioStore.audio) {
      $audioStore.audio.addEventListener("timeupdate", () => {
        let duration = $audioStore.audio.duration;
        let currentTime = $audioStore.audio.currentTime;

        let val = (100 - (currentTime / duration) * 100) * -1;

        progress.style.transform = `translateX(${val}%)`;
      });
    }
  });

  const updateTime = (e: MouseEvent) => {
    if ($audioStore.audio && $audioStore.current) {
      let width = window.innerWidth;
      let progress = document.getElementById("progress");
      let x = e.x;

      let time = (x / width) * $audioStore.audio.duration;

      if (typeof time === "number") {
        audioStore.updateTime(time);
        let currentTime = $audioStore.audio.currentTime;

        let val = (100 - (currentTime / $audioStore.audio.duration) * 100) * -1;

        progress.style.transform = `translateX(${val}%)`;
      }
    }
  };
</script>

<style>
  .player {
    position: relative;
    width: 100%;
  }
  .progress-indicator {
    position: relative;
    width: 100%;
    height: 5px;
    background: #fff;
  }

  #progress {
    height: 5px;
    width: 100vw;
    background: var(--pri);
    transform: translateX(-100%);
    transition: translateX 0.2s;
  }

  .player-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    padding: 0 6px;
  }

  .controls,
  .actions,
  .details {
    display: flex;
    align-items: center;
  }

  .controls {
    justify-content: center;
  }

  .actions {
    justify-content: flex-end;
  }

  .actions > span:nth-child(2n) {
    display: none;
  }

  .cover {
    width: 40px;
    height: 40px;
    background-color: var(--tet);
    border-radius: 4px;
    margin-right: 6px;
  }

  @media screen and (max-width: 767px) {
    .player-wrapper {
      display: flex;
    }
    .controls,
    .actions > span:first-child {
      display: none;
    }

    .actions > span:nth-child(2n) {
      display: block;
    }
  }
</style>

<div class="player">
  <div class="progress-indicator" on:click={updateTime}>
    <div id="progress" />
  </div>
  <div class="player-wrapper">
    <div class="details">
      <div
        class="cover"
        style={`background: url(${$audioStore.current?.cover})`} />
      <div class="more">
        {#if $audioStore.current}
          <div class="name">{$audioStore.current.title}</div>
          <div class="artist">{$audioStore.current.artist.username}</div>
        {/if}
      </div>
    </div>
    <div class="controls">
      <span> <i class="material-icons">shuffle</i> </span>
      <span> <i class="material-icons">chevron_left</i> </span>
      <span
        on:click={() => {
          if ($audioStore.audio) {
            audioStore.playOrPause();
          }
        }}>
        {#if $audioStore.loading}
          <div>()</div>
        {:else}
          <i class="material-icons">
            {$audioStore.audio?.paused ? 'play_arrow' : 'pause'}
          </i>
        {/if}
      </span>
      <span> <i class="material-icons">chevron_right</i> </span>
      <span> <i class="material-icons">volume_up</i> </span>
    </div>
    <div class="actions">
      <span> <span> <i class="material-icons"> description </i> </span> </span>
      <span><span> <i class="material-icons"> play_arrow </i> </span></span>
      <span><span> <i class="material-icons"> more_vert </i> </span></span>
    </div>
  </div>
</div>
