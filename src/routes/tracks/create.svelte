<script lang="ts">
  import type { Track } from "../../models/track.model";
  import { createTrack } from "../../services/tracks";
  import { uploadStore } from "../../store/track.store";

  let track: Track = {};
  const types = ["track", "beat", "mix", "podcast"];
  let cover, audio;

  let loading: boolean = false;

  let feedback: string = "";

  const onSubmit = async () => {
    if (!track.title?.trim()) {
      feedback = "Title is required";
    } else if (!cover || !audio) {
      feedback = "Audio file or cover art is required";
    } else if (!track.type) {
      feedback = "Title is required";
    } else {
      console.log(track);

      loading = true;
      let resp = await createTrack({
        audio: audio[0],
        cover: cover[0],
        track,
      });
      loading = false;
    }

    setTimeout(() => (feedback = ""), 5000);
  };
</script>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  form {
    min-width: 260px;
  }

  form div {
    margin: 8px 0;
  }

  form > div:not(:last-child) {
    margin-bottom: 16px;
  }
  button {
    padding: 8px 26px;
    border-radius: 40px;
    background: #f3ba55;
    cursor: pointer;
    width: 100px;
    display: flex;
    justify-content: center;
    margin: auto;
  }

  .other {
    margin-top: 24px;
    text-align: center;
  }

  .feedback {
    width: 260px;
    margin: auto;
    background: #ff000024;
    border-radius: 4px;
    padding: 4px;
    color: #f71d1d;
  }

  .file {
    display: none;
  }

  label[for="cover"],
  label[for="track"] {
    cursor: pointer;
  }
</style>

<div>
  <div id="login">
    {#if feedback.trim()}
      <div class="feedback other">
        <div>{feedback}</div>
      </div>
    {/if}

    <div class="login">
      <form on:submit|preventDefault={onSubmit}>
        <h4>Create Track</h4>
        <h1>{$uploadStore.uploaded}</h1>
        <div>
          <div><label for="title">Title: </label></div>
          <input type="text" id="title" bind:value={track.title} />
        </div>
        <div>
          <div><label for="type">Type: </label></div>
          <select id="type" bind:value={track.type}>
            <option disabled>Choose track type</option>
            {#each types as type (type)}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
        <div>
          <div>
            <label for="cover">Cover:
              {cover && cover[0] ? cover[0].name : 'Select file'}</label>
          </div>
          <input class="file" type="file" id="cover" bind:files={cover} />
        </div>
        <div>
          <div>
            <label for="track">Audio file:
              {audio && audio[0] ? audio[0].name : 'Select file'}</label>
          </div>
          <input class="file" type="file" id="track" bind:files={audio} />
        </div>
        <div>
          <button>
            {#if loading}
              <!-- <span><Loader /></span> -->
            {:else}<span>Register</span>{/if}
          </button>
        </div>
      </form>
    </div>
    <div class="other">
      <div>Have an account? <a href="/login">Log in</a></div>
    </div>
  </div>
</div>
