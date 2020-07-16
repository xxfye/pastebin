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
              <option selected value="">Auto</option>
              <option v-for="lang in langs" :value="lang">{{ lang }}</option>
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
import { reactive, ref } from 'vue'
import { Router, useRouter } from "vue-router";

export default {
  name: 'Paste',
  setup() {
    const router = useRouter();
    const { data, submit } = useForm(router);
    return {
      data, submit, langs
    }
  }
}

function useForm(router: Router) {
  const data = reactive({ syntax: '', content: '', author: 'anonymous' });
  const submit = async () => {
    grecaptcha.ready(function() {
      grecaptcha.execute('6Lc7baMZAAAAAKJPeJHW7XdZXP_q77WcC5BhRONQ', {action: 'paste'}).then(async function(token) {
        const res = await axios.post('/api/paste', {...data, token})
        const id = res.data.id;
        router.push({name: 'show', params: {id}})
      });
    });
  }
  return { data , submit }
}

const langs = ["python", "xml", "javascript", "http", "c-like", "cpp", "sql", "clojure", "csharp", "objectivec", "java",
  "swift", "css", "ruby", "makefile", "go", "coffeescript", "bash", "ini", "rust", "handlebars", "prolog", "typescript",
  "elm", "json"]
</script>
<style scoped>
textarea {
  font-family: "JetBrains Mono", monospace;
  white-space: nowrap;
  font-size: 13px;
}
</style>