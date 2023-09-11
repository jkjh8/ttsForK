import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAPIServerStore = defineStore('counter', () => {
  const port = ref(9999)
  const startAtOpen = ref(false)

  async function updateValues() {
    await API.onPromise(
      { commnad: 'apiserver' },
      { $set: { value: startAtOpen.value, port: port.value } }
    )
  }

  async function getValues() {
    const r = await API.onPromise({
      command: 'getDataFromDb',
      value: 'apiserver'
    })
    port.value = r.port
    startAtOpen.value = r.value
  }
  return { port, startAtOpen, updateValues, getValues }
})
