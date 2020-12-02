<script lang="ts">
  import { onMount } from "svelte";

  interface Path {
    icon: string;
    path: string;
    name: string;
  }

  export let segment: string;

  const routes: Path[] = [
    { name: "home", path: "tracks", icon: "home" },
    { name: "charts", path: "charts", icon: "trending_up" },
    {
      name: "favorites",
      path: "tracks/create",
      icon: "favorite",
    },
  ];

  let small: boolean = false;

  const resizeListener = (e: Event) => {
    small = window.innerWidth <= 768;
  };

  onMount(() => {
    small = window.innerWidth <= 768;
  });
</script>

<style>
  .sidenav {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw * (1 / 6));
    height: calc(100% - 60px);
    background: var(--sec);
    overflow: hidden;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .logo,
  #menu {
    padding: 16px;
  }

  ul {
    overflow: hidden;
  }

  ul li {
    padding: 8px 16px;
    position: relative;
    cursor: pointer;
    text-transform: capitalize;
  }

  ul li a {
    display: flex;
    align-items: center;
  }

  ul li a span {
    margin-left: 8px;
  }

  li.active {
    background: #fff;
    animation: active 0.2s 1 both;
  }

  li.active::before {
    position: absolute;
    content: "";
    width: 4px;
    height: 100%;
    background: var(--pri);
    left: 0;
    top: 0;
    animation: open 0.2s 1 both;
  }

  @keyframes open {
    from {
      height: 0%;
    }

    to {
      height: 100%;
    }
  }

  @keyframes active {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }
</style>

<svelte:window on:resize={resizeListener} />

<div class="sidenav">
  <a class="logo" href="/">{small ? 'L' : 'Lodies'}</a>
  <ul>
    {#each routes as route (Math.random())}
      <li class:active={route.path === segment}>
        <a rel="prefetch" href={`/${route.path}`}>
          <i class="material-icons">{route.icon}</i>
          <span> {!small ? route.name : ''} </span>
        </a>
      </li>
    {/each}
  </ul>
  <div id="menu" on:click={() => console.log(100)}>{'>'}</div>
</div>
