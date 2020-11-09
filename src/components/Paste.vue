<template>
  <div class="columns">
    <div class="column">

      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea class="textarea" v-model="data.content" rows="20" autofocus spellcheck="false"></textarea>
        </div>
      </div>

    </div>

    <div class="column is-one-third">

      <div class="field">
        <label class="label">Author</label>
        <div class="control">
          <input class="input" v-model="data.author" type="text" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Syntax</label>
        <div class="control">
          <div class="select">
            <select v-model="data.syntax">
              <option v-for="lang in langs">{{ lang }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button" @click="submit">Paste!</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive, watch, toRefs } from 'vue'
import { Router, useRouter } from "vue-router";
import hljs from 'highlight.js'

export default {
  name: 'Paste',
  setup() {
    const router = useRouter();
    const { data, submit } = usePaste(router)
    const langs = hljs.listLanguages();
    return {
      data, submit, langs
    }
  }
}

function usePaste(router: Router) {
  const data = reactive({ syntax: 'plaintext', content: '', author: 'anonymous' });
  const submit = async () => {
    axios.post('/api/paste', {...data }).then(res => {
      const id = res.data.id;
      router.push({name: 'show', params: {id}})
    })
  }

  watch(toRefs(data).content, ()=> {
    data.syntax = hljs.highlightAuto(data.content, hljs.listLanguages()).language ?? 'plaintext';
  })

  return { data , submit }
}
</script>
<style scoped>
textarea {
  font-family: "JetBrains Mono", monospace;
  white-space: nowrap;
  font-size: 13px;
}
</style>