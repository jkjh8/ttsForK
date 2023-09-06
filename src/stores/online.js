import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnlineStore = defineStore('online', () => {
  const online = ref({ status: false, id: '' })

  const updateOnline = (value) => {
    online.value = value
  }
  return { online, updateOnline }
})
