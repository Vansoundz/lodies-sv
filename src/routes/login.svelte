<script lang="ts">
  import { onMount } from "svelte";

  import Navbar from "../components/landing/navbar.svelte";
  import Loader from "../components/layout/loader.svelte";
  import { login } from "../services/auth";
  import { auth } from "../store/auth.store";
  import { goto } from "@sapper/app";
  let user = {
    email: "",
    password: "",
  };
  let loading: boolean = false;

  onMount(() => {
    if (!$auth.loading) {
      if ($auth.user) {
        goto("tracks");
      }
    }
  });

  const onSubmit = async () => {
    if (!user.email.trim()) {
      console.log("error");
    } else if (!user.email.trim()) {
      console.log("error");
    } else {
      loading = true;
      let resp = await login(user);
      loading = false;

      if (resp.user) {
        goto("tracks");
      } else {
        console.log(resp);
      }
    }
  };
</script>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form div {
    margin: 8px 0;
  }

  form {
    min-width: 260px;
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
</style>

<div>
  <Navbar />
  <div id="login">
    <div class="login">
      <form on:submit|preventDefault={onSubmit}>
        <h4>Log in</h4>
        <div>
          <label for="email">email: </label>
          <input type="text" id="email" bind:value={user.email} />
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="password" id="password" bind:value={user.password} />
        </div>
        <div>
          <button>
            {#if loading}
              <span><Loader /></span>
            {:else}<span>Log in</span>{/if}
          </button>
        </div>
      </form>
    </div>
    <div class="other">
      <div>New user? <a href="/register">Register</a></div>
    </div>
  </div>
</div>
