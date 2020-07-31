<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <section class="container">
      <div class="navbar-brand ">
        <a class="navbar-item" href="/">
          <img src="../assets/logo.svg" alt="logo">
          <strong>&nbsp;PasteBin</strong>
        </a>

        <a @click="showMenu" class="navbar-burger">
          <span v-for="() in 3"></span>
        </a>
      </div>

      <div :class="{ 'is-active': isShowMenu }" class="navbar-menu">
        <div class="navbar-start">
        </div>
        <div class="navbar-end">
            <a class="navbar-item" href="https://github.com/xxfye/pastebin">
              <img v-if="isShowMenu" src="../assets/GitHub-Mark-120px-plus.png" alt="Github icon">
              <img v-else src="../assets/GitHub-Mark-Light-120px-plus.png" alt="Github icon">
            </a>
        </div>
      </div>
    </section>
  </nav>
</template>

<script lang="ts">

import { ref } from 'vue';

export default {
  name: "Header",
  setup() {
    const isShowMenu = ref(false);
    const showMenu = () => isShowMenu.value = !(isShowMenu.value);
    return {
      isShowMenu,
      showMenu,
    }
  }
}
</script>

<style scoped>

</style>