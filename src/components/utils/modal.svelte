<script lang="ts">
  import { fly, slide, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  export let open = true;

  const dispatch = createEventDispatcher();

  const toggle = () => dispatch("open");
</script>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    background-color: #0000006b;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .body {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
  }
</style>

{#if open}
  <div
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
    class="modal"
    on:click|self={toggle}>
    <div in:fly={{ y: -100 }} out:fly={{ y: 100 }} class="body">
      <slot />
    </div>
  </div>
{/if}
