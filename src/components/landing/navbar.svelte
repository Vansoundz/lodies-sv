<script lang="ts">
  import { getContext } from "svelte";

  const segment$ = getContext("segment");

  // @ts-ignore
  $: segment = $segment$;
</script>

<style>
  .nav-wrapper {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: 70px; */
    background: #fff;
    box-shadow: 0 2px 6px #ddd;
    padding: 0 16px;
  }

  nav > a {
    font-weight: 600;
  }

  nav ul {
    display: flex;
  }

  nav ul li {
    position: relative;
    padding: 22px 0;
  }

  nav ul li.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 70%;
    height: 6px;
    background: #eb6f0a;
  }

  nav ul li:not(:last-child) {
    margin-right: 16px;
  }
</style>

<div class="nav-wrapper">
  <nav>
    <a href="/">Lodies</a>
    <ul>
      <li class:active={segment === 'pricing'}>
        <a href="/pricing">Pricing</a>
      </li>
      <li class:active={segment === 'about'}><a href="/">About</a></li>
      <li class:active={segment === 'login'}><a href="/login">Sign in</a></li>
    </ul>
  </nav>
</div>
