<template>
  <Header></Header>

  <br>
  <section class="container is-fluid">
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import Header from "./components/Header.vue";

export default {
  name: 'App',
  components:{
    Header
  }
}
</script>
