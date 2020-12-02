<script lang="ts">
  import Navbar from "../components/landing/navbar.svelte";

  export let segment: string;
  $: {
    console.log(segment);
  }
</script>

<style>
  .landing-head {
    width: 100%;
    height: calc(100vh - 150px);
    background-size: cover !important;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-blend-mode: luminosity;
    background: linear-gradient(
        131deg,
        rgba(226, 17, 17, 0.09) 334px,
        rgb(218 212 31/35%) 0
      ),
      linear-gradient(
        49deg,
        rgba(191, 245, 39, 0.49) 334px,
        rgb(55 224 251/78%) 0
      ),
      linear-gradient(
        131deg,
        rgba(236, 19, 19, 0.17) 665px,
        rgb(7 224 64/67%) 0
      ),
      linear-gradient(
        49deg,
        rgba(81, 236, 193, 0.53) 665px,
        rgb(42 66 236/67%) 0
      );
    background-color: rgb(245 127 23) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: end;
  }

  .landing-head > div {
    max-width: 70%;
  }

  .landing-head > div > div {
    color: #fff;
    font-weight: bolder;
    font-size: 42px;
  }

  .goto-app {
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
    padding: 8px 24px;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 24px;
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>Lodies remake</title>
</svelte:head>

<div>
  <Navbar />
  <div>
    <div class="landing-head">
      <div>
        <div>Enjoy free music Anywhere and Anytime</div>
        <p style="margin-top:16px">
          <a class="goto-app btn" href="/tracks">Go to App</a>
        </p>
      </div>
    </div>
  </div>
</div>
