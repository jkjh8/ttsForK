import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnlineStore = defineStore('online', () => {
  const online = ref(false)

  const updateOnline = (value) => {
    if (value) {
      online.value = true
    } else {
      online.value = false
    }
  }

  return { online, updateOnline }
})
