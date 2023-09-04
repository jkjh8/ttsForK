import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTTSstore = defineStore('tts', () => {
  const rate = ref(200)
  const voice = ref(null)
  const voices = ref(null)

  return { rate, voices, voice }
})
