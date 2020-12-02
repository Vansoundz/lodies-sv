<script lang="ts" context="module">
  export async function preload() {
    try {
      let resp = await getTracks();
      if (resp.tracks) return resp;
      return { tracks: [] };
    } catch (error) {
      return { tracks: [] };
    }
  }
</script>

<script lang="ts">
  import Track from "../../components/cards/track.svelte";
  import type { Track as TrackModel } from "../../models/track.model";
  import Main from "../../components/layout/_main.svelte";
  import { getTracks } from "../../services/tracks";
  import { io } from "../../socket";
  import { onMount } from "svelte";

  // setTimeout(() => {
  //   io.emit("play");
  // }, 3000);

  onMount(() => {
    var context = new AudioContext();
    var delayTime = 0;
    var init = 0;
    var audioStack: AudioBuffer[] = [];
    var nextTime = 0;
    io.on("serve-song", function (data) {
      context.decodeAudioData(
        data.buffers,
        function (buffer) {
          audioStack.push(buffer);
          if (init != 0 || audioStack.length > 10) {
            // make sure we put at least 10 chunks in the buffer before starting
            init++;
            scheduleBuffers();
          }
        },
        function (err) {
          console.log("err(decodeAudioData): " + err);
        }
      );
    });
    function scheduleBuffers() {
      while (audioStack.length) {
        // buffer = mediaSource.addSourceBuffer('audio/mpeg');
        var buffer = audioStack.shift();
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        if (nextTime == 0) nextTime = source.buffer.duration + 0.05; /// add 50ms latency to work well across systems - tune this if you like
        source.start(nextTime);
        nextTime += source.buffer.duration; // Make the next buffer wait the length of the last buffer before being played
      }
    }
  });

  export let tracks: TrackModel[] = [];

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
        {#each tracks as track (track._id)}
          <Track {track} />
        {:else}
          <h4>Ooops</h4>
        {/each}
      </div>
    </div>
    <div>
      <div class="head">
        <div>Beats</div>
      </div>
      <div class="tracks">
        {#each arr.slice(4) as arr (Math.random())}
          <Track />
        {/each}
      </div>
    </div>
    <div>
      <div class="head">
        <div>Mixes</div>
      </div>
      <div class="tracks">
        {#each arr.slice(4) as arr (Math.random())}
          <Track />
        {/each}
      </div>
    </div>
    <div>
      <div class="head">
        <div>Songs</div>
      </div>
      <div class="tracks">
        {#each arr.slice(4) as arr (Math.random())}
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
