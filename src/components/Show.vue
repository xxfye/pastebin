<template>
  <pre><code v-html="data.highlight"></code></pre>
</template>

<script lang="ts">
import axios from 'axios';
import { ref } from 'vue'
import { useRoute } from "vue-router";

export default {
  name: "Show",
  setup() {
    const route = useRoute();
    const id = route.params.id as string;
    const { data } = useData(id);
    return {
      data
    }
  }
}

function useData(id: string) {
  const data = ref({ syntax: '', author: '', content: '', highlight: '' })
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