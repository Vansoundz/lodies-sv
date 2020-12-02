<script lang="ts">
  import "nprogress/nprogress.css";
  import Sidenav from "../components/layout/sidenav.svelte";
  import Player from "../components/player/player.svelte";
  import Nav from "../components/Nav.svelte";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { getUser } from "../services/auth";
  import { auth } from "../store/auth.store";
  import { goto } from "@sapper/app";
  import NProgress from "nprogress";
  import { stores } from "@sapper/app";
  import { v4 } from "uuid";
  import { audioStore } from "../store/audio.store";

  NProgress.configure({
    // minimum: 0.16,
    showSpinner: false,
  });

  const { preloading } = stores();

  $: {
    if ($preloading) {
      NProgress.start();
    }

    if (!$preloading) {
      NProgress.done();
    }
  }

  export let segment: string;
  let show: boolean = false;
  const segment$ = writable(segment);
  $: $segment$ = segment;

  onMount(async () => {
    if (!localStorage.deviceId) {
      localStorage.setItem("deviceId", v4());
    }
    let resp = await getUser();

    if (resp.user) {
      auth.login(resp.user);

      if (segment === undefined) {
        goto("tracks");
      }
    } else {
      auth.logout();
    }
  });

  const playOrPause = (e: KeyboardEvent) => {
    if ($audioStore.audio && $audioStore.current) {
      if (e.key === " ") {
        audioStore.playOrPause();
      }
    }
  };

  setContext("segment", segment$);
  $: {
    if (segment === undefined) {
      show = false;
    } else if (segment === "login" || segment === "register") {
      show = false;
    } else if (segment === "pricing") {
      show = false;
    } else {
      show = true;
    }
  }
</script>

<style>
  .app {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background: var(--acc);
  }
  .player {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    background: var(--sec);
    z-index: 1010;
  }

  .loading {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #00000069;
    z-index: 1000;
    width: 100%;
  }
  .loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<svelte:body on:keyup|self={playOrPause} />

{#if $auth.loading}
  <div class="loading">
    <div class="loader" />
  </div>
{:else if show}
  <div class="app">
    <div class="player">
      <Player />
    </div>
    <div class="sidenav">
      <Sidenav {segment} />
    </div>
    <div>
      <Nav />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
{:else}
  <div class="landing ">
    <slot {segment} />
  </div>
{/if}
