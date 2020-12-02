<script lang="ts">
  import Navbar from "../components/landing/navbar.svelte";
  import Loader from "../components/layout/loader.svelte";
  import { register } from "../services/auth";

  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { auth } from "../store/auth.store";

  onMount(() => {
    if (!$auth.loading) {
      if ($auth.user) {
        goto("tracks");
      }
    }
  });

  let user = {
    username: "",
    password: "",
    email: "",
  };

  let password = "";
  let loading: boolean = false;

  let feedback: string = "";

  const onSubmit = async () => {
    if (!user.username.trim()) {
      feedback = "Username is required";
    } else if (!user.email.trim()) {
      feedback = "Email is required";
    } else if (!user.password.trim()) {
      feedback = "Password is required";
    } else if (user.password.trim() !== password) {
      feedback = "Passwords dont match";
    } else {
      loading = true;
      let resp = await register(user);
      loading = false;
      if (resp.user) {
        goto("tracks");
      } else {
        console.log(resp);
      }
    }

    setTimeout(() => (feedback = ""), 5000);
  };
</script>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>

<div>
  <Navbar />
  <div id="login">
    {#if feedback.trim()}
      <div class="feedback other">
        <div>{feedback}</div>
      </div>
    {/if}

    <div class="login">
      <form on:submit|preventDefault={onSubmit}>
        <h4>Register</h4>
        <div>
          <div><label for="username">Username: </label></div>
          <input type="text" id="username" bind:value={user.username} />
        </div>
        <div>
          <div><label for="email">Email: </label></div>
          <input type="email" id="email" bind:value={user.email} />
        </div>
        <div>
          <div><label for="password">Password: </label></div>
          <input type="password" id="password" bind:value={user.password} />
        </div>
        <div>
          <div><label for="password1">Confirm Password: </label></div>
          <input type="password" id="password1" bind:value={password} />
        </div>
        <div>
          <button>
            {#if loading}
              <span><Loader /></span>
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
