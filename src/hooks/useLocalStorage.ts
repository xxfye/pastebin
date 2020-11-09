import { onUnmounted, onMounted, ref } from "vue";

export default function(key: string) {
  const data = ref(localStorage.getItem(key));

  function set(value: string | null) {
    if(value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }

  function handler(event: StorageEvent) {
    if(localStorage != event.storageArea) return;
    if(key == event.key) data.value = event.newValue;
  }

  onMounted(() => window.addEventListener('storage', handler))
  onUnmounted(() => window.removeEventListener('storage', handler))

  return { value: data, set };
}