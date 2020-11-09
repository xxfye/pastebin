<template>
  <pre class="card-content"><code v-html="highlight.value"></code></pre>
</template>

<script lang="ts">
import { toRefs, computed } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css'

export default {
  name: "Highlight",
  props: {
    code: String,
    syntax: String
  },
  setup(props: Props) {
    let { code, syntax } = toRefs(props)
    const highlight = computed(() => hljs.highlightAuto(code.value, [syntax.value]));
    return {
      highlight
    }
  }
}

interface Props {
  code: string
  syntax: string
}
</script>

<style scoped>
code {
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
}
</style>