import { onUnmounted, onMounted, ref } from "vue";

export default function() {
  const supported = ref('clipboard' in window.navigator)
  const text = ref('')

  function handler() {
    return window.navigator.clipboard.readText().then(value => text.value = value);
  }

  function copy(value: string) {
    text.value = value;
    return window.navigator.clipboard.writeText(value);
  }

  if(supported) {
    window.navigator.clipboard.readText().then(txt => text.value = txt);
    onMounted(() => window.addEventListener("copy", handler));
    onUnmounted(() => window.removeEventListener("copy", handler))
  }
  return { text, supported, copy }
}