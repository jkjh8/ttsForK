import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTTSstore = defineStore('tts', () => {
  const rate = ref(200)
  const voice = ref(null)
  const voices = ref(null)
  const text = ref('')
  const selectedLanguage = ref('')

  async function updateTtsInfo(command) {
    const r = await API.onPromise({ command })
    voice.value = r.voice
    voices.value = r.voices
    rate.value = r.rate
  }

  function getVoices() {
    let r = []
    if (selectedLanguage.value) {
      for (const voice of voices.value) {
        if (voice.languages.includes(selectedLanguage.value)) {
          r.push(voice)
        }
      }
      // voices array not included current voice, select voices frist voice
      if (!r.includes(voice.value)) {
        voice.value = r[0].id
      }

      return r
    } else {
      return voices.value
    }
  }

  return {
    rate,
    voices,
    voice,
    text,
    selectedLanguage,
    getVoices,
    updateTtsInfo
  }
})
