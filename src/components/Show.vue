<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ data.syntax.toUpperCase() }}
      </p>
      <a v-if="copyable" class="card-header-icon copy-bth" @click="copy(data.content)">
        <img class="icon" src="../assets/copy.svg" alt="copy">
      </a>
    </header>
    <Highlight :code="data.content" :syntax="data.syntax"></Highlight>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import { useRoute } from "vue-router";
import { useClipboard } from '../hooks'
import Highlight from "./Highlight.vue";

export default {
  name: "Show",
  components: {
    Highlight
  },
  setup() {
    const route = useRoute();
    const id = route.params.id as string;
    const { data } = useData(id);
    const { supported: copyable, copy } = useClipboard();
    return {
      data,
      copyable,
      copy
    }
  }
}

function useData(id: string) {
  const data = ref({ syntax: '', author: '', content: '', highlight: '' });
  axios.get('/api/get', { params: { id }})
    .then(res => data.value = res.data);
  return { data }
}

</script>

<style scoped>
code {
  font-family: "JetBrains Mono",monospace;
  font-size: 13px;
}
</style>