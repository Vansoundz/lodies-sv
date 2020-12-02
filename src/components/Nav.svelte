<script lang="ts">
  import { logout } from "../services/auth";

  import { auth } from "../store/auth.store";
</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    height: 50px;
    position: sticky;
    align-items: center;
    padding: 0 8px;
    top: 0;
    background: #fff;
    box-shadow: 0px 2px 6px #eee;
  }
</style>

<nav>
  <div>Search</div>
  <div>
    {#if $auth.user}
      <div
        on:click={async () => {
          let resp = await logout();
          if (!resp) {
            auth.logout();
          }
        }}>
        {$auth.user.username}
      </div>
    {:else}
      <div>Account</div>
    {/if}
  </div>
</nav>
