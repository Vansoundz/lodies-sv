<script lang="ts">
  import type { Track } from "../../models/track.model";
  import { io } from "../../socket";
  import { audioStore } from "../../store/audio.store";

  import Modal from "../utils/modal.svelte";

  export let track: Track | undefined;
  let open = false;
</script>

<style>
  .track {
    box-shadow: 1px 1px 6px #ddd, -1px -1px 6px rgba(241, 237, 180, 0.952);
    border-radius: 4px;
    min-height: 260px;
    position: relative;
    overflow: hidden;
  }

  .cover,
  .track {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .details {
    padding: 4px;
  }

  .details {
    background: #fff;
  }

  .cover {
    flex: 1;
    background: rgba(28, 219, 245, 0.808);
  }

  .top,
  .bottom,
  .artist,
  .first,
  .plays-counter {
    display: flex;
  }

  .top {
    justify-content: flex-end;
  }

  .bottom {
    justify-content: space-around;
  }

  .add,
  .bottom {
    padding: 4px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
  }

  .artist {
    justify-content: space-between;
    align-items: center;
  }

  .first,
  .plays-counter {
    align-items: center;
    color: #484040;
  }

  .image {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #39baf3;
    margin-right: 6px;
  }

  ul {
    min-width: 250px;
    padding: 8px;
  }
  ul li {
    padding: 12px 0;
    cursor: pointer;
  }

  ul li:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }

  .second > button {
    background: transparent;
  }

  .artist-name {
    font-size: 16px;
    font-weight: 500;
  }
</style>

<Modal {open} on:open={() => (open = !open)}>
  <ul>
    <li>Comment</li>
    <li>View Lyrics</li>
    <li>Add to Que</li>
    <li>Add to Playlist</li>
  </ul>
</Modal>

{#if track}
  <div class="track">
    <div class="cover" style={`background: url(${track.cover})`}>
      <div class="top">
        <div class="add"><i class="material-icons">playlist_add </i></div>
      </div>
      <div class="bottom">
        <span
          on:click={() => {
            audioStore.selectTrack(track);
          }}>
          <i class="material-icons">
            {$audioStore.audio?.paused || track._id !== $audioStore.current?._id ? 'play_arrow' : 'pause'}
          </i>
        </span>
        <span> <i class="material-icons">favorite_border</i> </span>
        <span on:click={() => (open = !open)}>
          <i class="material-icons">more_horiz</i>
        </span>
      </div>
    </div>
    <div class="details">
      <div class="artist">
        <div class="first">
          <div class="image" />
          <div class="artist-name">{track.artist.username}</div>
        </div>

        <div class="second">
          <button> <i class="material-icons">person_add</i> </button>
        </div>
      </div>
      <div class="first">
        <div style="font-size: 14px;">{track.title}</div>
      </div>
      <div style="font-size: 14px;" class="plays-counter">
        <span
          on:click={() => {
            io.emit('play', track._id);
            //audioStore.selectTrack(track);
          }}>
          <i class="material-icons">
            {$audioStore.audio?.paused || track._id !== $audioStore.current?._id ? 'play_arrow' : 'pause'}
          </i>
        </span>
        <span>5k</span>
      </div>
    </div>
  </div>
{:else}
  <div class="track">
    <div class="cover">
      <div class="top">
        <div class="add"><i class="material-icons">playlist_add </i></div>
      </div>
      <div class="bottom">
        <span> <i class="material-icons">play_arrow</i> </span>
        <span> <i class="material-icons">favorite_border</i> </span>
        <span on:click={() => (open = !open)}>
          <i class="material-icons">more_horiz</i>
        </span>
      </div>
    </div>
    <div class="details">
      <div class="artist">
        <div class="first">
          <div class="image" />
          <div>Name</div>
        </div>

        <div class="second">
          <button> <i class="material-icons">person_add</i> </button>
        </div>
      </div>
      <div class="first">
        <div>Track title</div>
      </div>
      <div class="plays-counter">
        <span> <i class="material-icons">play_arrow</i> </span>
        <span>5k</span>
      </div>
    </div>
  </div>
{/if}
