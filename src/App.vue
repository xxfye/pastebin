<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <section class="container">
      <div class="navbar-brand ">
        <a class="navbar-item" href="/">
          <img src="./assets/logo.png">
        </a>
        <a class="navbar-item" href="/">+Paste</a>
      </div>
    </section>
  </nav>

  <br>
  <section class="container is-fluid">
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>
