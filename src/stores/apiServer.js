import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/useNotify'

export const useAPIServerStore = defineStore('APIServer', () => {
  const { notifyInfo, notifyError } = useNotify()
  const $q = useQuasar()
  const port = ref(9999)
  const startAtOpen = ref(false)

  async function updateValues() {
    await API.onPromise({
      command: 'apiserver',
      value: startAtOpen.value,
      port: port.value
    })
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
